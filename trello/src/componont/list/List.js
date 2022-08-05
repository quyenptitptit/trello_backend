import { React, useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import { TiDelete } from "@react-icons/all-files/ti/TiDelete"
import { GrAdd } from "@react-icons/all-files/gr/GrAdd"
import './List.css'
import Card from '../card/Card'



function List({ list, load, addCard, updateList, updateCard, removeList, removeCard }) {
  const [inputCard, setInputCard] = useState('')
  const [title, setTitle] = useState(list.title)
  const [isEditing, setIsEditing] = useState(false)
  const [isClickAddCard, setIsClickAddCard] = useState(false)

  const handleChangeUpdateList = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeAddCard = (e) => {
    setInputCard(e.target.value)
  }

  const handleSubmitAddCard = async e => {
    e.preventDefault()
    const newCard = {
      nameCard: inputCard,
      list: list._id
    }
    await addCard(newCard)
    setInputCard('')
    setIsClickAddCard(!isClickAddCard)
    await load()
  }

  const handleClickUpdateList = (e) => {
    e.preventDefault()
    updateList(list._id, title)
    setIsEditing(!isEditing)
  }

  const handleClickDeleteList = (e) => {
    removeList(list._id)
  }

  const renderCard = list.card.map((card, idx) => (
    <Card key={idx} load={load} card={card} updateCard={updateCard} removeCard={removeCard} />
  ))


  return (
    <div id={list._id} className='list'>
      {isEditing ?
        <div className="list_title">
          <form className="list_form-update" onSubmit={handleClickUpdateList}>
            <input className='list_input-update' autoFocus onChange={handleChangeUpdateList} value={title} type="text" />
            <button className='list_btn-update'>Save</button>
          </form>
        </div>
        :
        <div className='list_title'>
          <div className='list_title-text'>
            <p id='list_title-text-p' onClick={handleClickUpdateList} value={list.title}>{list.title}</p>
          </div>
          <div className='list_title-icon'>
            <button onClick={handleClickDeleteList}><TiDelete className='list_title-icon-delete' /></button>
          </div>
        </div>
      }

      <div className='render_card'>{renderCard}</div>

      {isClickAddCard ?
        <form className='list_form' onSubmit={handleSubmitAddCard}>
          <input type='text'
            value={inputCard}
            onChange={handleChangeAddCard}
            placeholder='Enter a title for this tag...'
            className='list_input-addCard'
            autoFocus /><br />
          <button className='list_btn-addCard'>Add card</button>
        </form>
        :
        <div>
          <p className='add_card-false' onClick={() => setIsClickAddCard(!isClickAddCard)} ><GrAdd /> Add Card</p>
        </div>
      }
    </div>
  )
}

export default List
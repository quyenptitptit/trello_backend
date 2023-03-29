import { React, useState, useEffect, memo } from 'react'
import { TiDelete } from "@react-icons/all-files/ti/TiDelete"
import './List.css'
import Card from '../card/Card'
import AddCard from '../add-card/AddCard'
import axios from 'axios'


function List({ List, updateList, deleteList }) {
  const LIST_URL = 'http://localhost:8000/api/list'
  const CARD_URL = 'http://localhost:8000/api/card'

  const [list, setList] = useState([])
  const [title, setTitle] = useState(List.title)
  const [isEditing, setIsEditing] = useState(false)

  const getList = async () => {
    let res = await axios.get(`${LIST_URL}/${List._id}`)
    setList(res.data.card)
  }

  useEffect(() => {
    getList()
  }, [])


  //list
  const handleChangeUpdateList = (e) => {
    setTitle(e.target.value)
  }

  const handleClickUpdateList = (e) => {
    updateList(List._id, title)
    setIsEditing(!isEditing)
  }

  const handleClickDeleteList = () => {
    deleteList(List._id)
  }

  //card
  const addCard = async (newCard) => {
    try {
      let res = await axios.post(`${CARD_URL}`, newCard)
      const card = [...list, res.data]
      setList(card)
    }
    catch (e) {
      console.log(e)
    }
  }

  const updateCard = async (id, updatedCard) => {
    try {
      await axios.put(`${CARD_URL}/${id}`, { nameCard: updatedCard })
      // const updateList = list.map(card => {
      //   if (card._id === id) {
      //     return { ...card, nameCard: updatedCard }
      //   }
      //   return card
      // })
      // setList(updateList)
    }
    catch (e) {
      console.log(e)
    }
  }

  const deleteCard = async (id) => {
    try {
      await axios.delete(`${CARD_URL}/${id}`)
      // const newList = list.filter(card => card._id !== id)
      // setList(newList)
      document.getElementById(id).remove()
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <div id={List._id} className='list'>
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
            <p id='list_title-text-p' onClick={handleClickUpdateList} value={List.title}>{title}</p>
          </div>
          <div className='list_title-icon'>
            <button onClick={handleClickDeleteList}><TiDelete className='list_title-icon-delete' /></button>
          </div>
        </div>
      }
      <div className='render_card'>
        {list.map((card, idx) => (
          <Card key={idx} card={card} updateCard={updateCard} deleteCard={deleteCard} />
        ))}
      </div>
      <AddCard addCard={addCard} listId={List._id} />
    </div>
  )
}

export default memo(List)
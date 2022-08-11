import { React, useState } from 'react'
import '../card/Card.css'
import { GrAdd } from "@react-icons/all-files/gr/GrAdd"

function AddCard({ addCard, listId }) {
    const [isClickAddCard, setIsClickAddCard] = useState(false)
    const [inputCard, setInputCard] = useState('')

    const handleSubmitAddCard = () => {
        const newCard = {
            nameCard: inputCard,
            listId : listId
        }
        addCard(newCard)
        setInputCard('')
        setIsClickAddCard(!isClickAddCard)
    }

    return (
        <div>
            {isClickAddCard ?
                <form className='list_form' onSubmit={handleSubmitAddCard}>
                    <input type='text'
                        value={inputCard}
                        onChange={(e) => setInputCard(e.target.value)}
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

export default AddCard

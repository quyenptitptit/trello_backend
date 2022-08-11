import { React, useState } from 'react'
import './Card.css'
import { RiPencilFill } from "@react-icons/all-files/ri/RiPencilFill"
import { RiDeleteBin6Line } from "@react-icons/all-files/ri/RiDeleteBin6Line"



function Card({ card, updateCard, deleteCard }) {
    const [nameCard, setNameCard] = useState(card.nameCard)
    const [checked, setChecked] = useState(true)

    const handleClickUpdateCard = () => {
        updateCard(card._id, nameCard)
        setChecked(!checked)
    }

    const handleClickDeleteCard = () => {
        deleteCard(card._id)
    }

    return (
        <div id={card._id} className='card card_title'>
            {checked ?
            <>
            <div className='card_title-text'>
                <p className='card_title-text-p'>{card.nameCard}</p>
            </div>
            <div className='card_title-icon'>
                <button className='card_btn' onClick={() => setChecked(!checked)} ><RiPencilFill className='card-icon-update' /></button>
                <button className='card_btn' onClick={handleClickDeleteCard} ><RiDeleteBin6Line className='card-icon-delete' /></button>
            </div>
            </>
            :
            <form className='card_form-update' onSubmit={handleClickUpdateCard}>
                <input type='text' onChange={(e) => setNameCard(e.target.value)} value={nameCard} className='card_input-update' autoFocus />
                <button className='card_btn-save'>Save</button>
            </form>
            }
        </div>
    )
}

export default Card
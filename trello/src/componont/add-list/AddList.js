import { React, useState } from 'react'
import './AddList.css'
import { GrAdd } from "@react-icons/all-files/gr/GrAdd"


function ContentElement({ addList }) {
    const [inputList, setInputList] = useState('')
    const [isClickAddList, setIsClickAddList] = useState(false)

    const handleSubmitAddList = async e => {
        const newList = {
            title: inputList,
            card: []
        }
        addList(newList)
        setInputList('')
        setIsClickAddList(!isClickAddList)
    }

    return (
        <div className='add_list'>
            {isClickAddList ?
                <form className='add_list-form' onSubmit={handleSubmitAddList}>
                    <input
                        type='text'
                        autoFocus
                        value={inputList}
                        onChange={(e) => setInputList(e.target.value)}
                        placeholder='Enter a list title...'
                        className='add_list-input' /><br />
                    <button className='add_list-btn'>Add List</button>
                </form>
                :
                <div className='add_list-false'>
                    <p onClick={() => setIsClickAddList(!isClickAddList)}><GrAdd /> Add List</p>
                </div>
            }
        </div>
    )
}

export default ContentElement
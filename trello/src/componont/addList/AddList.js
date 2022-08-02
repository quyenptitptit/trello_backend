import { React, useState } from 'react'
import './AddList.css'
// import { v4 as uuidv4 } from 'uuid'
import { GrAdd } from "@react-icons/all-files/gr/GrAdd"


function ContentElement({ createList, load }) {

    const [inputList, setInputList] = useState('')
    const [isClickAddList, setIsClickAddList] = useState(false)
    const handleOnChangeAddList = (e) => {
        setInputList(e.target.value)
    }

    const handleSubmitAddList = async e => {
        if (inputList !== '') {
            e.preventDefault()
            const newList = {
                title: inputList,
                card: []
            }
            await createList(newList)
            setInputList('')
            setIsClickAddList(!isClickAddList)
            await load()
        }
        else {
            alert('please write list')
            load()
        }
    }



    return (
        <div className='add_list'>
            {isClickAddList ?
                <form className='add_list-form' onSubmit={handleSubmitAddList}>
                    <input
                        type='text'
                        value={inputList}
                        onChange={handleOnChangeAddList}
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
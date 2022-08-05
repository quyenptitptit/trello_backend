import React from 'react'
import './HeaderItem.css'
import '../trello/Trello.css'
import { AiOutlineDown } from "@react-icons/all-files/ai/AiOutlineDown"
// styled-components
function HeaderItem(props) {
  return (
    <div className='header_item text-box'>
      <p>{props.name}</p>
      <AiOutlineDown />
    </div>
  )
}

export default HeaderItem
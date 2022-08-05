import React from 'react'
import './ContentHeader.css'
import '../trello/Trello.css'
import '../header/Header.css'
import { AiOutlineDown } from "@react-icons/all-files/ai/AiOutlineDown"
import { HiOutlineStar } from "@react-icons/all-files/hi/HiOutlineStar"
import { BsPeople } from "@react-icons/all-files/bs/BsPeople"
import { BsFillPersonPlusFill } from "@react-icons/all-files/bs/BsFillPersonPlusFill"
import { IoIosRocket } from "@react-icons/all-files/io/IoIosRocket"
import { BsLightningFill } from "@react-icons/all-files/bs/BsLightningFill"
import { BsFilter } from "@react-icons/all-files/bs/BsFilter"
import { BiDotsHorizontalRounded } from "@react-icons/all-files/bi/BiDotsHorizontalRounded"



function ContentHeader() {
  return (
    <div className='content_header'>
      <div className='content_header-start'>
        <div className='content_header-background text-box'>
          <p>Broad</p>
          <AiOutlineDown />
        </div>
        <div className='content_header-reactjs text-box'>
          <p>ReactJS</p>
        </div>
        <div className='content_header-icon icon-box'>
          <HiOutlineStar />
        </div>
        <span className='content_header-different'></span>
        <div className='content_header-background text-box'>
          <p>QuyenQuyen</p>
        </div>
        <span className='content_header-different'></span>
        <div className='content_header-background text-box'>
          <BsPeople />
          <p>Show in Workspace</p>
        </div>
        <span className='content_header-different'></span>
        <div className='content_header-name header_name'>
          <span title='Nguyen Thi Quyen'>NQ</span>
        </div>
        <div className='content_header-person text-box'>
          <BsFillPersonPlusFill />
          <p>Share</p>
        </div>
      </div>

      <div className='content_header-end'>
        <div className='text-box content_header-background'>
          <IoIosRocket />
          <p>Add-ons</p>
        </div>
        <div className='text-box content_header-background'>
          <BsLightningFill />
          <p>Automation</p>
        </div>
        <div className='text-box content_header-background'>
          <BsFilter />
          <p>Filter</p>
        </div>
        <div className='text-box content_header-background'>
          <BiDotsHorizontalRounded />
          <p>Show Menu</p>
        </div>
      </div>
    </div>
  )
}

export default ContentHeader
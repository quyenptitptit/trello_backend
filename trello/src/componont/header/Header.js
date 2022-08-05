import React from 'react'
import './Header.css'
import '../trello/Trello.css'
import HeaderItem from '../header-item/HeaderItem'
import { ImTrello } from "@react-icons/all-files/im/ImTrello"
import { BsSearch } from "@react-icons/all-files/bs/BsSearch"
import { BsInfoCircle } from "@react-icons/all-files/bs/BsInfoCircle"
import { FaRegBell } from "@react-icons/all-files/fa/FaRegBell"




function Header() {
    return (
        <div >
            <nav className='header'>
                <div className='header_start'>
                    <div className='header_trello text-box'>
                        <ImTrello />
                        <p>Trello</p>
                    </div>
                    <HeaderItem name='Workspace' />
                    <HeaderItem name='Recently' />
                    <HeaderItem name='Starred' />
                    <HeaderItem name='Sample' />
                    <div className='header_create text-box'>
                        <p>Create new</p>
                    </div>
                </div>

                <div className='header_end'>
                    <div className='header_search'>
                        <div className='header_search-icon' >
                            <BsSearch />
                        </div>
                        <input type='text' placeholder='Search' className='header_search-input' />
                    </div>
                    <div className='icon-box'>
                        <BsInfoCircle />
                    </div>
                    <div className='icon-box'>
                        <FaRegBell />
                    </div>
                    <div className='header_name'>
                        <span title='Nguyen Thi Quyen'>NQ</span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
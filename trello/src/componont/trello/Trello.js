import { React, useState, useEffect } from 'react'
import Header from '../header/Header'
import ContentHeader from '../content-header/ContentHeader'
import ContentBody from '../content-body/ContentBody'
import axios from 'axios'



function Trello() {


  return (
    <div className='trello'>
      <Header />
      <div className='content'>
        <ContentHeader />
        <ContentBody />
    </div>
    </div>
  )
}

export default Trello
import React from 'react'
import ContentHeader from '../contentHeader/ContentHeader'
import ContentBody from '../contentBody/ContentBody'
import './Content.css'



function Content() {
  return (
    <div className='content'>
        <ContentHeader />
        <ContentBody />
    </div>
  )
}

export default Content
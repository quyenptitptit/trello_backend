import React from 'react'
import ContentHeader from '../content-header/ContentHeader'
import ContentBody from '../content-body/ContentBody'
import './Content.css'



function Content({lists, setLists, boards, setBoards, load}) {
  return (
    <div className='content'>
        <ContentHeader />
        <ContentBody lists={lists} setLists={setLists} boards={boards} setBoards={setBoards} load={load} />
    </div>
  )
}

export default Content
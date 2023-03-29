import { React, useState, useEffect } from 'react'
import './ContentBody.css'
import AddList from '../add-list/AddList'
import List from '../list/List'
import axios from 'axios'




function ContentBody() {
  const BOARD_URL = 'http://localhost:8000/api/board'
  const LIST_URL = 'http://localhost:8000/api/list'
  const [lists, setLists] = useState([])

  const load = async () => {
    try {
      let res = await axios.get(`${BOARD_URL}`)
      const board = res.data
      setLists(board)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const addList = async (newList) => {
    try {
      let res = await axios.post(`${LIST_URL}`, newList)
      setLists([...lists, res.data])
      return res.data
    }
    catch (e) {
      console.log(e)
    }
  }

  const updateList = async (id, updatedTitle) => {
    try {
      await axios.put(`${LIST_URL}/${id}`, { title: updatedTitle })
      // const newList = lists.map(list => {
      //   if(list._id === id){
      //     return { ...list, title: updatedTitle }
      //   }
      //   return list
      // })
      // setLists(newList)
      console.log(lists)
    }
    catch (e) {
      console.log(e)
    }
  }

  const deleteList = async (id) => {
    try {
      await axios.delete(`${LIST_URL}/${id}`)
      document.getElementById(id).remove()
      // setLists(lists.filter(list => list._id !== id))
    }
    catch (e) {
      console.log(e)
    }
  }

  const updateDataList = async (id, newCard) => {
    try {
      await axios.put(`${LIST_URL}/${id}`, { card: newCard })
    }
    catch (e) {
      console.log(e)
    }
  } 

  const updateDataBoard = async (newList) => {
    try {
      await axios.put(`${BOARD_URL}`, newList)
    }
    catch (e) {
      console.log(e)
    }
  }

  let dragCard
  let dropCard
  let dragList
  let dropList
  let topShadow
  let leftShadow
  let topClone
  let leftClone
  let isDown = false
  let fromListId
  let targetListId

  const mouseDown = async (e) => {
    isDown = true
    // mouse down card
    if (e.target.matches('.card') || e.target.matches('.card_title-text')) {
      dragCard = e.target.closest('.card');
      fromListId = dragCard.closest('.list').id

      if (dragCard) {
        const rectDragCard = dragCard.getBoundingClientRect();
        topShadow = e.clientY - rectDragCard.top
        leftShadow = e.clientX - rectDragCard.left

        let shadow = dragCard.cloneNode(true)
        shadow.id = 'shadow'
        shadow.style.display = 'none'
        shadow.style.height = dragCard.getBoundingClientRect().height - 20 + 'px'
        document.body.appendChild(shadow)

        let placeholder = document.createElement('div')
        placeholder.id = 'placeholder'
        placeholder.style.display = 'none'
        placeholder.style.height = dragCard.getBoundingClientRect().height - 20 + 'px'
        document.body.appendChild(placeholder)
      }
    }


    //mouse down list
    if (e.target.matches('#list_title-text-p') || e.target.matches('.list_title')) {
      let dragTitle = e.target.closest('.list_title')
      if (dragTitle) {
        dragList = dragTitle.parentNode
      }

      if (dragList) {
        const rectDragList = dragList.getBoundingClientRect()
        topClone = e.clientY - rectDragList.top
        leftClone = e.clientX - rectDragList.left

        let clone = dragList.cloneNode(true)
        clone.id = 'clone'
        clone.style.display = 'none'
        clone.style.height = dragList.getBoundingClientRect().height + 'px'
        document.querySelector('body').appendChild(clone)

        let space = document.createElement('div')
        space.id = 'space'
        space.style.display = 'none'
        space.style.height = dragList.getBoundingClientRect().height + 'px'
        space.style.top = dragList.getBoundingClientRect().top + 'px'
        document.querySelector('body').appendChild(space)
      }
    }
  }

  const mouseMove = async (e) => {
    let shadow = document.getElementById('shadow')
    let placeholder = document.getElementById('placeholder')
    let clone = document.getElementById('clone')
    let space = document.getElementById('space')
    if (isDown) {
      //mouse move card
      if (dragCard) {
        dragCard.style.display = 'none'
      }

      dropCard = e.target.closest('.card')

      if (dragCard) {
        const bodyList = e.target.closest('.list')
        if (bodyList && !bodyList.querySelector('.render_card').hasChildNodes() && dragCard) {
          targetListId = bodyList.id
          bodyList.querySelector('.render_card').prepend(placeholder)
          bodyList.querySelector('.render_card').prepend(dragCard)
        }
      }

      if (shadow && placeholder) {
        shadow.style.display = 'flex'
        shadow.style.top = e.clientY - topShadow + 'px'
        shadow.style.left = e.clientX - leftShadow + 'px'

        placeholder.style.display = 'block'

        if (dropCard) {
          targetListId = dropCard.closest('.list').id
          placeholder.style.top = dropCard.getBoundingClientRect().top - document.querySelector('.content').getBoundingClientRect().top - 15 + 'px'
          placeholder.style.left = dropCard.getBoundingClientRect().left - 25 + 'px'
          if (isTop(e.clientY, dropCard)) {
            dropCard.parentNode.insertBefore(dragCard, dropCard)
            dropCard.parentNode.insertBefore(placeholder, dropCard)
          }
          else {
            dropCard.parentNode.insertBefore(dragCard, dropCard.nextSibling)
            dropCard.parentNode.insertBefore(placeholder, dropCard.nextSibling)
          }

        }
      }

      //mouse move list
      if (dragList) {
        dragList.style.display = 'none'
      }
      dropList = e.target.closest('.list')

      if (clone && space) {
        clone.style.display = 'block'
        clone.style.top = e.clientY - topClone + 'px'
        clone.style.left = e.clientX - leftClone + 'px'

        space.style.display = 'block'

        if (dropList) {
          targetListId = dropList.closest('.list').id
          if (isLeft(e.clientX, dropList)) {
            dropList.parentNode.insertBefore(dragList, dropList)
            dropList.parentNode.insertBefore(space, dropList)
          }
          else {
            dropList.parentNode.insertBefore(dragList, dropList.nextSibling)
            dropList.parentNode.insertBefore(space, dropList.nextSibling)
          }
        }
      }
    }
  }

  const mouseUp = async (e) => {
    e.preventDefault()
    // mouse up card
    if (dragCard) {
      dragCard.style.display = 'flex'
      let shadow = document.getElementById('shadow')
      let placeholder = document.getElementById('placeholder')
      if (shadow) {
        shadow.remove()
      }
      if (placeholder) {
        placeholder.remove()
      } 
      const fromListData = [...document.getElementById(fromListId)
        .childNodes[1].childNodes].map(node => node.id)
      const targetListData = [...document.getElementById(targetListId)
        .childNodes[1].childNodes].map(node => node.id)
      updateDataList(fromListId, fromListData)
      updateDataList(targetListId, targetListData)
    }

    //mouse up list
    if (dragList) {
      dragList.style.display = 'block'
      let clone = document.getElementById('clone')
      let space = document.getElementById('space')
      if (clone) {
        clone.remove()
      }
      if (space) {
        space.remove()
      }
      const listData = [...document.getElementById(targetListId)
        .parentNode.childNodes].map((node) => node.id)
      updateDataBoard(listData)
    }
    isDown = false
    // fromListId = null
    // targetListId = null
  }

  const isTop = (clientY, element) => {
    const rect = element.getBoundingClientRect()
    return clientY - rect.top - rect.height / 2 < 0 ? true : false
  }

  const isLeft = (clientX, element) => {
    const rect = element.getBoundingClientRect()
    return clientX - rect.left - rect.width / 2 < 0 ? true : false
  }

  return (
    <div onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} className='content_body'>
      <div className='render_list'>
        {lists.map((list, idx) => (
          <List key={idx} List={list} updateList={updateList} deleteList={deleteList} />
        ))}
      </div>
      <AddList addList={addList} />
    </div>
  )
}

export default ContentBody
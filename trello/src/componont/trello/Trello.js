import { React, useState, useEffect } from 'react'
import Header from '../header/Header'
import Content from '../content/Content'
import axios from 'axios'



function Trello() {
  const BOARD_URL = 'http://localhost:8000/api/board'
  const LIST_URL = 'http://localhost:8000/api/list'
  const CARD_URL = 'http://localhost:8000/api/card'

  const [lists, setLists] = useState([])
  const [boards, setBoards] = useState([])

  const load = async e => {
    try {
      const board = await axios.get(`${BOARD_URL}`)
      const list = await axios.get(`${LIST_URL}`)
      const res = []
      board.data[0].data.map(data => {
        list.data.map(list => {
          if (data == list._id) {
            res.push(list)
            return { ...res, list }
          }
        })
      })
      console.log('load')
      setLists(res)
      setBoards(board.data[0].data)
    }
    catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    load()
  }, [])

  const newDataBoard = (from, to) => {
    try {
      let boardUpdate = boards
      const element = boardUpdate[from]
      boardUpdate.splice(from, 1)
      boardUpdate.splice(to, 0, element)
      console.log(boardUpdate)
      setBoards(boardUpdate)
      return boardUpdate
    }
    catch (e) {
      console.log(e)
    }
  }

  const updateBoard = async (data) => {
    try {
      const res = await axios.put(`${BOARD_URL}`, data)
      return res.data
    }
    catch (e) {
      console.log(e)
    }
  }

  const newDataList = (list, from, to) => {
    const element = list[from]
    list.splice(from, 1)
    list.splice(to, 0, element)
    return list
  }

  const updateDataList = async (idList, data) => {
    try {
      const res = await axios.put(`${LIST_URL}/${idList}`, { card: data })
      return res.data
    }
    catch (e) {
      console.log(e)
    }
  }

  const updateDataLists = async (idFromList, fromList, idToList, toList, element) => {
    try {
      await axios.put(`${LIST_URL}/${idFromList}`, { card: fromList })
      await axios.put(`${LIST_URL}/${idToList}`, { card: toList })
      await axios.put(`${CARD_URL}/${element._id}`, { list: idToList })
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
  let dropListFinally
  let dropCardFinally
  let idFromList


  const mouseDown = async (e) => {
    isDown = true
    // mouse down card
    if (e.target.matches('.card') || e.target.matches('.card_title-text-p')) {
      dragCard = e.target.closest('.card');
      idFromList = dragCard.parentNode.parentNode.id

      if (dragCard) {
        const rectDragCard = dragCard.getBoundingClientRect();
        topShadow = e.clientY - rectDragCard.top
        leftShadow = e.clientX - rectDragCard.left


        let shadow = dragCard.cloneNode(true)
        shadow.id = 'shadow'
        shadow.style.display = 'none'
        document.body.appendChild(shadow)

        let placeholder = document.createElement('div')
        placeholder.id = 'placeholder'
        placeholder.style.display = 'none'
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
          // let dropId = bodyList.id
          bodyList.querySelector('.render_card').prepend(placeholder)
          bodyList.querySelector('.render_card').prepend(dragCard)
        }
      }

      if (shadow && placeholder) {
        shadow.style.display = 'flex'
        shadow.style.top = e.clientY - topShadow + 'px'
        shadow.style.left = e.clientX - leftShadow + 'px'
        // shadow.style.top = e.clientY - document.querySelector('.content').getBoundingClientRect().top - shadow.getBoundingClientRect().height / 2 - 70 + 'px'
        // shadow.style.left = e.clientX - document.querySelector('.content').getBoundingClientRect().left - shadow.getBoundingClientRect().width / 2 + 'px'

        placeholder.style.display = 'block'

        if (dropCard) {
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
          dropCardFinally = dropCard
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
          if (isLeft(e.clientX, dropList)) {
            dropList.parentNode.insertBefore(dragList, dropList)
            dropList.parentNode.insertBefore(space, dropList)
            dropListFinally = dropList
          }
          else {
            dropList.parentNode.insertBefore(dragList, dropList.nextSibling)
            dropList.parentNode.insertBefore(space, dropList.nextSibling)
            dropListFinally = dropList.nextSibling
          }
        }
      }


    }
  }

  const mouseUp = async (e) => {
    e.preventDefault()
    isDown = false
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
      let idToList = dropCardFinally.parentNode.parentNode.id
      if (idFromList === idToList) {
        let idList = dragCard.parentNode.parentNode.id
        let list = lists[lists.findIndex(list => list._id == idList)]
        let from = list.card.findIndex(card => card._id == dragCard.id)
        let to = list.card.findIndex(card => card._id == dropCardFinally.id)
        newDataList(list.card, from, to)
        await updateDataList(idList, list.card)
      }
      else {
        let fromList = lists[lists.findIndex(list => list._id == idFromList)]
        let toList = lists[lists.findIndex(list => list._id == idToList)]
        let from = fromList.card.findIndex(card => card._id == dragCard.id)
        let to = toList.card.findIndex(card => card._id == dropCardFinally.id)
        let element = fromList.card[from]
        fromList.card.splice(from, 1)
        toList.card.splice(to, 0, element)
        await updateDataLists(idFromList, fromList.card, idToList, toList.card, element)
      }
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
      let fromIdx = boards.findIndex(board => board == dragList.id)
      let toIdx = boards.findIndex(board => board == dropListFinally.id)
      newDataBoard(fromIdx, toIdx)
      await updateBoard(boards)
    }
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
    <div onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} className='trello'>
      <Header />
      <Content lists={lists} setLists={setLists} boards={boards} setBoards={setBoards} load={load} />
    </div>
  )
}

export default Trello
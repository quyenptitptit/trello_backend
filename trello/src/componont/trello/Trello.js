import React from 'react'
import Header from '../header/Header'
import Content from '../content/Content'


function Trello() {

  let dragCard
  let dropCard
  let dragList
  let dropList
  let topShadow
  let leftShadow
  let topClone
  let leftClone
  let isDown = false

  const mouseDown = (e) => {
    isDown = true
    // mouse down card
    if (e.target.matches('.card') || e.target.matches('.card_title-text-p')) {
      dragCard = e.target.closest('.card');
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

  const mouseMove = (e) => {
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
        // space.style.top = dropList.getBoundingClientRect().top + 'px'
        // space.style.left = dropList.getBoundingClientRect().left - 15 + 'px'

        if (dropList) {
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

  const mouseUp = (e) => {
    e.preventDefault()
    isDown = false
    // mouse up card
    if (dragCard) {
      let shadow = document.getElementById('shadow')
      let placeholder = document.getElementById('placeholder')
      if(shadow){
        shadow.remove()
      }
      if(placeholder){
        placeholder.remove()
      }
      dragCard.style.display = 'flex'
    }

    //mouse up list
    if (dragList) {
      dragList.style.display = 'block'
      let clone = document.getElementById('clone')
      let space = document.getElementById('space')
      if(clone) {
        clone.remove()
      }
      if(space) {
        space.remove()
      }
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



  // const mouseDown = (e) => {
  //   if (e.target.matches('.list_title')) {
  //     isDown = true

  //     let dragTitle = e.target.closest('.list_title')
  //     if (dragTitle) {
  //       dragList = dragTitle.parentNode
  //     }

  //     if (dragList) {
  //       let clone = dragList.cloneNode(true)
  //       clone.id = 'clone'
  //       clone.style.display = 'none'
  //       clone.style.height = dragList.getBoundingClientRect().height + 'px'
  //       document.querySelector('body').appendChild(clone)

  //       let space = document.createElement('div')
  //       space.id = 'space'
  //       space.style.display = 'none'
  //       space.style.height = dragList.getBoundingClientRect().height + 'px'
  //       space.style.top = dragList.getBoundingClientRect().top + 'px'
  //       document.querySelector('body').appendChild(space)

  //       console.log('clone', clone)
  //       console.log('space', space)
  //     }
  //   }
  // }

  // const mouseMove = (e) => {
  //   let clone = document.getElementById('clone')
  //   let space = document.getElementById('space')
  //   if (isDown) {
  //     console.log('move')
  //     if (dragList) {
  //       dragList.style.display = 'none'
  //     }
  //     dropList = e.target.closest('.list')

  //     if (clone && space && dropList) {
  //       clone.style.display = 'block'
  //       clone.style.top = e.clientY + 'px'
  //       clone.style.left = e.clientX + 'px'

  //       space.style.display = 'block'
  //       // space.style.top = dropList.getBoundingClientRect().top + 'px'
  //       // space.style.left = dropList.getBoundingClientRect().left - 15 + 'px'

  //       if (isLeft(e.clientX, dropList)) {
  //         dropList.parentNode.insertBefore(dragList, dropList)
  //         dropList.parentNode.insertBefore(space, dropList)
  //       }
  //       else {
  //         dropList.parentNode.insertBefore(dragList, dropList.nextSibling)
  //         dropList.parentNode.insertBefore(space, dropList.nextSibling)
  //       }
  //     }
  //   }
  // }

  // const mouseUp = (e) => {
  //   isDown = false
  //   if (dragList) {
  //     dragList.style.display = 'block'
  //     document.getElementById('clone').remove()
  //     document.getElementById('space').remove()
  //   }
  // }


  return (
    <div onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} className='trello'>
      <Header />
      <Content />
    </div>
  )
}

export default Trello
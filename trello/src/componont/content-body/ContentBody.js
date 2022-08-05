import { React, useState, useEffect } from 'react'
import './ContentBody.css'
import AddList from '../add-list/AddList'
import List from '../list/List'
import axios from 'axios'




function ContentBody({lists, setLists, boards, setBoards, load}) {
  const BOARD_URL = 'http://localhost:8000/api/board'
  const LIST_URL = 'http://localhost:8000/api/list'
  const CARD_URL = 'http://localhost:8000/api/card'

  const createList = async newList => {
    try {
      const res = await axios.post(`${LIST_URL}`, newList)
      // setLists([...lists, res.data])
      return res.data
    }
    catch (e) {
      console.log(e)
    }
  }

  const removeList = async id => {
    try {
      const res = await axios.delete(`${LIST_URL}/${id}`)
      setLists(lists.filter(list => list._id !== id))
      return res.data
    }
    catch (e) {
      console.log(e)
    }
  }

  const updateList = async (id, updtedTitle) => {
    try {
      await axios.put(`${LIST_URL}/${id}`, { title: updtedTitle })
      const updatedLists = lists.map(list => {
        if (list._id === id) {
          return { ...list, title: updtedTitle };
        }
        return list;
      });
      setLists(updatedLists);
    }
    catch (e) {
      console.log(e)
    }
  };

  const addCard = async newCard => {
    try {
      const res = await axios.post(`${CARD_URL}`, newCard)
      return res.data
    }
    catch (e) {
      console.log(e)
    }
  }

  const removeCard = async id => {
    try {
      const res = await axios.delete(`${CARD_URL}/${id}`)
      const remove = lists.map(list => {
        const newCard = list.card.filter(card => card.id !== id)
        return { ...list, card: newCard }
      })
      setLists(remove)
      return res.data
    }
    catch (e) {
      console.log(e)
    }
  }

  const updateCard = async (id, newNameCard) => {
    try {
      await axios.put(`${CARD_URL}/${id}`, { nameCard: newNameCard })
      const updatedCard = lists.map(list => {
        const newCard = list.card.map(card => {
          if (card.id === id)
            return { ...card, nameCard: newNameCard }
          return card
        })
        return { ...list, card: newCard }
      }

      )
      setLists(updatedCard)
    }
    catch (e) {
      console.log(e)
    }
  }



  const renderList = lists.map((list, idx) => (
    <List load={load} key={idx} list={list} addCard={addCard} updateList={updateList} updateCard={updateCard} removeList={removeList} removeCard={removeCard} boards={boards} setBoards={setBoards} />
  ))

  return (
    <div className='content_body'>
      <div className='render_list'>{renderList}</div>
      <AddList load={load} createList={createList} />
    </div>
  )
}

export default ContentBody
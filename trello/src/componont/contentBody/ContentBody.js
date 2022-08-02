import { React, useState, useEffect } from 'react'
import './ContentBody.css'
import AddList from '../addList/AddList'
import List from '../list/List'
import axios from 'axios'




function ContentBody() {
  const BASE_URL = 'http://localhost:8000/api/list'
  const URL_CARD = 'http://localhost:8000/api/card'
  const [lists, setLists] = useState([])

  const createList = async newList => {
    try {
      const res = await axios.post(`${BASE_URL}`, newList)
      // setLists([...lists, res.data])
      return res.data
    }
    catch (e) {
      console.log(e)
    }
  }

  const removeList = async id => {
    try {
      const res = await axios.delete(`${BASE_URL}/${id}`)
      setLists(lists.filter(list => list._id !== id))
      return res.data
    }
    catch (e) {
      console.log(e)
    }
  }

  const updateList = async (id, updtedTitle) => {
    try {
      await axios.put(`${BASE_URL}/${id}`, { title: updtedTitle })
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
      const res = await axios.post(`${URL_CARD}`, newCard)
      return res.data
    }
    catch (e) {
      console.log(e)
    }
  }

  const removeCard = async id => {
    try {
      const res = await axios.delete(`${URL_CARD}/${id}`)
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
      await axios.put(`${URL_CARD}/${id}`, { nameCard: newNameCard })
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


  // load()
  const load = async e => {
    try {
      const res = await axios.get(`${BASE_URL}`)
      setLists(res.data)
      console.log('list', lists)
      console.log('data', res.data)
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    load()
  }, [lists.title])

  const renderList = lists.map((list, idx) => (
    <List load={load} key={idx} list={list} addCard={addCard} updateList={updateList} updateCard={updateCard} removeList={removeList} removeCard={removeCard} />
  ))

  return (
    <div className='content_body'>
      <div className='render_list'>{renderList}</div>
      <AddList load={load} createList={createList} />
    </div>
  )
}

export default ContentBody
import { useEffect, useState } from 'react'
import './App.css'
import Form from './Form.jsx'
import ListItem from './ListItem.jsx'
import React from 'react'
import axios from 'axios'


export default function App() {

  const [message,setMessage] = useState('')
  const [items,setItems] = useState([])
  
  const apiURL = import.meta.env.VITE_API_URL

  useEffect(()=>{
    async function fetchTodos() {
      try {
        const response = await axios.get(`${apiURL}/item-retrieve`)
        if(response.status === 200){
          setItems(response.data)
        }
      } catch (error) {
        console.error('error fetchin data:', error)
      }
    }
    fetchTodos()
  },[])
  
  
  return (
    
    <>
      <Form setMessage = {setMessage} setItems = {setItems} message = {message} items = {items}></Form>
      <ListItem items = {items} setItems = {setItems} ></ListItem>
    </>
  )
}

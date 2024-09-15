import React from 'react'
import {v4 as uuidv4} from "uuid"
import axios from 'axios'
import "./Form.css"

export default function Form({setItems,items,setMessage,message}) {

    async function handleSubmit(e){
    e.preventDefault()
    
    const newItem = {
        message:message,
        completed: false
    }

    try {
        const response = await axios.post('http://localhost:3000/api/item-create', newItem);
        if(response.status === 201){
            setItems((prevItems)=> [...prevItems,response.data])
        }
      } catch (error) {
        console.error('Error adding item:', error);
    }

    setMessage("")

    }

  return (
    <div className='header'>
        <h1>My To-do List</h1>
        <form method='POST' onSubmit = {handleSubmit}>
            <div>
            <label>Enter a to-do:</label>
            <input type='text' value={message} onChange={(e)=> setMessage(e.target.value)}></input>
            </div>
            <button>Submit</button>
        </form>
    </div>
  )

}

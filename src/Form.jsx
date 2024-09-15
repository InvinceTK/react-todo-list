import React from 'react'
import axios from 'axios'
import "./Form.css"



export default function Form({setItems,items,setMessage,message}) {
    const apiURL = import.meta.env.VITE_API_URL

    async function handleSubmit(e){
    e.preventDefault()
    
    const newItem = {
        message:message,
        completed: false
    }

    try {
        const response = await axios.post(`${apiURL}/item-create`, newItem);
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

import React from 'react'
import axios from 'axios'
import "./ListItem.css"
export default function ListItem({items, setItems}) {
   
   async function toggleCheckbox(id){
        const currentItem = items.find(item => item._id === id);

        setItems(prevItems => 
          prevItems.map((item) => 
            item._id === id ? { ...item, completed: !item.completed } : item
          )
        )

        try {
            const response = await axios.post('http://localhost:3000/api/item-update-checkbox', 
                {
                    completed : !currentItem.completed ,
                    _id: currentItem._id
                }
            )
        } catch (error) {
            console.error('error changing checkbox:',error)
        }
        //update the item in database with id 
      }
      
     async function handleDelete(id){
        setItems(items.filter( (item)=>{
          return item._id != id
        }))
        
        try {
            const response = await axios.post('http://localhost:3000/api/item-delete', {id})
        } catch (error) {
            console.error("error removing item:",error)
        }
        //delete the item from database with id
      }
  return (
    <div className='list-container'>
  
    {items.map((item)=> {
        return(
        <div className = "list-item" key = {item._id}>
            <div className='item-content'>
                <input type = 'checkbox' checked = {item.completed} onChange = {()=>toggleCheckbox(item._id)}></input>
                <span>{item.message}</span>
            </div>
            <button  className = "delete-button" onClick = {()=> handleDelete(item._id)} >Delete</button>
        </div>
        
        )
    })}
        
    </div>
  )
}

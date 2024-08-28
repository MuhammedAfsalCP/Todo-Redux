import React from 'react'
import { useState } from 'react'
function Component() {
  let [todos,setTodos]=useState([])
  let [todo,setTodo]=useState("")
  function save(event){
  setTodo(event.target.value)
  }
  function Change(){
    setTodos([...todos,todo])
    setTodo("")
    
  }
  function decrease(index){
  const remove=[...todos]
  remove.splice(index,1)
  setTodos(remove)
  }
  return (
    <div className='w-full min-h-[100vh] bg-[url(https://img.freepik.com/free-vector/gradient-dynamic-blue-lines-background_23-2148995756.jpg)] bg-cover flex justify-center flex-wrap pt-5'>
      <div className='w-[80%] flex flex-col h-auto' >
        <div className=' h-10 bg-white flex justify-between m-4'>
          <input value={todo} onChange={save} className='ml-2 w-[80%] outline-none' type="text" placeholder='Todo' />
          <button onClick={Change} className='bg-green-600 w-[17%]'><box-icon name='check' color='#ffffff' ></box-icon></button>
        </div>
        {todos.map((val,index)=>{
        return val!=""?<div className=' h-10 bg-white flex justify-between m-4'>
        <p className='mt-2'>{val}</p>  
         <button onClick={decrease}className='bg-red-600 w-[17%]'><box-icon name='x' color='#ffffff'></box-icon></button>
       </div>:null
        })}
      </div>
    </div>
  )
}

export default Component

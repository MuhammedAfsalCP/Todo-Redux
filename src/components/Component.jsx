import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { save, Change, decrease, editing, complete, alldelete, contentsave,completedelete } from './state'
function Component() {
  const todos = useSelector((state) => state.todo.todos)
  const todo = useSelector((state) => state.todo.todo)
  const status = useSelector((state) => state.todo.status)
  const completed = useSelector((state) => state.todo.completed)
  const contents = useSelector((state) => state.todo.Contents)
  const content = useSelector((state) => state.todo.content)
  console.log(completed)
  const [edit, setedit] = useState(null)
  const [editvalue, setEditval] = useState("")
  const [contentEdit, setContentEdit] = useState("")
  const [add, setAdd] = useState(false)
  const dis = useDispatch()
  const save2 = (index) => {
    setedit(null)
    dis(editing({ editvalue, contentEdit, index }))
    setEditval("")
    setContentEdit("")
  }
  const check = () => {
    const len = todo.trim()
    const len2=content.trim()
    if (len.length != 0&&len2.length!=0) {
      dis(Change())
      setAdd(false)
    } else {
      console.log("please enter correctly")
    }
  }
  return (
    <div className='w-full min-h-[100vh] bg-[url(https://img.freepik.com/free-vector/gradient-dynamic-blue-lines-background_23-2148995756.jpg)] bg-cover flex justify-center flex-wrap pt-5'>
      <div className='w-[80%] flex flex-col h-auto'>
        <div className='rounded-md h-10 flex justify-between'>
          <button style={{ display: add === false ? 'inline-block' : 'none' }} onClick={() => setAdd(true)} className='bg-white px-4 py-2 rounded-md shadow-md' >Create Task</button>
          <div style={{ display: add === true ? 'block' : 'none' }} className=" p-4 rounded-md shadow-md w-full mt-4">
            <h4 className="text-lg font-semibold mb-2">Heading</h4>
            <input value={todo} onChange={(e) => dis(save(e.target.value))} className='w-full border p-2 mb-4 rounded-md outline-none' type="text" placeholder='Heading' />
            <h4 className="text-lg font-semibold mb-2">Content</h4>
            <textarea value={content} onChange={(e) => dis(contentsave(e.target.value))} className='w-full border p-2 mb-4 rounded-md outline-none' placeholder="Task Details" ></textarea>
             <button onClick={check} className='rounded bg-green-600 text-white px-4 py-2 mt-4' > <box-icon name='check' color='#ffffff' ></box-icon> </button>
          </div>
        </div>
        <h1 style={{marginTop:add==false?'50px':'300px'}} className="text-2xl font-bold mb-4">Pending Tasks</h1>
        <table className='min-w-full table-auto bg-white shadow-md rounded-md'>
          <thead>
            <tr>
              <th className='px-4 py-2 border'>Heading</th>
              <th className='px-4 py-2 border'>Content</th>
              <th className='px-4 py-2 border'>Status</th>
              <th className='px-4 py-2 border'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((val, index) => {
              return val !== "" && (
                <tr key={index} className='border-b'>
                  <td className='px-4 py-2 border'>
                    {edit === index ? (
                    <input value={editvalue} onChange={(e) => setEditval(e.target.value)} className='w-full border p-2 rounded-md outline-none' />
                    ) : ( <p>{val.heading}</p> )}
                  </td>
                  <td className='px-4 py-2 border'>
                    {edit === index ? (
                    <textarea value={contentEdit} onChange={(e) => setContentEdit(e.target.value)} className='w-full border p-2 rounded-md outline-none' />
                    ) : ( <p>{val.content}</p> )}
                  </td>
                  <td className='px-4 py-2 border'>
                    {val.status}
                  </td>
                  <td className='px-4 py-2 border flex justify-center items-center space-x-2'>
                    {val.status === "pending" && (
                      <button className='bg-green-600 text-white px-4 py-1 rounded-md' onClick={() => dis(complete({ index }))} > Complete </button>
                    )}
                    <button onClick={() => dis(decrease(index))} className='bg-red-600 text-white px-4 py-1 rounded-md' > <box-icon name='x' color='#ffffff'></box-icon> </button>
                    {edit !== index ? (
                      <button onClick={() => { setedit(index); setEditval(val.heading); setContentEdit(val.content) }} className='bg-blue-600 text-white px-4 py-1 rounded-md' > Edit </button>
                    ) : (
                      <button onClick={() => save2(index)} className='bg-yellow-600 text-white px-4 py-1 rounded-md'> Save </button>
                    )}
                    
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className='mt-8'>
          <h1 className="text-2xl font-bold mt-8 mb-4">Completed Tasks</h1>
          <table className='min-w-full table-auto bg-white shadow-md rounded-md'>
            <thead>
              <tr>
                <th className='px-4 py-2 border'>Heading</th>
                <th className='px-4 py-2 border'>Content</th>
              </tr>
            </thead>
            <tbody>
              {completed.map((val, index) => (
                <tr key={index} className='border-b'> 
                  <td className='px-4 py-2 border'>
                    <p>{val.heading}</p>
                  </td>
                  <td className='px-4 py-2 border'>
                    <p>{val.content}</p>
                  </td>
                  <td className='px-4 py-2 border flex justify-center items-center space-x-2'>
                    
                    <button className='bg-red-600 text-white' onClick={()=>dis(completedelete(index))}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => dis(alldelete())} style={{ display: completed.length === 0 ? "none" : "inline-block" }} className='bg-red-600 text-white px-4 py-2 mt-4 rounded-md' >
            Delete All
          </button>
        </div>
      </div>
    </div>
  )
}
export default Component

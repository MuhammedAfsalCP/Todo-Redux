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
    <div className="w-full min-h-screen bg-cover bg-[url('https://img.freepik.com/free-vector/gradient-dynamic-blue-lines-background_23-2148995756.jpg')] flex justify-center pt-5 px-2 md:px-0 overflow-auto">
    <div className="w-full md:w-[80%] flex flex-col h-auto overflow-auto">
      {/* Task Creation Section */}
      <div className="rounded-md h-10 flex justify-between">
        <button
          style={{ display: add === false ? 'inline-block' : 'none' }}
          onClick={() => setAdd(true)}
          className="bg-white px-4 py-2 rounded-md shadow-md text-sm md:text-base"
        >
          Create Task
        </button>
        <div
          style={{ display: add === true ? 'block' : 'none' }}
          className="p-4 rounded-md shadow-md w-full mt-4"
        >
          <h4 className="text-lg font-semibold mb-2">Heading</h4>
          <input
            value={todo}
            onChange={(e) => dis(save(e.target.value))}
            className="w-full border p-2 mb-4 rounded-md outline-none text-sm md:text-base"
            type="text"
            placeholder="Heading"
          />
          <h4 className="text-lg font-semibold mb-2">Content</h4>
          <textarea
            value={content}
            onChange={(e) => dis(contentsave(e.target.value))}
            className="w-full border p-2 mb-4 rounded-md outline-none text-sm md:text-base"
            placeholder="Task Details"
          ></textarea>
          <button
            onClick={check}
            className="rounded bg-green-600 text-white px-4 py-2 mt-4 flex justify-center items-center text-sm md:text-base"
          >
            <box-icon name="check" color="#ffffff"></box-icon>
          </button>
        </div>
      </div>
  
      <h1
        style={{ marginTop: add === false ? '50px' : '300px' }}
        className="text-2xl font-bold mb-4"
      >
        Pending Tasks
      </h1>
  
      {/* Desktop View - Table Layout */}
      <div className="hidden md:block max-h-96 overflow-y-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-md text-sm md:text-base">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Heading</th>
              <th className="px-4 py-2 border">Content</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((val, index) => (
              val !== "" && (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 border">
                    {edit === index ? (
                      <input
                        value={editvalue}
                        onChange={(e) => setEditval(e.target.value)}
                        className="w-full border p-2 rounded-md outline-none text-sm md:text-base"
                      />
                    ) : (
                      <p>{val.heading}</p>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {edit === index ? (
                      <textarea
                        value={contentEdit}
                        onChange={(e) => setContentEdit(e.target.value)}
                        className="w-full border p-2 rounded-md outline-none text-sm md:text-base"
                      ></textarea>
                    ) : (
                      <p>{val.content}</p>
                    )}
                  </td>
                  <td className="px-4 py-2 border">{val.status}</td>
                  <td className="px-4 py-2 border flex space-x-2 justify-center">
                    {val.status === "pending" && (
                      <button
                        className="bg-green-600 text-white px-2 md:px-4 py-1 rounded-md "
                        onClick={() => dis(complete({ index }))}
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => dis(decrease(index))}
                      className="bg-red-600 text-white px-2 md:px-4 py-1 rounded-md"
                    >
                      <box-icon name="x" color="#ffffff"></box-icon>
                    </button>
                    {edit !== index ? (
                      <button
                        onClick={() => {
                          setedit(index);
                          setEditval(val.heading);
                          setContentEdit(val.content);
                        }}
                        className="bg-blue-600 text-white px-2 md:px-4 py-1 rounded-md"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={() => save2(index)}
                        className="bg-yellow-600 text-white px-2 md:px-4 py-1 rounded-md"
                      >
                        Save
                      </button>
                    )}
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Mobile View - Card Layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden max-h-96 overflow-y-auto">
        {todos.map((val, index) => (
          val !== "" && (
            <div key={index} className="bg-white shadow-md rounded-md p-4 border space-y-2">
              <div>
                <h4 className="font-semibold">Heading</h4>
                {edit === index ? (
                  <input
                    value={editvalue}
                    onChange={(e) => setEditval(e.target.value)}
                    className="w-full border p-2 rounded-md outline-none text-sm"
                  />
                ) : (
                  <p>{val.heading}</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold">Content</h4>
                {edit === index ? (
                  <textarea
                    value={contentEdit}
                    onChange={(e) => setContentEdit(e.target.value)}
                    className="w-full border p-2 rounded-md outline-none text-sm"
                  ></textarea>
                ) : (
                  <p>{val.content}</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold">Status</h4>
                <p>{val.status}</p>
              </div>
              <div className="flex space-x-2">
                {val.status === "pending" && (
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded-md"
                    onClick={() => dis(complete({ index }))}
                  >
                    Complete
                  </button>
                )}
                <button
                  onClick={() => dis(decrease(index))}
                  className="bg-red-600 text-white px-2 py-1 rounded-md"
                >
                  <box-icon name="x" color="#ffffff"></box-icon>
                </button>
                {edit !== index ? (
                  <button
                    onClick={() => {
                      setedit(index);
                      setEditval(val.heading);
                      setContentEdit(val.content);
                    }}
                    className="bg-blue-600 text-white px-2 py-1 rounded-md"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => save2(index)}
                    className="bg-yellow-600 text-white px-2 py-1 rounded-md"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          )
        ))}
      </div>
  
      {/* Completed Tasks Section */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold mt-8 mb-4">Completed Tasks</h1>
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-md text-sm md:text-base">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Heading</th>
                <th className="px-4 py-2 border">Content</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {completed.map((val, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 border">{val.heading}</td>
                  <td className="px-4 py-2 border">{val.content}</td>
                  <td className="px-4 py-2 border flex justify-center items-center space-x-2">
                    <button
                      className="bg-red-600 text-white text-sm md:text-base"
                      onClick={() => dis(completedelete(index))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={() => dis(alldelete())}
          style={{ display: completed.length === 0 ? "none" : "inline-block" }}
          className="bg-red-600 text-white px-4 py-2 mt-4 rounded-md text-sm md:text-base"
        >
          Delete All
        </button>
      </div>
    </div>
  </div>
  
  )
}
export default Component

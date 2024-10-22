import { createSlice } from "@reduxjs/toolkit";


const initialState={
    todo:'',
    todos:[],
    content:'',
    // Contents:[],
    // status:[],
    // hide:false,
    completed:[],
}

const todoSlice=createSlice({
    name:'todos',
    initialState,
    reducers:{
        save:(state,action)=>{
            state.todo=action.payload
            
        },
        contentsave:(state,action)=>{
            state.content=action.payload
        },
        Change:(state)=>{
            state.todos.push({
                heading:state.todo,
                content:state.content,
                status:"pending"
            })
            state.todo=""
            state.content=""
        },
        decrease:(state,action)=>{
            state.todos.splice(action.payload,1)
           
        },editing: (state, action) => {
            const { editvalue,contentEdit, index } = action.payload;
            
            state.todos[index].heading = editvalue; 
            state.todos[index].content=contentEdit
           
        },complete:(state,action)=>{
            const {index}=action.payload
            state.todos[index].status="complete"

            state.completed.push(state.todos[index])
            state.todos.splice(index,1)
       
        },
        alldelete:(state)=>{
            state.completed=[]
        },
        completedelete:(state,action)=>{
            state.completed.splice(action.payload,1)
        }
    }
})
export default todoSlice.reducer
export const {save,Change,decrease,editing,complete,pending,alldelete,contentsave,completedelete}=todoSlice.actions
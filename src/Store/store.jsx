import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from '../components/state'

const store =configureStore({
    reducer:{
        todo:todoSliceReducer
    }
})
export default store
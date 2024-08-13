import { configureStore } from "@reduxjs/toolkit";
import todoslice from "./Todoslice";
const store=configureStore({
    reducer:{
        todo:todoslice
    }
})
export default store;
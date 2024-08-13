import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";


export async function getTodo(){
    let Todolist=await localforage.getItem("todo");

    if(!Todolist)Todolist=[];
return  Todolist.sort(sortBy("datetime"))
}



export async function createTodo(Tododata){
let todos=await localforage.getItem("todo")|| [];
if(!Tododata){
    return null;
}
todos.push(Tododata)
await set(todos)
return null;
}
export async function updateTodo(id, updatedTodo) {
    let todos = await localforage.getItem("todo") || [];
    let index = todos.findIndex(todo => todo.id === id);
    if (index === -1) throw new Error("No todo found for id: " + id);
    todos[index] = updatedTodo;
    await set(todos);
    return updatedTodo;
  }
  




export async function deleteTodo(id){
let todos=await localforage.getItem("todo");
let index=todos.findIndex(todo=>todo.id===id);
if(index>-1){
    todos.splice(index,1);
   await set(todos)
    return true;
}
return false;
}



function set(tododata){
return localforage.setItem("todo",tododata)
}
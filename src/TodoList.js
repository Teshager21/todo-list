"use strict"
import { todos } from "./ToDos";
const { v4: uuidv4 } = require('uuid');

const ToDoList=(name)=>{
    if(!localStorage.getItem('todoLists')){
        localStorage.setItem('todoLists',JSON.stringify({}));
    }
let id=uuidv4();
 let todoList=[];
 name=name;
  const getID=()=>{ 
    return id;
 }
  const getList=()=>{
    return todoList;
 }
  const addToList=(todoID)=>{
  todoList.push(todoID);
 };
  const removeFromList=(todoID)=>{
   todoList=todoList.splice(todoList.indexOf(todoID),1);
 }

 return {getID,getList,addToList,removeFromList}

}

const ToDoLists=()=>{
let todoLists={};
const allToDoLists=()=>{
    return todoLists;
}
const createList=(name)=>{
    let newToDoList=ToDoList(name);
    todoLists[newToDoList.getID()]=newToDoList.getList();
    localStorage.setItem('todoLists',JSON.stringify(todoLists));

    return newToDoList;
};
 const readList=(todoListID)=>{
     return todoLists[todoListID];
 };
 const deleteList=(todoListID)=>{
      delete todoLists[todoListID];
      localStorage.setItem('todoLists',JSON.stringify(todoLists));
 }

 const updateList=(listID,newToDoList)=>{
    todoLists[listID]=newToDoList.getToDoList();
    localStorage.setItem('todoLists',JSON.stringify(todoLists));
 }

return {allToDoLists,createList,readList,deleteList,updateList}
}

export {ToDoList,ToDoLists};
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
 const getName=()=>{
    return name;
 }
  const getList=()=>{
    return todoList;
 }
  const addToList=(todoID)=>{
  todoList.push(todoID);
  localStorage.setItem('todoLists',JSON.stringify(todoLists));
 };
  const removeFromList=(todoID)=>{
    // console.log('before delete',todoList)
   todoList.splice(todoList.indexOf(todoID),1);
//    console.log('after delelte',todoList)
 };

 return {getID,getList,addToList,removeFromList}

}

const ToDoLists=()=>{
let todoLists={};
const allToDoLists=()=>{return todoLists;}
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

 const removeToDoFromList=(todoID,listID)=>{
    const newList=todoLists[listID];
    newList.splice(newList.indexOf(todoID),1)
    updateList(listID,newList);
 }

 const addToDoToList=(todoID,listID)=>{
    const newList=todoLists[listID];
    console.log("the list before",listID,todoLists)
    newList.push(todoID);
    updateList(listID,newList);
    // localStorage.setItem('todoLists',JSON.stringify(todoLists)); 
 }

 const updateList=(listID,newToDoList)=>{
    console.log('-------todolist before',todoLists)
    todoLists[listID]=newToDoList;
    localStorage.setItem('todoLists',JSON.stringify(todoLists));
    console.log('-----todolist after',todoLists)
 };
 const addToList=(todoListID,todoID)=>{
    console.log('been here',todoLists[todoListID]);
    todoLists[todoListID].push(todoID); 
    localStorage.setItem('todoLists',JSON.stringify(todoLists));
   };

return {allToDoLists,createList,readList,deleteList,updateList,addToList,removeToDoFromList,addToDoToList}
}

export {ToDoList,ToDoLists};
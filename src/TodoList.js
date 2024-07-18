"use strict"
import { todos } from "./ToDos";
const { v4: uuidv4 } = require('uuid');

const ToDoList=(name)=>{
    
let id=name;
 let todoList=[];
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
    let todoLists;
    console.log('we are in todolists');
    if(localStorage.getItem('todoLists')===null){
      console.log('there is noooo list in local storage');
        localStorage.setItem('todoLists',JSON.stringify({}));
    }else{
      console.log('there is a list in local storage');
       todoLists=JSON.parse(localStorage.getItem('todoLists'));
    }
   const importLists=(lists)=>{
          todoLists=lists;
   }

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
    newList.push(todoID);
    updateList(listID,newList);
    // localStorage.setItem('todoLists',JSON.stringify(todoLists)); 
 }

 const updateList=(listID,newToDoList)=>{
    todoLists[listID]=newToDoList;
    localStorage.setItem('todoLists',JSON.stringify(todoLists));
 };
 const addToList=(todoListID,todoID)=>{
    todoLists[todoListID].push(todoID); 
    localStorage.setItem('todoLists',JSON.stringify(todoLists));
   };

return {allToDoLists,createList,readList,deleteList,updateList,addToList,removeToDoFromList,addToDoToList,importLists}
}

export {ToDoList,ToDoLists};
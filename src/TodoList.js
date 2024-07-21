"use strict"

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
//   localStorage.setItem('todoLists',JSON.stringify(todoLists));
 };
  const removeFromList=(todoID)=>{
   todoList.splice(todoList.indexOf(todoID),1);
 };

 return {getID,getList,addToList,removeFromList}

}

const ToDoLists=()=>{
    let todoLists;
    if(localStorage.getItem('todoLists')===null){
        localStorage.setItem('todoLists',JSON.stringify({}));
    }else{
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
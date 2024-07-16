import {dialog} from "./Dialog";
const sidebar=document.createElement('aside');
sidebar.classList.add('aside');

const addListBtn=document.createElement('button');
addListBtn.textContent="+Add ToDo List"
addListBtn.classList.add('btn');
addListBtn.addEventListener('click',()=>{
    console.log('clicked the project list')
    document.getElementById('listDialog').showModal();
})

//add to do btn 
const addTodoBtn= document.createElement('button');
addTodoBtn.textContent="+ Add Task";
addTodoBtn.classList.add('btn')
addTodoBtn.addEventListener('click',()=>{
    dialog.showModal();
})

//todolists btn
const showTodoLists= document.createElement('button');
showTodoLists.textContent="Todo Lists";
showTodoLists.classList.add('btn');

//Tasks btn
const Tasks= document.createElement('button');
Tasks.textContent="All Tasks";
Tasks.classList.add('btn')


sidebar.appendChild(dialog);

const todoValues=dialog.addEventListener('close',(e)=>{
    return JSON.parse(dialog.returnValue);
})

console.log(todoValues)
sidebar.append(addTodoBtn,addListBtn,showTodoLists,Tasks);










export {sidebar,showTodoLists,Tasks};
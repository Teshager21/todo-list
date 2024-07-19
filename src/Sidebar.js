import {dialog} from "./Dialog";
const sidebar=document.createElement('aside');
sidebar.classList.add('aside');

const addListBtn=document.createElement('button');
addListBtn.textContent="+Add ToDo List"
addListBtn.classList.add('btn','btn-silent');
addListBtn.addEventListener('click',()=>{
    document.getElementById('listDialog').showModal();
})

//add to do btn 
const addTodoBtn= document.createElement('button');
addTodoBtn.textContent="+ Add Task";
addTodoBtn.classList.add('btn','btn-silent')
addTodoBtn.addEventListener('click',()=>{
    dialog.showModal();
})

//today btn
const todayBtn= document.createElement('button');
todayBtn.textContent="Today";
todayBtn.classList.add('btn','btn-silent')


//todolists btn
const showTodoLists= document.createElement('button');
showTodoLists.textContent="Todo Lists";
showTodoLists.classList.add('btn','btn-silent');

//Tasks btn
const Tasks= document.createElement('button');
Tasks.textContent="All Tasks";
Tasks.classList.add('btn','btn-silent')


sidebar.appendChild(dialog);

const todoValues=dialog.addEventListener('close',(e)=>{
    return JSON.parse(dialog.returnValue);
})

sidebar.append(todayBtn,Tasks,showTodoLists,addTodoBtn,addListBtn);


export {sidebar,showTodoLists,Tasks,todayBtn};
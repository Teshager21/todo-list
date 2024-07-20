import { ImportDialog,dialog } from "./Dialog";
import {todoCard,listCard} from "./ToDoCard";
const main=()=>{
const Main=document.createElement('div');
Main.classList.add('main')
const Title=document.createElement('h3');
const setTitle=(title)=>{
    Title.textContent=title;
}

const Cards= document.createElement('div');
Cards.classList.add('cards');
const addTodoCard=(title,priority,id,list,status)=>{
    let todo=todoCard(title,priority,id,list,status);
    Cards.append(todo);
}

const addListCard=(title,id)=>{
    let list=listCard(title,id);
    Cards.append(list);
}

const actionBar= document.createElement('div');
const Actions=document.createElement('div');
const importTodo=document.createElement('button');
importTodo.textContent="Import Tasks";
importTodo.setAttribute('data-action','import')
importTodo.classList.add('btn')


const addActions=(type,listID)=>{
    //add list btn
    const addListBtn=document.createElement('button');
    addListBtn.textContent="+Add ToDo List"
    addListBtn.classList.add('btn');
    addListBtn.addEventListener('click',()=>document.getElementById('listDialog').showModal());

    //add to do btn 
    const addTodoBtn= document.createElement('button');
    addTodoBtn.textContent="+ Add Task";
    addTodoBtn.classList.add('btn')
    addTodoBtn.addEventListener('click',()=>{
        dialog.showModal();
    });

    importTodo.setAttribute('id',listID);
    ImportDialog.setAttribute('data-list',listID);
    Actions.innerHTML='';
    if(type==='list'|| type==='project'){
        Actions.append(importTodo);
    }
    if(type==='lists'){
        Actions.append(addListBtn);
    }
    if(type==='todos'){
        Actions.append(addTodoBtn);
    }
    if(type==='noAction'){
        // Actions.innerHTML='';
    }
// Actions.append(addTodoBtn);
    }
    actionBar.append(Title,Actions);
    actionBar.classList.add('actionBar');
    Main.append(actionBar,Cards);

    const insertSubtitle=(text)=>{
    const subTitle= document.createElement('h4');
    subTitle.textContent=text;
    subTitle.classList.add('sub-title');
    Cards.append(subTitle);
    }

return {Main,Cards,Actions,addTodoCard,addListCard,addActions,setTitle,insertSubtitle};
}

export default main;
import  { ImportDialog,dialog } from './Dialog';
import {todoCard,listCard} from "./ToDoCard";
import { Button } from './Utilities';
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faChevronCircleRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from '@fortawesome/free-regular-svg-icons';

library.add(faCheck,faFlag,faChevronRight,faChevronLeft);
dom.watch();

const main=()=>{
const Main=document.createElement('div');
Main.classList.add('main')
const Title=document.createElement('h3');
const setTitle=(title)=>{ 
    Title.textContent=title;
}

const Cards= document.createElement('div');
Cards.classList.add('cards');
const addTodoCard=(title,dueDate,priority,id,context,status)=>{
    let todo=todoCard(title,dueDate,priority,id,context,status);
    Cards.append(todo);
}

const addListCard=(title,id)=>{
    let list=listCard(title,id);
    Cards.append(list);
}

const actionBar= document.createElement('div');
const Actions=document.createElement('div');
const importTodo=Button('Import Tasks',null,'btn');
importTodo.setAttribute('data-action','import');


 //add list btn
 const addListBtn= Button("+ ToDo List",null,'btn');
 addListBtn.addEventListener('click',()=>document.getElementById('listDialog').showModal());
 //add to do btn 
 const addTodoBtn=Button("+ Task",null,'btn');
 addTodoBtn.addEventListener('click',()=>{
     dialog.showModal();
 });
const addActions=(type,listID)=>{
    importTodo.setAttribute('id',listID);
    ImportDialog.setAttribute('data-list',listID);
    Actions.innerHTML='';
    if(type==='list'|| type==='project') Actions.append(importTodo);
    if(type==='lists')Actions.append(addListBtn);
    if(type==='todos') Actions.append(addTodoBtn);
    if(type==='noAction'){}
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

return {Main,Cards,Actions,addTodoBtn,addListBtn,addTodoCard,addListCard,addActions,setTitle,insertSubtitle};
}

export default main;
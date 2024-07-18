import { ImportDialog } from "./Dialog";
import {todoCard,listCard} from "./ToDoCard";
const main=()=>{
const Main=document.createElement('div');
Main.classList.add('main')
const Title=document.createElement('h3');
const setTitle=(title)=>{
    Title.textContent=title;
}

const Cards= document.createElement('div');
Cards.classList.add('main');
// main.textContent="Here goes the main";
const addTodoCard=(title,priority,id,list)=>{
    let todo=todoCard(title,priority,id,list);
    Cards.append(todo);
}

const addListCard=(title,id)=>{
    let list=listCard(title,id);
    Cards.append(list);
}

const Actions=document.createElement('div');
const importTodo=document.createElement('button');
importTodo.textContent="Import Tasks";
importTodo.setAttribute('data-action','import')
importTodo.classList.add('btn')


// actions.append(importTodo);
const addActions=(type,listID)=>{
    importTodo.setAttribute('id',listID);
    ImportDialog.setAttribute('data-list',listID)
    if(type==='list'|| type==='project'){
        Actions.innerHTML='';
        Actions.append(importTodo);
        console.log('call got here');
    }
    if(type==='lists'){
        Actions.innerHTML='';
    }
    if(type==='todos'){
        Actions.innerHTML='';
    }

}
Main.append(Title,Cards,Actions);

// let todo2=todoCard('This must be the Second Task',"OverDue")

return {Main,Cards,Actions,addTodoCard,addListCard,addActions,setTitle};
}

export default main;
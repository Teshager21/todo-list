import { ImportDialog } from "./Dialog";
import {todoCard,listCard} from "./ToDoCard";
const main=()=>{
const Main=document.createElement('div');
Main.classList.add('main')
const Title=document.createElement('h5');
Title.textContent="Lists"
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
        Actions.append(importTodo);
    }
}
Main.append(Title,Cards,Actions);

// let todo2=todoCard('This must be the Second Task',"OverDue")

return {Main,Cards,Actions,addTodoCard,addListCard,addActions};
}

export default main;
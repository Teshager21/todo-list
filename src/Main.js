import {todoCard,listCard} from "./ToDoCard";
const main=()=>{
const Main=document.createElement('div');
Main.classList.add('main')
// main.textContent="Here goes the main";
const addTodoCard=(title,status,id,list)=>{
    let todo=todoCard(title,status,id,list);
    Main.append(todo);
}

const addListCard=(title,id)=>{
    let list=listCard(title,id);
    Main.append(list);
}

// let todo2=todoCard('This must be the Second Task',"OverDue")

return {Main,addTodoCard,addListCard};
}

export default main;
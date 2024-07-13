import todoCard from "./ToDoCard";
const main=()=>{
const Main=document.createElement('div');
Main.classList.add('main')
// main.textContent="Here goes the main";
const addTodoCard=(title,status)=>{
    let todo=todoCard(title,status);
    Main.append(todo);
}

// let todo2=todoCard('This must be the Second Task',"OverDue")

return {Main,addTodoCard};
}

export default main;
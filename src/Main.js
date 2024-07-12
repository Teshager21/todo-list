import todoCard from "./ToDoCard";
const main=document.createElement('div');
main.classList.add('main')
// main.textContent="Here goes the main";
let todo=todoCard('This is the first to do',"Open");
let todo2=todoCard('This must be the Second Task',"OverDue")
main.append(todo,todo2);

export default main;
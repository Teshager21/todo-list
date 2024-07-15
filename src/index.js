import { todos} from './ToDos';
import { projects} from './Projects';
import { ToDoLists, ToDoList } from './ToDoList';
import {sidebar,showTodoLists }from './Sidebar';
import main from './Main';
import {dialog,listDialog} from './Dialog';
import './style.css';
import { list } from 'postcss';

// const myProjects=projects();
// const today=myProjects.createProject('today');
// const work= myProjects.createProject('work');
// const todo1=todos.createToDo("clean the room","use the broom and the brush",'1/1/2025','very important');
// const todo2= todos.createToDo("Do your job","use the broom and the brush",'1/1/2025','very important');
// todos.updateToDo(todo1,"do 5S on the room","use the broom and the brush",'1/1/2025','very important');
// today.addToDotoProject(todo1);  //asign a todo to a project
//  work.addToDotoProject(todo2);
// today.addToDotoProject(todo2);
// myProjects.deleteProject(work.getID());
// today.deleteToDoFromProject(todo2);
const myToDoLists= ToDoLists();
const today=myToDoLists.createList('today');
const work=myToDoLists.createList('work');
const todo1=todos.createToDo("1. clean the room","use the broom and the brush",'1/1/2025','very important');
const todo2= todos.createToDo("2. Do your job","use the broom and the brush",'1/1/2025','very important');
const todo3= todos.createToDo("3. Clean the dishes","use the broom and the brush",'1/1/2025','important');

// today.addToList(todo3);
// console.log('today',today.getList(),today.getID());


// console.log('after removal',today.getList())
// myToDoLists.addToList(work.getID(),todo1);
// work.addToList(todo1);
// work.addToList(todo2);
// work.addToList(todo3);
myToDoLists.addToDoToList(todo1,work.getID());
myToDoLists.addToDoToList(todo2,work.getID());
myToDoLists.addToDoToList(todo3,today.getID());
// console.log('the to do',todo1,'the list b4 deletion',today.getList())
//  work.removeFromList(todo1);
//  work.removeFromList(todo2);
// console.log('the list after deletion;TODAY',today.getList())
// myToDoLists.deleteList(today.getID());
// console.log('mytodolist',Object.values(myToDoLists.allToDoLists()));
console.log('reading work',myToDoLists.readList(work.getID()));
// console.log('reading today',myToDoLists.readList(today.getID()));
console.log('localStorage-todos',JSON.parse(localStorage['todoLists']));
console.log('mytodolist',myToDoLists.allToDoLists())


//-------------THE VIEW------------------------------------------//

const content= document.createElement('div');
content.classList.add('content');
content.setAttribute('id','content');
document.body.append(content);
const mainComponent=main();

//-------put todo into todocards-----//

const displayList=(list,listID)=>{
    mainComponent.Main.innerHTML="";
    console.log('=========the list',list)
    // if(list.getID()) console.log('the id of issue',list.getID())
    let todoArray= Object.values(list)
    console.log('the list length is,,,,',todoArray.length)
    if(todoArray.length===0)return;
    todoArray.map((todo)=>{
        console.log('===========the todo',todo)
        const {title,priority}=todos.readToDo(todo);
        let id=todo;
        mainComponent.addTodoCard(title,priority,id,list); 
        mainComponent.Main.addEventListener('click',deleteCard)
    })
}

const displayLists=()=>{
    mainComponent.Main.innerHTML="";
    let listArray=Object.keys(myToDoLists.allToDoLists());
   
    listArray.map((list)=>{
        if(list.length===0)return;
        mainComponent.addListCard(list,list); 
    })
    mainComponent.Main.addEventListener('click',showListToDos)
}

const showListToDos=(e)=>{
    const list=myToDoLists.readList(e.target.getAttribute('data-list'))
    console.log('list when show is clicked....',list, '   and the attr',e.target.getAttribute('data-list'))
    displayList(list,list);
}

const deleteCard=(e)=>{
    const todoid=e.target.getAttribute('id');
    const listID=e.target.getAttribute('data-list')
    myToDoLists.removeToDoFromList(todoid,listID);
    displayList(work);
}

// displayList(work);
showTodoLists.addEventListener('click',()=>{
    displayLists();
})
sidebar.child

dialog.addEventListener('close',(e)=>{
    const returnValues=JSON.parse(dialog.returnValue);
    const {title,duedate,priority}=returnValues
    const todoID=todos.createToDo(title,'',duedate,priority,)
    //just testing
    myToDoLists.addToDoToList(todoID,work.getID());
    displayList(work);
   
})

listDialog.addEventListener('close',()=>{
    myToDoLists.createList(listDialog.returnValue);
    displayLists();
})

content.append(sidebar,mainComponent.Main);


 



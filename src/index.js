import { todos} from './ToDos';
import { projects} from './Projects';
import { ToDoLists, ToDoList } from './ToDoList';
import {sidebar,showTodoLists }from './Sidebar';
import main from './Main';
import {dialog,listDialog,ImportDialog,setOptions} from './Dialog';
import './style.css';
import { list } from 'postcss';
import { Tasks } from './Sidebar';

let myToDoLists= ToDoLists();
//-------------THE VIEW------------------------------------------//

const content= document.createElement('div');
content.classList.add('content');
content.setAttribute('id','content');
document.body.append(content);
const mainComponent=main();

//-------put todo into todocards-----//

const displayList=(list,listID)=>{
    mainComponent.Cards.innerHTML="";
    let todoArray= Object.values(list)
    if(todoArray.length===0)return;
    todoArray.map((todo)=>{
        const {title,priority}=todos.readToDo(todo);
        let id=todo;
        mainComponent.addTodoCard(title,priority,id,list); 
        mainComponent.addActions('',listID);
    })
}

const displayListArray=(list,listID)=>{
    mainComponent.Cards.innerHTML="";
    if(list){
    list.map((todoID)=>{
        const {title,priority}=todos.readToDo(todoID);
        mainComponent.setTitle(listID); 
        mainComponent.addTodoCard(title,priority,todoID,listID||'delete'); 
        let counter=mainComponent.Cards.children.length-1;
        console.log('the to do id',todoID);
        mainComponent.Cards.children[counter].addEventListener('click',(e)=>deleteToDo(e,todoID));
        mainComponent.Actions.addEventListener('click',(e)=>handleAction(e));
        if(listID!=="All Tasks") mainComponent.addActions('list',listID);
        
    })};
}

const handleAction=(e)=>{
    console.log('handling............')
if(e.target.getAttribute('data-action')==="import"){
    let todosArray=[];
    todos.getList().map((todoID)=>{
        todosArray.push({task:todos.readToDo(todoID).title,id:todoID});
    })
     ImportDialog.showModal();
     setOptions(todosArray); 
}
}

const deleteToDo=(e,todoID)=>{
    console.log('wer are deletiiiii....ng',e.target.nodeName, e.target.getAttribute('data-action'));
    if(e.target.nodeName==='BUTTON' && e.target.getAttribute('data-action')==='delete'){
        console.log("deleting  to do",todoID)
        todos.deleteToDo(todoID);
        myToDoLists.importLists(JSON.parse(localStorage.getItem('todoLists')));
        console.log('----------------------------------')
        displayListArray(todos.getList());
        console.log('----------------------------------')
    }
  
}

const displayLists=()=>{
    mainComponent.Cards.innerHTML="";
    // console.log('the supposed list of todos',(myToDoLists.allToDoLists()))
    if(myToDoLists.allToDoLists()===null||myToDoLists.allToDoLists()===undefined) return;
    let listArray=Object.keys(myToDoLists.allToDoLists());
    
    listArray.map((list)=>{
        if(list.length===0)return;
        mainComponent.setTitle("Lists")
        mainComponent.addListCard(list,list);
        let counter=mainComponent.Cards.children.length-1;
        mainComponent.Cards.children[counter].addEventListener('click',handleListActions)
        //mainComponent.Cards.addEventListener('click',);
        mainComponent.addActions('lists','todos');
    })
}

const handleListActions=(e)=>{
    if(e.target.nodeName==="BUTTON" && e.target.getAttribute('data-action')==='delete'){
           myToDoLists.deleteList(e.target.getAttribute('id'));
           displayLists();
    }else  showListToDos(e)
   
}

const showListToDos=(e)=>{
    const listName=e.target.getAttribute('data-list');
    myToDoLists.importLists(JSON.parse(localStorage.getItem('todoLists')));
    console.log('todo list @ showListToDos',myToDoLists.allToDoLists());
    const list=myToDoLists.readList(listName);
    mainComponent.setTitle(listName)
    console.log('calling display array on :',list,listName)
    displayListArray(list,listName);
    console.log('Called........');
    mainComponent.addActions('list',listName);
}

const removeToDo=(e,list)=>{
    
    if(e.target.nodeName!=='BUTTON') return;
    const todoid=e.target.getAttribute('id');
    const listID=e.target.getAttribute('data-list');
    console.log(listID===list);
    console.log(listID,list);
    myToDoLists.removeToDoFromList(todoid,listID);
    console.log(todoid,listID);
    displayListArray(myToDoLists.readList(listID),listID);
}

showTodoLists.addEventListener('click',()=>{  
    displayLists();
})
sidebar.child

dialog.addEventListener('close',(e)=>{
    if(dialog.returnValue==='null') return;
    const returnValues=JSON.parse(dialog.returnValue);
    const {title,duedate,priority}=returnValues
    const todoID=todos.createToDo(title,'',duedate,priority,);
    displayLists();
})

listDialog.addEventListener('close',()=>{
    console.log((listDialog.returnValue==='null'));
    if((listDialog.returnValue)==="null") return;
    myToDoLists.createList(listDialog.returnValue);
    displayLists();
});

ImportDialog.addEventListener('close',()=>{
    const dialogReturn=JSON.parse(ImportDialog.returnValue); 
    myToDoLists.addToDoToList(dialogReturn.taskID,dialogReturn.listID);
    displayListArray(myToDoLists.readList(dialogReturn.listID),dialogReturn.listID);
});

Tasks.addEventListener('click',()=>{
    displayListArray(todos.getList(),"All Tasks");
});

content.append(sidebar,mainComponent.Main);


 



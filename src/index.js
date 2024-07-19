import { todos} from './ToDos';
import { projects} from './Projects';
import { ToDoLists, ToDoList } from './ToDoList';
import {sidebar,showTodoLists,Tasks,todayBtn}from './Sidebar';
import main from './Main';
import {dialog,listDialog,ImportDialog,setOptions} from './Dialog';
import './style.css';
import { list } from 'postcss';

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
    let todolist=list.getList();
    let todoArray= Object.values(todolist)
    if(todoArray.length===0)return;
    todoArray.map((todo)=>{
        const {title,priority}=todo;
        let id=todo;
        mainComponent.addTodoCard(title,priority,id,list); 
        mainComponent.addActions('todos',listID);
        mainComponent.setTitle(listID);
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
        mainComponent.Cards.children[counter].addEventListener('click',(e)=>deleteToDo(e,todoID));
        mainComponent.Actions.addEventListener('click',(e)=>handleAction(e));
        if(listID!=="All Tasks") mainComponent.addActions('list',listID);
        if(listID=="All Tasks") mainComponent.addActions('todos',listID);
        
    })};
}

const handleAction=(e)=>{
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
    if(e.target.nodeName==='BUTTON' && e.target.getAttribute('data-action')==='delete'){
        todos.deleteToDo(todoID);
        myToDoLists.importLists(JSON.parse(localStorage.getItem('todoLists')));
        displayListArray(todos.getList());
    }
  
}

const displayLists=()=>{
    mainComponent.Cards.innerHTML="";
    if(myToDoLists.allToDoLists()===null||myToDoLists.allToDoLists()===undefined) return;
    let listArray=Object.keys(myToDoLists.allToDoLists());
    
    listArray.map((list)=>{
        if(list.length===0)return;
        mainComponent.setTitle("Lists")
        mainComponent.addListCard(list,list);
        let counter=mainComponent.Cards.children.length-1;
        mainComponent.Cards.children[counter].addEventListener('click',handleListActions)
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
    const list=myToDoLists.readList(listName);
    mainComponent.setTitle(listName)
    displayListArray(list,listName);
    mainComponent.addActions('list',listName);
}

const removeToDo=(e,list)=>{
    
    if(e.target.nodeName!=='BUTTON') return;
    const todoid=e.target.getAttribute('id');
    const listID=e.target.getAttribute('data-list');
    myToDoLists.removeToDoFromList(todoid,listID);
    displayListArray(myToDoLists.readList(listID),listID);
}

showTodoLists.addEventListener('click',()=>{  
    displayLists();
})

dialog.addEventListener('close',(e)=>{
    if(dialog.returnValue==='null') return;
    const returnValues=JSON.parse(dialog.returnValue);
    const {title,duedate,priority}=returnValues
    const todoID=todos.createToDo(title,'',duedate,priority,);
    displayLists();
})

listDialog.addEventListener('close',()=>{
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

const today =ToDoList('today');
todos.getList().map((taskID)=>{
    if(todos.readToDo(taskID).dueDate===new Date().toISOString().slice(0, 10)) today.addToList(todos.readToDo(taskID));
})

displayList(today,"Today");
todayBtn.addEventListener('click',()=>displayList(today,"Today"));

content.append(sidebar,mainComponent.Main);


 



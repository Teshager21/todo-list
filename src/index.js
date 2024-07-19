import { todos} from './ToDos';
import { projects} from './Projects';
import { ToDoLists, ToDoList } from './ToDoList';
import {sidebar,showTodoLists,Tasks,todayBtn,closedTasks}from './Sidebar';
import main from './Main';
import {dialog,listDialog,ImportDialog,setOptions,todoDetail} from './Dialog';
import './style.css';
import { list } from 'postcss';
import { Button } from 'bootstrap';

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
const displayToDo=(todoID)=>{
    const {title,priority,status}=todos.readToDo(todoID);
    mainComponent.addTodoCard(title,priority,todoID,'delete'); 
    let counter=mainComponent.Cards.children.length-1;
    mainComponent.Cards.children[counter].addEventListener('click',(e)=>handleCardClicks(e,todoID));

}
const displayListArray=(list,listID)=>{
    mainComponent.Cards.innerHTML="";
    if(list){
    list.map((todoID)=>{
        const {title,priority,status}=todos.readToDo(todoID);
        if(status!=='done'){
            mainComponent.setTitle(listID); 
            mainComponent.addTodoCard(title,priority,todoID,listID||'delete'); 
            let counter=mainComponent.Cards.children.length-1;
            mainComponent.Cards.children[counter].addEventListener('click',(e)=>handleCardClicks(e,todoID))
            mainComponent.Actions.addEventListener('click',(e)=>handleAction(e));
        }
       
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
const handleCardClicks=(e,todoID)=>{
    if(e.target.nodeName==='BUTTON' && e.target.getAttribute('data-action')==='delete'){
        todos.deleteToDo(todoID);
        myToDoLists.importLists(JSON.parse(localStorage.getItem('todoLists')));
        displayListArray(todos.getList());
    }
    else if(e.target.nodeName==="INPUT" && e.target.getAttribute('type')==='checkbox' ){
        let status;
        e.target.checked?status="done":status="open";
        const {id,title,description,dueDate,priority}=todos.readToDo(todoID);
        todos.updateToDo(id,title,description,dueDate,priority,status);
    }
    else{
        displayTaskDetail(todoID)
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

const displayTaskDetail=(todoID)=>{
mainComponent.Cards.innerHTML=""; 
mainComponent.setTitle(todos.readToDo(todoID).title);
const innerContent=todoDetail();
innerContent.populateContainer(todos.readToDo(todoID));
mainComponent.Cards.append(innerContent.dialogContainer);
mainComponent.Cards.addEventListener('click',(e)=>detailClicks(e,todoID,innerContent))
}

const detailClicks=(e,todoID,container)=>{
 if(e.target.nodeName==='BUTTON' && e.target.getAttribute('data-action')==='update'){
    const {title,description,dueDate,priority,status}=container.readContainer();
    todos.updateToDo(todoID,title,description,dueDate,priority,status);
    displayListArray(todos.getList(),'All Tasks')
 }
}

dialog.addEventListener('close',(e)=>{
    if(dialog.returnValue==='null') return;
    const returnValues=JSON.parse(dialog.returnValue);
    const {title,description,duedate,priority,status}=returnValues
    const todoID=todos.createToDo(title,description,duedate,priority,status);
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

closedTasks.addEventListener('click',()=>{
    mainComponent.Cards.innerHTML='';
    mainComponent.setTitle('Completed Tasks');
    for(let id of todos.getList()){
        if(todos.readToDo(id).status==='done'){
            displayToDo(id);
        }
    }
})

const today =ToDoList('today');
todos.getList().map((taskID)=>{
    if(todos.readToDo(taskID).dueDate===new Date().toISOString().slice(0, 10))
         {today.addToList(todos.readToDo(taskID));}
})
const displayToday=()=>{
    mainComponent.Cards.innerHTML="";
    mainComponent.setTitle("Today")
    for(let taskID of todos.getList()){
        if(todos.readToDo(taskID).dueDate===new Date().toISOString().slice(0, 10)) displayToDo(taskID);
    }
}
displayToday(); //default view when the app starts
todayBtn.addEventListener('click',displayToday);

content.append(sidebar,mainComponent.Main);


 



import { todos} from './ToDos';
import { projects} from './Projects';
import { ToDoLists, ToDoList } from './ToDoList';
import Sidebar from './Sidebar'
import main from './Main';
import {dialog,listDialog,ImportDialog,setOptions,todoDetail} from './Dialog';
import './style.css';
import menuPic from './resources/menu.png'
import Menu from './Menu';


let {allToDoLists,createList,readList,deleteList,updateList,addToList,removeToDoFromList,addToDoToList,importLists}= ToDoLists();
//-------------THE VIEW------------------------------------------//
const {sidebar,showTodoListsBtn,showAllTasksBtn,showTodayBtn,showClosedTasksBtn,addTodoBtn}=Sidebar;
const {Main,Cards,Actions,addTodoCard,addListCard,addActions,setTitle,insertSubtitle}=main();
const {menu,addListBtn}=Menu();

console.log(document.forms);
const content= document.createElement('div');
content.classList.add('content');
content.setAttribute('id','content');
document.body.append(content);

const nav = document.querySelector('nav');
const menuIcon= document.createElement('img');
menuIcon.src=menuPic;
menuIcon.classList.add('hamburger');
nav.append(menuIcon);
document.body.append(menu);
menu.style.display='none';
menuIcon.addEventListener('click',()=>toggleMenu());

const toggleMenu=()=>menu.style.display==='block'?menu.style.display='none':menu.style.display='block';

const displayToDo=(todoID,context)=>{
    const {title,dueDate,priority,status}=todos.readToDo(todoID);
    addTodoCard(title,dueDate,priority,todoID,Object.keys(context)[0],status); 
    let counter=Cards.children.length-1;
    Cards.children[counter].addEventListener('click',(e)=>handleCardClicks(e,todoID,context));    
}
const displayListTasks=(list,listID)=>{
    Cards.innerHTML="";
    setTitle(listID); 
    if(list){
    list.map((todoID)=>{
        const {status}=todos.readToDo(todoID);     
        if(status!=='done')displayToDo(todoID,{list:listID}); 
    })
    insertSubtitle('Completed Tasks');
    list.map((todoID)=>{
        const {status}=todos.readToDo(todoID);     
        if(status==='done') displayToDo(todoID,{list:listID});  
    })
    Actions.addEventListener('click',(e)=>handleAction(e));
    if(listID!=="All Tasks") addActions('list',listID);
    if(listID==="All Tasks") addActions('todos',listID);
};
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


const handleCardClicks=(e,todoID,context)=>{
    if(e.target.nodeName==='BUTTON' && e.target.getAttribute('data-action')==='delete'){
        if(Object.keys(context).includes('list')){
            removeToDoFromList(todoID,context.list);
        } else todos.deleteToDo(todoID);
        importLists(JSON.parse(localStorage.getItem('todoLists')));
        displayListTasks(ToDoLists().readList(context.list),context.list);
    }
    else if(e.target.nodeName==="INPUT" && e.target.getAttribute('type')==='checkbox' ){
        let status;
        e.target.checked?status="done":status="open";
        const {id,title,description,dueDate,priority}=todos.readToDo(todoID);
        todos.updateToDo(id,title,description,dueDate,priority,status);
        const contextKeys=Object.keys(context);
        if(contextKeys.includes('today')) displayToday();
        if(contextKeys.includes('list')) displayListTasks(readList(context.list),context.list);
        if(contextKeys.includes('closedTasks')) displayClosedTasks();
        if(contextKeys.includes('allTasks')) displayAllTasks();

    }
    else{
        displayTaskDetail(todoID)
    }
}


const displayLists=()=>{
    Cards.innerHTML="";
    if(allToDoLists()===null||allToDoLists()===undefined) return;
    let listArray=Object.keys(allToDoLists());
    
    listArray.map((list)=>{
        if(list.length===0)return;
        setTitle("Lists")
        addListCard(list,list);
        let counter=Cards.children.length-1;
        Cards.children[counter].addEventListener('click',handleListActions)
        addActions('lists','todos');
    })
}

const handleListActions=(e)=>{
    if(e.target.nodeName==="BUTTON" && e.target.getAttribute('data-action')==='delete'){
           deleteList(e.target.getAttribute('id'));
           displayLists();
    }else  showListToDos(e)

}

const showListToDos=(e)=>{
    const listName=e.target.getAttribute('data-list');
    importLists(JSON.parse(localStorage.getItem('todoLists')));
    const list=readList(listName);
    setTitle(listName)
    displayListTasks(list,listName);
    addActions('list',listName);
}

const removeToDo=(e,list)=>{
    
    if(e.target.nodeName!=='BUTTON') return;
    const todoid=e.target.getAttribute('id');
    const listID=e.target.getAttribute('data-list');
    removeToDoFromList(todoid,listID);
    displayListTasks(readList(listID),listID);
}

showTodoListsBtn.addEventListener('click',()=>{  
    displayLists();
})

const displayTaskDetail=(todoID)=>{
Cards.innerHTML=""; 
setTitle(todos.readToDo(todoID).title);
const innerContent=todoDetail();
innerContent.populateContainer(todos.readToDo(todoID));
Cards.append(innerContent.dialogContainer);
Cards.addEventListener('click',(e)=>detailClicks(e,todoID,innerContent))
}

const detailClicks=(e,todoID,container)=>{
 if(e.target.nodeName==='BUTTON' && e.target.getAttribute('data-action')==='update'){
    const {title,description,dueDate,priority,status}=container.readContainer();
    todos.updateToDo(todoID,title,description,dueDate,priority,status);
    displayListTasks(todos.getList(),'All Tasks')
 }
}

dialog.addEventListener('close',()=>handleDialogAction());

const handleDialogAction=()=>{
    if(dialog.returnValue==='null') return;
    const {title,description,duedate,priority,status}=JSON.parse(dialog.returnValue);
    const todoID=todos.createToDo(title,description,duedate,priority,status);
    displayListTasks(todos.getList(),"All Tasks");  
}

listDialog.addEventListener('close',()=>{
    if((listDialog.returnValue)==="null") return;
    createList(listDialog.returnValue);
    displayLists();
});

ImportDialog.addEventListener('close',()=>{
    const dialogReturn=JSON.parse(ImportDialog.returnValue); 
    addToDoToList(dialogReturn.taskID,dialogReturn.listID);
    displayListTasks(readList(dialogReturn.listID),dialogReturn.listID);
});

showAllTasksBtn.addEventListener('click',()=>{
    displayAllTasks();
});

const displayAllTasks=()=>{
    Cards.innerHTML='';
    setTitle('All Tasks');
    for(let id of todos.getList()){
        if(!isTaskCompleted(id)){
            displayToDo(id,{allTasks:todos.getList()});
        }
    }
    addActions('todos',"All Tasks");
}

const displayClosedTasks=()=>{
    Cards.innerHTML='';
    setTitle('Completed Tasks');
    for(let id of todos.getList()){
        if(isTaskCompleted(id)){
            displayToDo(id,{'closedTasks':todos.getList()});
        }
    } 
    addActions('noActions',"Closed Tasks"); 
}

showClosedTasksBtn.addEventListener('click',displayClosedTasks);

const isTaskDueToday=(taskID)=>{
    return (todos.readToDo(taskID).dueDate===new Date().toISOString().slice(0, 10));
};
const isTaskCompleted=(taskID)=>{
     return (todos.readToDo(taskID).status==='done');
};

const today =ToDoList('today');
todos.getList().map((taskID)=>{
    if(isTaskDueToday(taskID)) {
       today.addToList(todos.readToDo(taskID));
    }
})

const displayCompletedTodayTasks=()=>{
    for(let taskID of todos.getList()){   //display completed tasks
        if(isTaskDueToday(taskID)&& isTaskCompleted(taskID)) displayToDo(taskID,{today});
    }
}
const displayOpenTodayTasks=()=>{
    for(let taskID of todos.getList()){  //display uncommplted tasks
        if(isTaskDueToday(taskID) && (!isTaskCompleted(taskID))) displayToDo(taskID,{today});
    }
}
const displayToday=()=>{
    Cards.innerHTML="";
    setTitle("Today");
    displayOpenTodayTasks();
    insertSubtitle("Completed Tasks");
    displayCompletedTodayTasks();
    addActions('todos',"Today");
}
displayToday(); //default view when the app starts
showTodayBtn.addEventListener('click',displayToday);

content.append(sidebar,Main);


 



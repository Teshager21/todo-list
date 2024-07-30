
import {dialog}from "./Dialog";
import { Button } from "./Utilities";
import main from './Main'
    const {addTodoBtn,addListBtn}=main();
   
    const sidebar=document.createElement('aside');
    sidebar.classList.add('aside');
    const showTodayBtn= new Button("Today",null,'btn btn-silent')
    const showTodoListsBtn=Button("Todo Lists",null,'btn btn-silent');
    //Tasks btn 
    const showAllTasksBtn=Button('All Tasks',null,'btn btn-silent');
    //actionable btn
    const actionableImgsBtn=Button('Actionable Images','actionableImgsBtn','btn btn-silent');
    //closed Tasks btn
    const showClosedTasksBtn=Button('Closed Tasks',null,'btn btn-silent');
    addTodoBtn.addEventListener('click',()=>dialog.showModal());
    sidebar.append(showTodayBtn,showAllTasksBtn,showTodoListsBtn,showClosedTasksBtn,addTodoBtn,addListBtn,dialog,actionableImgsBtn);
 const Sidebar={sidebar,showTodoListsBtn,showAllTasksBtn,showTodayBtn,showClosedTasksBtn,addTodoBtn,addListBtn,dialog,actionableImgsBtn};

export default Sidebar;

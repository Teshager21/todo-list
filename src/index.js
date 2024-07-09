const { v4: uuidv4 } = require('uuid');
 const todoList={

 };
 
 const ToDo=(title,description,dueDate,priority)=>{
    title=title;
    description=description;
    dueDate =dueDate;
    priority=priority;
 let status;
const assesStatusofToDo=(()=>{
    //overdue
    //on progress
    //Done
    const today=Date.now();
    const dueDateFormatted= new Date(dueDate).getTime();
    if(dueDateFormatted<today && status!=='done') status="overdue";
    if(dueDateFormatted>today && status!=='done') status='on progress';
})();
 const getToDo=()=>{
    return {title,description,dueDate,priority,status}
 }
 return {getToDo}
 }

 let todo =ToDo("clean the room","use the broom and the brush",'1/1/2025','very important');
 let todo1 =ToDo("clean the room well","use the broom and the brush",'1/1/2025','very important');
 todoList[`${uuidv4()}`]=todo.getToDo();
 todoList[`${uuidv4()}`]=todo1.getToDo();
 console.log(todoList)
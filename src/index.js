 const ToDo=(title,description,dueDate,priority)=>{
 title=title;
 description=description;
    dueDate =dueDate;
 priority=priority;
 status;
const assesStatusofToDo=()=>{
    //overdue
    //on progress
    //Done
}
 const getToDo=()=>{
    return {title,description,dueDate,priority}
 }
 return {getToDo}
 }

 let todo =ToDo("clean the room","use the broom and the brush",'1/1/2024','very important');
 console.log(todo.getToDo());
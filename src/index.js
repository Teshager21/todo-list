const { v4: uuidv4 } = require('uuid');
if(!localStorage.getItem('todoList')){
    localStorage.setItem('todoList',JSON.stringify({}));
    console.log('here here....')
}
   
 const todoList={

addToDo:function(todo){
    let cache=JSON.parse(localStorage.getItem('todoList'));
    cache[`${uuidv4()}`]=todo;
    localStorage.setItem('todoList',JSON.stringify(cache));

},

updateToDo:function(id,new_title,new_description,new_dueDate,new_priority,new_status){
    let cache=JSON.parse(localStorage.getItem('todoList'));
    cache[id]=ToDo(new_title,new_description,new_dueDate,new_priority,new_status).getToDo();
    localStorage.setItem('todoList',JSON.stringify(cache));   
    },
deleteToDo:function(id){
        let cache=JSON.parse(localStorage.getItem('todoList'));
        delete cache[id];
        localStorage.setItem('todoList',JSON.stringify(cache));

    }
 };
 
 const ToDo=(title,description,dueDate,priority,status)=>{
    title=title;
    description=description;
    dueDate =dueDate;
    priority=priority;
    status=status;
const assesStatusofToDo=(()=>{
    const today=Date.now();
    const dueDateFormatted= new Date(dueDate).getTime();
    if(dueDateFormatted<today && status!=='done') status="overdue";
    if(dueDateFormatted>today && status!=='done') status='on progress';
})();
const updateStatusofToDo=(status)=>{
    status=status;
}
 const getToDo=()=>{
    return {title,description,dueDate,priority,status}
 }
 return {getToDo}
 }

 let todo =ToDo("clean the room","use the broom and the brush",'1/1/2025','very important');
 let todo1 =ToDo("clean the room well","use the broom and the brush",'1/1/2025','very important');

todoList.addToDo(todo.getToDo());
todoList.addToDo(todo1.getToDo())
todoList.deleteToDo(Object.keys(JSON.parse(localStorage.getItem('todoList')))[0]);
todoList.updateToDo(Object.keys(JSON.parse(localStorage.getItem('todoList')))[0],"do 5S on the room","use the broom and the brush",'1/1/2025','very important')
 console.log(JSON.parse(localStorage['todoList']));


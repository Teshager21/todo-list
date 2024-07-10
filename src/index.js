const { v4: uuidv4 } = require('uuid');
if(!localStorage.getItem('todoList')){
    localStorage.setItem('todoList',JSON.stringify({}));
}
  
const todoList={
cache:JSON.parse(localStorage.getItem('todoList')),
updateStorage:function(){
    localStorage.setItem('todoList',JSON.stringify(this.cache)); 
},
addToDo:function(todo){ 
    this.cache[`${uuidv4()}`]=todo;
    this.updateStorage();
},

readToDo:function(id){
    return this.cache[id];
},

updateToDo:function(id,new_title,new_description,new_dueDate,new_priority,new_status){
    this.cache[id]=ToDo(new_title,new_description,new_dueDate,new_priority,new_status).getToDo();
    this.updateStorage();
    },
deleteToDo:function(id){
        delete this.cache[id];
        this.updateStorage();
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

 const updateStorage=(cache)=>{
    localStorage.setItem('todoList',JSON.stringify({}));
 }

todoList.addToDo(ToDo("clean the room","use the broom and the brush",'1/1/2025','very important').getToDo());
todoList.addToDo(ToDo("clean the room well","use the broom and the brush",'1/1/2025','very important').getToDo())
console.log('before deleting',todoList.readToDo(Object.keys(JSON.parse(localStorage.getItem('todoList')))[0]));
todoList.deleteToDo(Object.keys(JSON.parse(localStorage.getItem('todoList')))[0]);
todoList.updateToDo(Object.keys(JSON.parse(localStorage.getItem('todoList')))[0],"do 5S on the room","use the broom and the brush",'1/1/2025','very important')
 console.log(JSON.parse(localStorage['todoList']));
 



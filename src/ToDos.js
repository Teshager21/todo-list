const { v4: uuidv4 } = require('uuid');
if(!localStorage.getItem('todos')){
    localStorage.setItem('todos',JSON.stringify({}));
}
  
const todos={
id:uuidv4(),
getID:function(){return this.id},
cache:JSON.parse(localStorage.getItem('todos')),
updateStorage:function(){
    localStorage.setItem('todos',JSON.stringify(this.cache)); 
},

getList:function(){
    return Object.keys(this.cache);
},

createToDo:function(title,description,dueDate,priority,status){
   let newToDo=ToDo(title,description,dueDate,priority,status);
   this.addToDo(newToDo.getToDo());
   return newToDo.getID();
},
addToDo:function(todo){ 
    this.cache[todo.id]=todo;
    this.updateStorage();
},

readToDo:function(id){ 
    return this.cache[id];
},

updateToDo:function(id,new_title,new_description,new_dueDate,new_priority,new_status){
    this.cache[id]=ToDo(new_title,new_description,new_dueDate,new_priority,new_status).updateToDo(id);
    this.updateStorage();
    },
deleteToDo:function(id){
        delete this.cache[id];
        this.updateStorage();
    },
removeToDoFromList:function(todoid,todolist){
    delete this.cache[todoid];
    this.updateStorage();
}
 };
 
 const ToDo=(title,description,dueDate,priority,status)=>{
    title=title;
    description=description;
    dueDate =dueDate;
    priority=priority;
    status=status;
    let id=uuidv4();
    const getID=()=>{
        return id;
    };
    const assesStatusofToDo=(()=>{
        const today=Date.now();
        const dueDateFormatted= new Date(dueDate).getTime();
        if(dueDateFormatted<today && status!=='done') status="overdue";
    })();
    const getToDo=()=>{
        return {id,title,description,dueDate,priority,status}
    }
    const updateToDo=(newID)=>{
        id=newID;
        return {id,title,description,dueDate,priority,status};
    }
    return {getID,getToDo,updateToDo}
 }

 export {todos};
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
        //  if(dueDateFormatted>today && status!=='done') status='on progress';
    })();
    const getToDo=()=>{
        return {title,description,dueDate,priority,status}
    }
    return {getToDo}
 }

 const projects=()=>{
    if(!localStorage.getItem('lisfOfProjects')){
        localStorage.setItem('listOfProjects',JSON.stringify({}));
    }
    listOfProjects=JSON.parse(localStorage.getItem('listOfProjects'));
    allProjects=()=>{
        return listOfProjects;
    };
    const addToProjects=(project)=>{
        listOfProjects[uuidv4()]=project;
        console.log('been here.....',listOfProjects);
    };
    const readProject=(projectID)=>{
       return listOfProjects[projectID]().getProject();
    };
    const removeProject=(projectID)=>{
        delete listOfProjects[projectID]

    };
    const updateProject=(projectID,newProject)=>{
       listOfProjects[projectID]=newProject;
    };
    return {allProjects,addToProjects,readProject,removeProject,updateProject}
 }

 const Project=(title)=>{
  title=title;
  let todos={};
  addToProject=(todoid)=>{
     todos[uuidv4()]=todoid;  
  }
  removeFromProject=(todoid)=>{
    delete todos[todoid]
  }
  getProject=()=>{
    return todos;
  }
  return{addToProject,removeFromProject,getProject};
 }
const today=Project('today');
const work=Project('work');
todoList.addToDo(ToDo("clean the room","use the broom and the brush",'1/1/2025','very important').getToDo());
todoList.addToDo(ToDo("Do your job","use the broom and the brush",'1/1/2025','very important').getToDo())
// todoList.deleteToDo(Object.keys(JSON.parse(localStorage.getItem('todoList')))[0]);
const todo1=Object.keys(JSON.parse(localStorage.getItem('todoList')))[0];
const todo2=Object.keys(JSON.parse(localStorage.getItem('todoList')))[1];
todoList.updateToDo(todo1,"do 5S on the room","use the broom and the brush",'1/1/2025','very important');
today.addToProject(todo1);
work.addToProject(todo2);
today.addToProject(todo2);
//  console.log(JSON.parse(localStorage['todoList']));
const myProjects=projects();
 myProjects.addToProjects(today);
 console.log('projects',myProjects.allProjects())
 myProjects.addToProjects(work);
 console.log('today',today.getProject());
 console.log('projects',myProjects.allProjects())
 



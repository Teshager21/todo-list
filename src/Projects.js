const { v4: uuidv4 } = require('uuid');
const projects=()=>{
    if(!localStorage.getItem('projectList')){
        localStorage.setItem('projectList',JSON.stringify({}));
    }
    let projectList=JSON.parse(localStorage.getItem('projectList'));
    const allProjects=()=>{
        return projectList;
    };
    const createProject=(title)=>{
         let newProject=Project(title);
         projectList[newProject.getID()]=newProject.getProject();
        localStorage.setItem('projectList',JSON.stringify(projectList)); 
         return newProject;
    };
    const readProject=(projectID)=>{
       return projectList[projectID];
    };
    const deleteProject=(projectID)=>{
        delete projectList[projectID]
        localStorage.setItem('projectList',JSON.stringify(projectList)); 

    };
    const updateProject=(projectID,newProject)=>{
       projectList[projectID]=newProject.getProject();
       localStorage.setItem('projectList',JSON.stringify(projectList)); 
    };

    return {allProjects,createProject,readProject,deleteProject,updateProject}
 }

 const Project=(title)=>{
  title=title;
  let id;
  if(!id) id=uuidv4();
  let todos=[];
  const getID=()=> {return id};
  const addToDotoProject=(todoid)=>todos.push(todoid);  
  const deleteToDoFromProject=(todoid)=>{todos=todos.splice(todos.indexOf(todoid),1)}
  const getProject=()=>{return todos;}
  return{getID,addToDotoProject,deleteToDoFromProject,getProject};
 }

 export {projects};

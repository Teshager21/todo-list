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
         addToProjects(newProject);
         return newProject;
    };
    const addToProjects=(project)=>{
        
        projectList[project.getID()]=project.getProject();
        localStorage.setItem('projectList',JSON.stringify(projectList)); 
    };
    const readProject=(projectID)=>{
       return projectList[projectID]().getProject();
    };
    const deleteProject=(projectID)=>{
        delete projectList[projectID]
        localStorage.setItem('projectList',JSON.stringify(projectList)); 

    };
    const updateProject=(projectID,newProject)=>{
       projectList[projectID]=newProject;
       localStorage.setItem('projectList',JSON.stringify(projectList)); 
    };

    return {allProjects,createProject,addToProjects,readProject,deleteProject,updateProject}
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

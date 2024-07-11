import { todos} from './ToDos';
import { projects} from './Projects';

const myProjects=projects();
const today=myProjects.createProject('today');
const work= myProjects.createProject('work');
const todo1=todos.createToDo("clean the room","use the broom and the brush",'1/1/2025','very important');
const todo2= todos.createToDo("Do your job","use the broom and the brush",'1/1/2025','very important');
todos.updateToDo(todo1,"do 5S on the room","use the broom and the brush",'1/1/2025','very important');

today.addToDotoProject(todo1);  //asign a todo to a project
work.addToDotoProject(todo2);
today.addToDotoProject(todo2);
myProjects.deleteProject(work.getID());
today.deleteToDoFromProject(todo2);
console.log('localStorage-projectlist',JSON.parse(localStorage['projectList']));
console.log('localStorage-todos',JSON.parse(localStorage['todos']));

 



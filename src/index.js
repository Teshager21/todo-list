import { todos} from './ToDos';
import { projects} from './Projects';
import { ToDoLists, ToDoList } from './ToDoList';
import sidebar from './Sidebar';
import main from './Main';

// const myProjects=projects();
// const today=myProjects.createProject('today');
// const work= myProjects.createProject('work');
// const todo1=todos.createToDo("clean the room","use the broom and the brush",'1/1/2025','very important');
// const todo2= todos.createToDo("Do your job","use the broom and the brush",'1/1/2025','very important');
// todos.updateToDo(todo1,"do 5S on the room","use the broom and the brush",'1/1/2025','very important');

// today.addToDotoProject(todo1);  //asign a todo to a project
// work.addToDotoProject(todo2);
// today.addToDotoProject(todo2);
// myProjects.deleteProject(work.getID());
// today.deleteToDoFromProject(todo2);
const myToDoLists= ToDoLists();
const today=myToDoLists.createList('today');
const work=myToDoLists.createList('work');
const todo1=todos.createToDo("clean the room","use the broom and the brush",'1/1/2025','very important');
const todo2= todos.createToDo("Do your job","use the broom and the brush",'1/1/2025','very important');
console.log('the to do',todo1)
today.addToList(todo1);
console.log('today',today.getList(),today.getID());
today.removeFromList(todo1);
work.addToList(todo2)
work.addToList(todo1);
myToDoLists.deleteList(today.getID());
console.log('mytodolist',myToDoLists.allToDoLists());
console.log('reading work',myToDoLists.readList(work.getID()));
console.log('localStorage-todos',JSON.parse(localStorage['todoLists']));


//-------------THE VIEW------------------------------------------//

const content= document.createElement('div')
document.body.append(content);
content.textContent="Here goes my todolist";
content.append(sidebar,main);


 



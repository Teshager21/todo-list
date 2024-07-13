import { todos} from './ToDos';
import { projects} from './Projects';
import { ToDoLists, ToDoList } from './ToDoList';
import sidebar from './Sidebar';
import main from './Main';
import './style.css'

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
const todo1=todos.createToDo("1. clean the room","use the broom and the brush",'1/1/2025','very important');
const todo2= todos.createToDo("2. Do your job","use the broom and the brush",'1/1/2025','very important');
const todo3= todos.createToDo("3. Clean the dishes","use the broom and the brush",'1/1/2025','important');

today.addToList(todo1);
// console.log('today',today.getList(),today.getID());


// console.log('after removal',today.getList())
work.addToList(todo1);
work.addToList(todo2);
work.addToList(todo3);
// console.log('the to do',todo1,'the list b4 deletion',today.getList())
work.removeFromList(todo2);
// work.removeFromList(todo1);
// console.log('the list after deletion;TODAY',today.getList())
// myToDoLists.deleteList(today.getID());
// console.log('mytodolist',Object.values(myToDoLists.allToDoLists()));
console.log('reading work',myToDoLists.readList(work.getID()));
console.log('reading today',myToDoLists.readList(today.getID()));
console.log('localStorage-todos',JSON.parse(localStorage['todoLists']));


//-------------THE VIEW------------------------------------------//

const content= document.createElement('div');
content.classList.add('content');
content.setAttribute('id','content');
document.body.append(content);
const mainComponent=main();

//-------put todo into todocards-----//

const displayList=(list)=>{
    let todoArray= Object.values(list.getList())
    todoArray.map((todo)=>{
        const {title,priority}=todos.readToDo(todo);
        mainComponent.addTodoCard(title,priority);  
    })
}

displayList(work);

content.append(sidebar,mainComponent.Main);

 



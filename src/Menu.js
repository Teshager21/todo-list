import main from "./Main";
import Sidebar from "./Sidebar";
const Menu=()=>{
    
    const {showTodoListsBtn,showAllTasksBtn,showTodayBtn,showClosedTasksBtn}=Sidebar;
    const {addTodoBtn,addListBtn}=main();
    const menu= document.createElement('div');
    menu.classList.add("menu"); 
    menu.append(showTodayBtn,showTodoListsBtn,showAllTasksBtn,showClosedTasksBtn,addTodoBtn,addListBtn);
    menu.addEventListener('mouseover',(e)=>{e.target.classList.add('focus')});
    document.body.addEventListener('click',(e)=>closeMenu(e))
    const closeMenu=(event)=>{   
    const rect = document.querySelector('.hamburger').getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        menu.style.display='none';
    }
}


    return {menu};
}


export default Menu;
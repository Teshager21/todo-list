import dialog from "./Dialog";
const sidebar=document.createElement('aside');
sidebar.classList.add('aside');
//  sidebar.textContent="Here goes the side bar"

const addBtn= document.createElement('button');
addBtn.textContent="+ Add Task";
addBtn.classList.add('btn')
sidebar.appendChild(dialog);
addBtn.addEventListener('click',()=>{
    dialog.showModal();
})
const todoValues=dialog.addEventListener('close',(e)=>{
    return JSON.parse(dialog.returnValue);
})
console.log(todoValues)
sidebar.append(addBtn);









export default sidebar;
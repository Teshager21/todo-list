const sidebar=document.createElement('aside');
sidebar.classList.add('aside');
//  sidebar.textContent="Here goes the side bar"

 const addBtn= document.createElement('button');
 addBtn.textContent="+ Add Task";
addBtn.classList.add('btn')
sidebar.append(addBtn);









export default sidebar;
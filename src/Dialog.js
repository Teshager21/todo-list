const dialog= document.createElement('dialog');
dialog.classList.add('dialog');
const btnSubmit =document.createElement("button");
btnSubmit.textContent="Add Task"
btnSubmit.classList.add('submit','btn','btn-primary');
btnSubmit.setAttribute("formmethod","dialog");

//add a from
const dialogContainer=document.createElement('div');
dialogContainer.classList.add('container')
const dialogForm=document.createElement('form');
dialogForm.setAttribute('method','dialog')
const taskNameGroup=document.createElement('p')
taskNameGroup.classList.add('group')
const taskNameLabel=document.createElement('label');
taskNameLabel.setAttribute('for','task');
taskNameLabel.textContent="Task name";
const taskNameInput= document.createElement('input');
taskNameInput.setAttribute('type',"text");
taskNameInput.setAttribute('name','task');
taskNameInput.setAttribute('id','taskInput')
taskNameGroup.append(taskNameLabel,taskNameInput);
dialogForm.append(taskNameGroup);

const dueDateGroup=document.createElement('p')
dueDateGroup.classList.add('group')
const dueDateLabel=document.createElement('label');
dueDateLabel.setAttribute('for','duedate');
dueDateLabel.textContent="Duedate";
const dueDateInput= document.createElement('input');
dueDateInput.setAttribute('type',"date");
dueDateInput.setAttribute('name','duedate');
dueDateInput.setAttribute('placeholder',"duedate")
dueDateInput.setAttribute('id','dueDateInput')
dueDateGroup.append(dueDateLabel,dueDateInput);
dialogForm.append(dueDateGroup);

const priorityGroup=document.createElement('p')
priorityGroup.classList.add('group')
const priorityLabel=document.createElement('label');
priorityLabel.setAttribute('for','priority');
dueDateLabel.textContent="Due Date";
const prioritySelect= document.createElement('select');
prioritySelect.setAttribute('name',"priority");
prioritySelect.setAttribute('id','prioritySelect');

const option1=document.createElement('option');
const option2=document.createElement('option');
const option3=document.createElement('option');
option1.value='not that important';
option1.textContent='Not that important';
option2.value='important';
option2.textContent='Important';
option3.value='very important';
option3.textContent='Very Important';
prioritySelect.append(option1,option2,option3);

priorityGroup.append(priorityLabel,prioritySelect);
dialogForm.append(priorityGroup);

dialogContainer.append(dialogForm);
dialogContainer.append(btnSubmit);

// dialog.appendChild(btnClose);
dialog.append(dialogContainer);
dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        dialog.close()
    }
})

btnSubmit.addEventListener('click',(e)=>{
    e.preventDefault();
    const returnValues={'title':taskNameInput.value,'duedate':dueDateInput.value,'priority':prioritySelect.value};
    dialog.close(JSON.stringify(returnValues))
})

export default dialog;
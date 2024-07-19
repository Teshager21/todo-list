const dialog= document.createElement('dialog');
dialog.classList.add('dialog');


const todoDetail=()=>{
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

    const descriptionGroup=document.createElement('p')
    descriptionGroup.classList.add('group')

    const descriptionLabel=document.createElement('label');
    descriptionLabel.setAttribute('for','task');
    descriptionLabel.textContent="Description";

    const descriptionInput= document.createElement('input');
    descriptionInput.setAttribute('type',"text");
    descriptionInput.setAttribute('name','task');
    descriptionInput.setAttribute('id','taskInput')
    descriptionGroup.append(descriptionLabel,descriptionInput);

    
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
    
    const priorityGroup=document.createElement('p')
    priorityGroup.classList.add('group')
    const priorityLabel=document.createElement('label');
    priorityLabel.setAttribute('for','priority');
    priorityLabel.textContent="Priority";
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

    priorityGroup.append(priorityLabel,prioritySelect)

    //status
    const statusGroup=document.createElement('p')
    statusGroup.classList.add('group')
    const statusLabel=document.createElement('label');
    statusLabel.setAttribute('for','status');
    statusLabel.textContent="Status";
    const statusSelect= document.createElement('select');
    statusSelect.setAttribute('name',"status");
    statusSelect.setAttribute('id','statusSelect');
    
    const options1=document.createElement('option');
    const options2=document.createElement('option');
    const options3=document.createElement('option');
    options1.value='open';
    options1.textContent='open';
    options2.value='done';
    options2.textContent='done';
    options3.value='overdue';
    options3.textContent='overdue';
    statusSelect.append(options1,options2,options3);

    statusGroup.append(statusLabel,statusSelect);

    const btnSubmit =document.createElement("button");
    btnSubmit.textContent="Add Task"
    btnSubmit.classList.add('submit','btn','btn-primary');
    btnSubmit.setAttribute("formmethod","dialog");
    btnSubmit.setAttribute('data-action','add')
    
    priorityGroup.append(priorityLabel,prioritySelect);
    dialogForm.append(taskNameGroup,descriptionGroup,dueDateGroup,priorityGroup,statusGroup);
    
    dialogContainer.append(dialogForm,btnSubmit)
    btnSubmit.addEventListener('click',(e)=>{
        if(e.target.getAttribute('data-action')!=='add') return;
        e.preventDefault();
        const returnValues={'title':taskNameInput.value,description:descriptionInput.value,'duedate':dueDateInput.value,'priority':prioritySelect.value,status:statusSelect.value};
        dialog.close(JSON.stringify(returnValues))
    })
    const populateContainer=(todo)=>{
        const {title,description,dueDate,priority,status}=todo;
        taskNameInput.value=title;
        dueDateInput.value=dueDate;
        statusSelect.value=status;
        descriptionInput.value=description;
        prioritySelect.value=priority;
        btnSubmit.textContent="update Task"
        btnSubmit.setAttribute('data-action','update');

    }

    const readContainer=()=>{
        return({title:taskNameInput.value,description:descriptionInput.value,dueDate:dueDateInput.value,priority:prioritySelect.value,status:statusSelect.value})
    }
    return {dialogContainer,populateContainer,readContainer};
}


//add a from


// dialog.appendChild(btnClose);
dialog.append(todoDetail().dialogContainer);
dialog.addEventListener("click", (event) =>{
    closeDialog(event,dialog)
});



const closeDialog=(event,dialog)=>{
    const rect = dialog.getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        dialog.close(null);
    }
}

const listDialog=document.getElementById('listDialog');
const listNameInput=document.getElementById('listNameInput')
listDialog.addEventListener("click", (event) => {
    closeDialog(event,listDialog);    
})

const confirmList=document.getElementById('confirmList');
confirmList.addEventListener('click',(e)=>{
    e.preventDefault();
    if(listNameInput.value!==null)listDialog.close(listNameInput.value);
})

const ImportDialog=document.getElementById("importTasks");
const setOptions=(list)=>{
    const taskList=list.map((el)=>{
        return el.task;
    })
    const IDlist=list.map((el)=>{
        return el.id;
    })
    taskList.map((option)=>{
        const optionElement=new Option(option);
        optionElement.setAttribute('id',IDlist[taskList.indexOf(option)]);
        ImportDialog.querySelector('#importTaskSelect').add(optionElement);

    })
}
const confrimImportBtn=document.getElementById('importTaskBtn');
confrimImportBtn.addEventListener('click',()=>{
    const selectElement=ImportDialog.querySelector('#importTaskSelect');
    const selectedOption=selectElement.options[selectElement.selectedIndex];
    ImportDialog.close( JSON.stringify({taskID:selectedOption.getAttribute("id"),listID:ImportDialog.getAttribute('data-list')}));  
})

ImportDialog.addEventListener('click',(e)=>closeDialog(e,ImportDialog));

export {dialog,listDialog,confirmList,ImportDialog,setOptions,todoDetail};
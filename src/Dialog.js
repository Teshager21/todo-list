import {Input,Button,Label,Select} from './Utilities';

    const dialog= document.createElement('dialog');
    dialog.classList.add('dialog');
    
    
    const todoDetail=()=>{
        const dialogContainer=document.createElement('div');
        dialogContainer.classList.add('container')

        const dialogForm=document.createElement('form');
        dialogForm.setAttribute('method','dialog');
        dialogForm.classList.add('container');

        const taskNameInput= new Input('text','task','Task','taskInput','text-input');
        taskNameInput.requried=true;
        const descriptionInput=new Input('text','description','Description','taskInput');
        const dueDateInput = new Input('date','duedate','due date','dueDateInput');
        dueDateInput.value= new Date().toISOString().slice(0, 10);

        const priorityGroup=document.createElement('p');        
        priorityGroup.classList.add('flex-column');
        const priorityLabel=Label("Priority",'priority');
        const prioritySelect= Select('priority','prioritySelect',['kind of important','important','very important']);
        priorityGroup.append(priorityLabel,prioritySelect)
    
        //status
        const statusGroup=document.createElement('p')
        statusGroup.classList.add('flex-column');
        const statusLabel= Label("Status",'status');
        const statusSelect = Select('status','statusSelect',['open','done','overdue']);
        statusGroup.append(statusLabel,statusSelect);
 
        const btnSubmit =Button('Add Task',null,'submit btn btn-primary','dialog')
        btnSubmit.setAttribute('data-action','add');
    
        dialogForm.append(taskNameInput,descriptionInput,dueDateInput,priorityGroup,statusGroup);
        
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

    //List dialog
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

export {dialog,listDialog,ImportDialog,setOptions,todoDetail};

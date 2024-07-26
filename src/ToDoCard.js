// import deleteIcon from './resources/icons8-delete-50.png'
const todoCard=(title,dueDate,priority,id,context,status)=>{
    const todoCard = document.createElement('div');
    todoCard.classList.add('todo-card');

    const Title=document.createElement('p');
    Title.textContent=title;
  
    //delet btn
    const deleteBtn= document.createElement('button');
    deleteBtn.classList.add('btn');

     context==='list'?deleteBtn.textContent="remove":deleteBtn.textContent='Delete';
    deleteBtn.setAttribute('id',id);
    deleteBtn.setAttribute('data-list',context)
    deleteBtn.setAttribute('data-action','delete');
    deleteBtn.addEventListener('click',()=>console.log('i m clicked'))

    //date
    const dueDateBtn= document.createElement('span');
    dueDateBtn.textContent=dueDate;
    dueDateBtn.classList.add('text-sm')

    //date & title

    const dateAndTitle=document.createElement('div');
    dateAndTitle.append(title,dueDateBtn);
    dateAndTitle.classList.add('flex-column')

    //checkBox
    const tick=document.createElement('input');
    tick.setAttribute('type','checkbox');
    tick.classList.add('tick','align-self-center'); 
    if(status==='done') tick.checked=true;
    //left
    const cardLeft=document.createElement('div');
    cardLeft.classList.add('cardLeft')

    const Status =document.createElement('span');
    Status.textContent=status;
    cardLeft.append(tick,dateAndTitle);
    todoCard.append(cardLeft,deleteBtn);
    return todoCard;
}

const listCard=(title,id)=>{
    const listCard = document.createElement('div');
    listCard.classList.add('card');

    const name=document.createElement('p');
   
    name.textContent=title;
    const deleteBtn= document.createElement('button');
    deleteBtn.classList.add('btn','btn-danger');
    deleteBtn.textContent='Delete';
    deleteBtn.setAttribute('id',id);
    deleteBtn.setAttribute('data-action','delete');
    listCard.setAttribute('data-list',id);
    const addToDo =document.createElement('span');
   
    addToDo.textContent="+ To do";
    const actions=document.createElement('div')
    actions.append(addToDo);
    listCard.append(title,deleteBtn);
    return listCard;

}





export {todoCard,listCard};
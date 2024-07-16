const todoCard=(title,status,id,list)=>{
    const todoCard = document.createElement('div');
    todoCard.classList.add('card');

    const Title=document.createElement('p');
   
    Title.textContent=title;
    todoCard.append(title);
    const deleteBtn= document.createElement('button');
    deleteBtn.classList.add('btn');
    deleteBtn.textContent='Delete';
    deleteBtn.setAttribute('id',id);
    deleteBtn.setAttribute('data-list',list)
    todoCard.append(deleteBtn);
    const Status =document.createElement('span');
    Status.textContent=status;
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
    listCard.setAttribute('data-list',id);
    const addToDo =document.createElement('span');
   
    addToDo.textContent="+ To do";
    const actions=document.createElement('div')
    actions.append(addToDo);
    listCard.append(title);
    return listCard;

}





export {todoCard,listCard};
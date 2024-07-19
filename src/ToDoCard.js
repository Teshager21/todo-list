const todoCard=(title,status,id,list)=>{
    const todoCard = document.createElement('div');
    todoCard.classList.add('card');

    const Title=document.createElement('p');
    Title.textContent=title;
  
    //delet btn
    const deleteBtn= document.createElement('button');
    deleteBtn.classList.add('btn');
    deleteBtn.textContent='Delete';
    deleteBtn.setAttribute('id',id);
    deleteBtn.setAttribute('data-list',list)
    deleteBtn.setAttribute('data-action','delete');


    //checkBox
    const tick=document.createElement('input');
    tick.setAttribute('type','checkbox');
    tick.classList.add('tick');    

    //left
    const cardLeft=document.createElement('div');
    cardLeft.classList.add('cardLeft')

    const Status =document.createElement('span');
    Status.textContent=status;
    cardLeft.append(tick,title);
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
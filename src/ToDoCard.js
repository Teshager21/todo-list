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
    // deleteBtn.addEventListener('click',(e)=>{
    //     console.log("hello, i am delete",e.target);
    // })
    todoCard.append(deleteBtn);
    const Status =document.createElement('span');
    // todoCard.append(Status);
    Status.textContent=status;
    return todoCard;
}






export default todoCard;
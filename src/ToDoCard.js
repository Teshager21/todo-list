const todoCard=(title,status)=>{
    const todoCard = document.createElement('div');
    todoCard.classList.add('card');

    const Title=document.createElement('p');
    Title.textContent=title;
    todoCard.append(title);
    const Status =document.createElement('span');
    todoCard.append(Status);
    Status.textContent=status;
    return todoCard;
}






export default todoCard;
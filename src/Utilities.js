    const addClassList=(element,classList)=>{
        if(classList===null || classList===undefined) return;
        classList= classList.split(' ');
        classList.map((className)=>{
            element.classList.add(className);
        });  
    }
    function Input (type,name,placeholder,id,classList){
         const element=document.createElement('input');
         element.setAttribute('type',type);
         element.setAttribute('name',name);
         element.setAttribute('id',id);
         element.placeholder=placeholder;
        addClassList(element,classList);
         return element;
    }
function Button(text,id,classList,formmethod){
    const button =document.createElement('button');
    button.textContent=text;
    addClassList(button,classList);
    button.setAttribute('formmethod',formmethod);
    button.setAttribute('id',id)
  return button;
}

function Label(text,forWhat,classList){
    const label=document.createElement("label");
    label.setAttribute('for',forWhat);
    label.textContent=text;
    addClassList(label,classList);
    return label;
}

function Select(name,id,options,classList){
    const select= document.createElement('select');
    select.setAttribute('name',name);
    select.setAttribute('id',id);
    options.map((op)=>{
        select.append(new Option(op,op))
    })
    addClassList(select,classList)
    return select;
}

const checkInputValidity=(input)=>{
    if(!input.valid){ checkInputValidity(input)
    input.parentElement.querySelector('.error').textContent=input.validationMessage;
}
}


export {Input,Button,Label,Select,checkInputValidity}
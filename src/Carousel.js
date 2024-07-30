const Carousel=()=>{
let urlCached;
let OriginalUrls=[];
const carouselWrapper= document.createElement('div');
let moving=false;

//--------navigation---------------------------------------//
const nav=document.createElement('div');
nav.classList.add('flex','gap-1');

const toggleDot=(order)=>{
    Array.from(nav.children).forEach(element => {
       
        element.classList.remove('solid');
     });
     nav.querySelector(`[data-order='${order}']`).classList.add('solid');  
}

nav.addEventListener('click',(e)=>handleNavigationClicks(e))
const handleNavigationClicks=(e)=>{
     moving=true;
    //  toggleDot(e.target.getAttribute('data-order'));
     moveToSelectedSlide(parseInt(e.target.getAttribute('data-order')));
     moving=false;
}

const addCircle=(order)=>{
    const circle=document.createElement('div');
    circle.classList.add('circle');
    circle.setAttribute('data-order',order);
    nav.append(circle);
}


const toRight= document.createElement('i');
toRight.classList.add("fas", "fa-chevron-circle-right","arrow");
toRight.setAttribute('id','toRight');

const toLeft= document.createElement('i');
toLeft.classList.add("fas", "fa-chevron-circle-left","arrow-left"); 
toLeft.setAttribute('id','toLeft');

carouselWrapper.classList.add('wrapper', 'flex');   

const CarouselItem=(url)=>{
    const carouselItem= document.createElement('div');
    carouselItem.style.backgroundImage=`url(${url})`;
    carouselItem.classList.add('background');    
    return carouselItem;
}
const moveToSelectedSlide=(selectedSlide)=>{
    moving=true;
    // const selectedSlide;
    // selectedSlide || selectedSlide=parseInt(nav.querySelector('.solid').getAttribute('data-order'));
    const urls= [...OriginalUrls];
    const shiftedUrls=urls.splice(0,selectedSlide);
    const newUrls=[...urls,...shiftedUrls];
    const carousel=buildACarousel(newUrls);
    carouselWrapper.innerHTML=''; 
    carouselWrapper.append(carousel);
    toggleDot(selectedSlide);
    moving=false;
    return carouselWrapper;   
}
const moveRight=(img_urls)=>{
    const currentPosition=parseInt(nav.querySelector('.solid').getAttribute('data-order'));
    let nextPosition;
        if(currentPosition===img_urls.length-1){
            nextPosition=0;
            img_urls=[...OriginalUrls];
        } else  nextPosition=currentPosition+1;
      

    const shifted=img_urls.shift();
    img_urls.push(shifted);
    const carousel=buildACarousel(img_urls);
    carouselWrapper.innerHTML='';
    carouselWrapper.append(carousel);
      toggleDot(nextPosition);
    return carouselWrapper;
 }

 const moveLeft=(img_urls)=>{ 
    const currentPosition=parseInt(nav.querySelector('.solid').getAttribute('data-order'));
    let previousPosition;
    if(currentPosition===0){
        previousPosition=img_urls.length-1;
        img_urls=[...OriginalUrls];
    } else  previousPosition=currentPosition-1;

    const shifted=img_urls.pop();
    img_urls.unshift(shifted);
    const carousel=buildACarousel(img_urls);
    carouselWrapper.innerHTML='';
    carouselWrapper.append(carousel);
    toggleDot(previousPosition);
    return carouselWrapper;
 }

const buildACarousel=(img_urls)=>{
    const carousel= document.createElement("div");
    carousel.classList.add('flex','carousel');
    carousel.append(toLeft);
    carousel.append(toRight);
    img_urls.map((url)=>{
    const carouselItem=CarouselItem(url);
    carousel.append(carouselItem);
    nav.innerHTML='';
   
    for(let i=0;i<img_urls.length;i++){
        addCircle(i);
    }
    })
    carousel.addEventListener('click',(e)=>handleCarouselActions(e,urlCached))
    return carousel;
}

const handleCarouselActions=(e,urls)=>{
    moving=true;
    if(e.target.getAttribute('id')==='toRight'|| e.target.parentElement.getAttribute('id')==='toRight'){     
        moveRight(urls);
    }
    else if(e.target.getAttribute('id')==='toLeft'|| e.target.parentElement.getAttribute('id')==='toLeft'){
        moveLeft(urls)
    }
    moving=false;  
}

const displayImages= (urls)=>{
    carouselWrapper.innerHTML='';
    const carousel=buildACarousel(urls);
    urlCached=urls;
    if(OriginalUrls.length===0) OriginalUrls=[...urls];
    carouselWrapper.append(carousel);
    toggleDot(0);  
    return carouselWrapper;
}

    const autoRotate=(interval)=>{    
            setInterval(autoCycle
                ,interval)
    }
const autoCycle=()=>{
    if(urlCached!==undefined){
         if(!moving) moveRight(urlCached);
    }
}
const addNavigation=()=>{
    carouselWrapper.insertAdjacentElement('afterend',nav)
}
return {carouselWrapper,displayImages,autoRotate,addNavigation};
}


export default Carousel;
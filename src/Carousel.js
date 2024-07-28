const Carousel=()=>{
let urlCached;
const carouselWrapper= document.createElement('div');
const toRight= document.createElement('i');
toRight.classList.add("fas", "fa-chevron-right","arrow");
toRight.setAttribute('id','toRight');

const toLeft= document.createElement('i');
toLeft.classList.add("fas", "fa-chevron-left","arrow-left");
toLeft.setAttribute('id','toLeft');

carouselWrapper.classList.add('wrapper', 'flex');
const CarouselItem=(url)=>{
    const carouselItem= document.createElement('div');
    const carouselImg= document.createElement("img");
    carouselImg.classList.add('carousel-img');
    carouselItem.append(carouselImg);
    carouselImg.src=url;
    return carouselItem;
}

const moveRight=(img_urls)=>{
    const shifted=img_urls.shift();
    img_urls.push(shifted);
    const carousel=buildACarousel(img_urls);
    carouselWrapper.innerHTML='';
    carouselWrapper.append(carousel);
    return carouselWrapper;
 }

 const moveLeft=(img_urls)=>{
    const shifted=img_urls.pop();
    img_urls.unshift(shifted);
    const carousel=buildACarousel(img_urls);
    carouselWrapper.innerHTML='';
    carouselWrapper.append(carousel);
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
    })
    return carousel;
}

const handleCarouselActions=(e,urls)=>{
    if(e.target.getAttribute('id')==='toRight'){
        moveRight(urls);
    }
    if(e.target.getAttribute('id')==='toLeft'){
        moveLeft(urls)
    }
}


const displayImages= (urls)=>{
    carouselWrapper.innerHTML='';
    const carousel=buildACarousel(urls);
    urlCached=urls;
    carouselWrapper.addEventListener('click',(e)=>handleCarouselActions(e,urlCached))
    carouselWrapper.append(carousel);
    return carouselWrapper;
}

return {carouselWrapper,displayImages}
}


export default Carousel;
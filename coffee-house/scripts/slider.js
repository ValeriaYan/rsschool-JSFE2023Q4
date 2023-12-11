const leftButton = document.querySelector('.slider-button-left');
const rightButton = document.querySelector('.slider-button-right');
const slidersContainer = document.querySelector('.slider__container');
const sliderControls = document.querySelectorAll('.slider__control');
const sliderControlsBar = document.querySelectorAll('.slider__control div');

let currentPosition = 1;
const maxPosition = slidersContainer.children.length;
let startPoint;
let endPoint;

rightButton.addEventListener('click', swipeInLeft);

leftButton.addEventListener('click', swipeInRight);

for(let i = 0; i < sliderControls.length; i++) {
    sliderControlsBar[i].addEventListener('animationend', swipeInLeft);
}

document.addEventListener('touchstart', function(event) {
    event.stopPropagation();
    pauseSlider();
    startPoint=event.changedTouches[0];
}, false);

document.addEventListener('touchend', function(event) {
    event.stopPropagation();
    runSlider();
    endPoint=event.changedTouches[0];
    let xAbs = Math.abs(startPoint.pageX - endPoint.pageX);
    if (xAbs > 20) {
        if (endPoint.pageX < startPoint.pageX){
            swipeInLeft();
        }
        else{
            swipeInRight();
        }
    }
}, false);


function swipeInLeft() {
    if(currentPosition < maxPosition) {
        slidersContainer.style.left = `-${100 * currentPosition}%`;
        currentPosition++ ;
    } else {
        slidersContainer.style.left = `0`;
        currentPosition = 1;
    }
    
    setActiveControl();
}

function swipeInRight() {
    if(currentPosition > 1) {
        slidersContainer.style.left = `${-(100 * (currentPosition - 1)) + 100}%`;
        currentPosition-- ;
    } else {
        slidersContainer.style.left = `-${(maxPosition - 1) * 100}%`;
        currentPosition = maxPosition;
    }
    setActiveControl();
}


function setActiveControl() {
    for(let i = 0; i < sliderControls.length; i++) {
        sliderControls[i].classList.remove('active');
    }
    
    const indexControl = currentPosition - 1;
    sliderControls[indexControl].classList.add('active');
}

function pauseSlider() {
    for(let i = 0; i < sliderControls.length; i++) {
        if(sliderControls[i].classList.contains('active')) {
            sliderControls[i].classList.add('pause');
        }
    }
}

function runSlider() {
    for(let i = 0; i < sliderControls.length; i++) {
        if(sliderControls[i].classList.contains('pause')) {
            sliderControls[i].classList.remove('pause');
        }
    }
}

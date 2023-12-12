const burgerIcon = document.querySelector('.burger-icon');
const burger = document.querySelector('.burger');
const burgerList = document.querySelector('.burger__nav .nav__list');
const menuLink = document.querySelector('.header__menu');
const logo = document.querySelector('.header__logo');

burgerIcon.addEventListener('click', toggleBurger);
burgerList.addEventListener('click', function(event) {
    console.log(event.target.tagName)
    if(event.target.tagName === 'A') {
        toggleBurger();
    }
})
menuLink.addEventListener('click', toggleBurger);
logo.addEventListener('click', function() {
    if(burger.classList.contains('active')) {
        toggleBurger();
    }
});

function toggleBurger() {
    burger.classList.toggle('active');
    burger.classList.contains('active') ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
}

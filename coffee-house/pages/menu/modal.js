import products from "./menu-cards.js";
const cardsContainer = document.querySelector('.menu__cards');
const modal = document.querySelector('.modal__wrapper');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.modal__close-button');
const imgModal = modal.querySelector('.modal__img');
const nameModal = modal.querySelector('.modal__name');
const textModal = modal.querySelector('.modal__text');
const sizesModal = modal.querySelector('.modal__sizes .modal__tabs');
const additivesModal = modal.querySelector('.modal__additives .modal__tabs');
const priceModal = modal.querySelector('.modal__price .price');

let currentProduct = null;
let productPrice = null;
let currentSizePrice = null;
let currentAdditivePrice = null;


cardsContainer.addEventListener('click', clickOnCardsContainer);
closeBtn.addEventListener('click', hideModal);
modal.addEventListener('click', clickOutsideModal)
sizesModal.addEventListener('click', clickOnSize);
additivesModal.addEventListener('click', clickOnAdditive);

function clickOnCardsContainer(event) {
    if (event.target.closest('.card')) {
        const cardId = event.target.closest('.card').dataset.id;
        currentProduct = products.find((product) => product.id == cardId);
        productPrice = +currentProduct.price;
        showModal();
    }
}

function clickOutsideModal(event) {
    if(!event.target.closest('.modal')) {
        hideModal();
    }
}

function showModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    fillModal();
}

function fillModal() {
    imgModal.innerHTML = `<img src="../../assets/images/menu/${currentProduct.category}-${currentProduct.id}.jpg" alt="">`;
    nameModal.textContent = currentProduct.name;
    textModal.textContent = currentProduct.description;
    for(let i = 0; i < sizesModal.children.length; i++) {
        const size = sizesModal.children[i].dataset.size;
        sizesModal.children[i].querySelector('.button-tab__text').textContent = currentProduct.sizes[size].size;
    }
    for(let i = 0; i < additivesModal.children.length; i++) {
        const additive = additivesModal.children[i].dataset.index;
        additivesModal.children[i].querySelector('.button-tab__text').textContent = currentProduct.additives[additive].name;
    }
    productPrice = currentProduct.price;
    priceModal.textContent = `$${getFullPrice()}`;
}

function hideModal() {
    currentProduct = null;
    productPrice = null;
    currentSizePrice = null;
    currentAdditivePrice = null;
    setActiveSizeBtn(sizesModal.children[0]);
    setActiveAdditiveBtn();
    
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function clickOnSize(event) {
    const parent = event.target.closest('.modal__tab')
    if(parent) {
        setActiveSizeBtn(parent);
        const size = parent.dataset.size;
        const addPrice = currentProduct.sizes[size]["add-price"];
        currentSizePrice = addPrice;
        priceModal.textContent = `$${getFullPrice()}`;
        
    }
}

function clickOnAdditive(event) {
    const parent = event.target.closest('.modal__tab')
    if(parent) {
        setActiveAdditiveBtn(parent);
        if(parent.classList.contains('active')) {
            const index = parent.dataset.index;
            const addPrice = currentProduct.additives[index]["add-price"];
            currentAdditivePrice = addPrice;
            priceModal.textContent = `$${getFullPrice()}`;
        } else {
            currentAdditivePrice = 0;
            priceModal.textContent = `$${getFullPrice()}`;
        }
    }
}

function setActiveSizeBtn(btn) {
    for(let i = 0; i < sizesModal.children.length; i++) {
        sizesModal.children[i].classList.remove('active');
    }

    btn.classList.add('active');
}

function setActiveAdditiveBtn(btn) {
    if(btn) {
        btn.classList.toggle('active');
    }
    for(let i = 0; i < additivesModal.children.length; i++) {
        if(additivesModal.children[i] !== btn) {
            additivesModal.children[i].classList.remove('active');
        }
    }

}

function getFullPrice() {
    const fullPrice = +productPrice + +currentAdditivePrice + +currentSizePrice;
    if(fullPrice.toString().length == 1) {
        return `${fullPrice}.00`
    }
    if(fullPrice.toString().length == 3) {
        return `${fullPrice}0`
    }
}
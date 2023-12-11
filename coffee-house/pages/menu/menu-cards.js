import { arrayProducts } from '../../assets/products';
const cardsContainer = document.querySelector('.menu__cards');
const tabs = document.querySelector('.menu__tabs');
const loadMoreButton = document.querySelector('.menu__button');

export const products = arrayProducts.map((product, id = 0) => {
    product.id = id++; 
    return {...product}
});


tabs.addEventListener('click', switchCategory)
loadMoreButton.addEventListener('click', showMoreProducts);

function showMoreProducts() {
    for(let i = 0; i < cardsContainer.children.length; i++) {
        cardsContainer.children[i].style.display = 'block';
    }
    hideLoadMoreButton();
}

function switchCategory(event) {
    if(event.target.classList.contains('button-tab')) {
        const tab = event.target;
        if(!tab.classList.contains('active')) {
            const category = tab.dataset.category;
            setActiveTab(tab);
            fillCardsContainer(category);
        }
    }
}

function setActiveTab(tab) {
    for(let i = 0; i < tabs.children.length; i++) {
        tabs.children[i].classList.remove('active');
    }

    tab.classList.add('active');
}

function fillCardsContainer(category) {
    cardsContainer.innerHTML = '';
    const cards = generateCards(category);
    cardsContainer.append(...cards);
    if(cards.length <= 4) {
        hideLoadMoreButton();
    } else {
        showLoadMoreButton();
    }
}

function createCard(product) {
    const card = document.createElement('div');
    card.className = 'menu__card card';
    card.dataset.id = product.id;

    const img = document.createElement('div');
    img.className = 'card__img';
    img.innerHTML = `<img src="../../assets/images/menu/${product.category}-${product.id}.jpg" alt="coffee image">`

    const body = document.createElement('div');
    body.className = 'card__body';
    
    const cardName = document.createElement('div');
    cardName.className = 'card__name name';
    cardName.textContent = product.name;
    
    const cardText = document.createElement('div');
    cardText.className = 'card__text text';
    cardText.textContent = product.description;

    const cardPrice = document.createElement('div');
    cardPrice.className = 'card__price price';
    cardPrice.textContent = `$${product.price}`;

    body.append(cardName, cardText, cardPrice);
    card.append(img, body);

    return card;
}


function generateCards(category) {
    let cards = [];
    for(let i = 0; i < products.length; i++) {
        if(products[i].category == category) {
            cards.push(createCard(products[i]));
        }
    }

    return cards;
}

function hideLoadMoreButton() {
    loadMoreButton.classList.add('hide');
}

function showLoadMoreButton() {
    loadMoreButton.classList.remove('hide');
}

fillCardsContainer('coffee');
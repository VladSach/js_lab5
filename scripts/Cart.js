import {getData} from './fakeDB.js';

export default class CartManager {
    constructor(){
        this.route = 'cart';
        this.content = document.getElementById('product-list');

        this.cartBtn = document.getElementById('cart-btn');


        this.totalPrice = 0;
        this.totalProducts = 0;
    }

    loadPage(hash) {
        
        if (hash == null){
            this.showCartOnClick();
            return false;
        }
        else {
            if(hash == 'clear'){
                this.clearCart();
            }
            else {
                this.addItemToCartLocalStorage(hash);
            }
        }

        return true;
    }


    showCartOnClick() {  
        let cart = document.getElementById('cart-dropdown');
        let overlay = document.querySelector('.overlay');
        let emptyCart = document.querySelector('.empty-cart');
        let dropdownCart = document.querySelector('.cart-dropdown-full');
        let counterTop = document.getElementById('products-counter-header');

        cart.style.display = 'block';
        overlay.style.display = 'block';
        

        let cartLocalStorage = JSON.parse(localStorage.getItem('cart'));

        if(cartLocalStorage.length == 0){
            emptyCart.style.display = 'block';
            counterTop.style.display = 'none';
            dropdownCart.style.display = 'none';
        } else {
            emptyCart.style.display = 'none';
            dropdownCart.style.display = 'block';
            
        }

        overlay.addEventListener('click', () => {
            cart.style.display = 'none';
            overlay.style.display = 'none';
            emptyCart.style.display = 'none';
            dropdownCart.style.display = 'none';

            history.pushState(null, null, '#home');
        });

        let plusBtn = document.querySelectorAll('.counter-plus');
        let minusBtn = document.querySelectorAll('.counter-minus');

        plusBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('+');
            });
        });

        minusBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('-');
            });
        });
    }

    async loadCart() {

        let data = await getData();
        
        let itemsInCart = [];
        let cartLocalStorage = JSON.parse(localStorage.getItem('cart'));
        cartLocalStorage.forEach(item => {
            itemsInCart.push(item.url);
        });

        let itemsToShow = data.products.filter(product => {
            return itemsInCart.includes(product.url);
        });

        let counterTop = document.getElementById('products-counter-header');
        let counterCart = document.getElementById('products-counter-dropdown');
        let totalSum = document.getElementById('cart-total-sum');

        itemsToShow.forEach(item => {
            counterTop.style.display = 'flex';
            let item_amount = this.getAmountFromLocalStorage(item.url);

            this.totalProducts += item_amount;
            counterTop.innerText = this.totalProducts;
            counterCart.innerText = this.totalProducts;

            this.totalPrice += (item.price * item_amount);
            totalSum.innerText = (this.totalPrice);

            let amount = cartLocalStorage.filter(itemShow => {
                return item.url === itemShow.url;
            })[0].amount;
            this.content.innerHTML += this.loadCartItemTemplate(item, amount);
        });

    }

    async addItemToCart(hash) {

        let data = await getData();

        let item = data.products.filter(product => {
            return product.url === hash;
        });
        item = item[0];

        let counterTop = document.getElementById('products-counter-header');
        counterTop.style.display = 'flex';
        let counterCart = document.getElementById('products-counter-dropdown');
        let totalSum = document.getElementById('cart-total-sum');

        let item_amount = this.getAmountFromLocalStorage(item.url);

        this.totalProducts += item_amount;
        counterTop.innerText = this.totalProducts;
        counterCart.innerText = this.totalProducts;

        this.totalPrice += (item.price * item_amount);
        totalSum.innerText = (this.totalPrice);

        this.content.innerHTML += this.loadCartItemTemplate(item, 1);
    }

    async updateCart(hash){

        let data = await getData();
        
        let itemsToShow = data.products.filter(product => {
            return product.url === hash;
        });

        if (itemsToShow != null){
            let counterTop = document.getElementById('products-counter-header');
            counterTop.style.display = 'flex';
            let counterCart = document.getElementById('products-counter-dropdown');
            let totalSum = document.getElementById('cart-total-sum');

            
            itemsToShow.forEach(item => {
                let item_amount = this.getAmountFromLocalStorage(item.url);
    
                this.totalProducts ++;
                counterTop.innerText = this.totalProducts;
                counterCart.innerText = this.totalProducts;
    
                this.totalPrice += item.price;
                totalSum.innerText = (this.totalPrice);

                let value = document.getElementById('amount-' + item.url);
                
                value.innerText = (item_amount);
            });
        }      
    }


    addItemToCartLocalStorage(hash) {
        let itemsCart = JSON.parse(localStorage.getItem('cart'));


        if(!itemsCart){
            itemsCart = [];
            itemsCart.push({url: hash, amount: 1});
            localStorage.setItem('cart', JSON.stringify(itemsCart));
            this.loadCart();
            return true;
        }

        let exist = false;
        for (let i = 0; i < itemsCart.length; i++) {
            if (itemsCart[i].url === hash){
                itemsCart[i].amount++;
                exist = true;
                break;
            }
        }

        if (!exist){
            itemsCart.push({url: hash, amount: 1});
            localStorage.setItem('cart', JSON.stringify(itemsCart));
            this.addItemToCart(hash);
            return true;
        }

        
        localStorage.setItem('cart', JSON.stringify(itemsCart));
        this.updateCart(hash);
        return false;
    }

    getAmountFromLocalStorage(url) {
        let itemsCart = JSON.parse(localStorage.getItem('cart'));

        for (let i = 0; i < itemsCart.length; i++) {
            if (itemsCart[i].url === url){
                return itemsCart[i].amount;
            }
        }
    }

    loadCartItemTemplate(item, amount){
        return `
        <div class="cart-item">
            <a class="delete-item" href="javascript:void(0);"></a>
            <a class="cart-item-image" href="#product/${item.url}">
                <img src="${item.image}" alt="item img">
            </a>
            <div class="cart-item-info">
                <a class="cart-item-title" href="#product/${item.url}">${item.title}</a>
                <p class="cart-item-platform">
                    Platform 
                    <span class="${item.platform[0]}"><img src="./images/platforms/${item.platform[0]}.svg" alt=''></span>
                    <span class="${item.platform[1]}"><img src="./images/platforms/${item.platform[1]}.svg" alt=''></span>
                    <span class="${item.platform[2]}"><img src="./images/platforms/${item.platform[2]}.svg" alt=''></span>
                </p>
                <p class="cart-item-version">
                    Version
                    <span>Standart</span>
                </p>
                <p class="cart-item-lang">
                    Language
                    <span>${item.languages[0]}</span>
                </p>
                <div class="cart-item-block">
                    <span class="cart-item-price">
                        <span class="cart-item-price-value">${item.price}</span>
                        ₴
                    </span>
                    <div class="cart-item-counter">
                        <span class="counter-minus"></span>
                        <span id="amount-${item.url}" class="counter-value">${amount}</span>
                        <span class="counter-plus"></span>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    clearCart(){
        localStorage.setItem('cart', JSON.stringify([]));

        this.totalPrice = 0;
        this.totalProducts = 0;
        this.content.innerHTML = '';

        this.loadPage();
    }

}
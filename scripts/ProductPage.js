import {getData} from './script.js';
import {showPacMan} from './script.js';

export default class ProductPage {
    constructor(){
        this.route = 'product';
        this.content = document.getElementById('page-content');
        
    }
    
    loadPage(hash){
        if (hash == null){
            return false;
        }
        else {
            this.loadProductPage(hash);
        }
        return true;
    }

    async loadProductPage(hash){

        this.content.innerHTML = showPacMan();

        let data = await getData();
        let game = data.products.filter(product => {
            return product.url === hash;
        }); 
        game = game[0];
        

        this.content.innerHTML = `
            ${this.pageHTML(game)}
        `;
    }

    pageHTML(game){
        return  `
        <div class="product-bg-img">
            <img src="${game.backgroundImage}" alt="product bg img">
            <div class="gradient"></div>
        </div>
        <div class="product-container">
            <div class="product-info-wrap">
                <div class="product-image">
                    <img src="${game.image}" alt="prod img">
                </div>
                <div class="product-details">
                    <div class="product-title">
                        <h1>${game.title}</h1>
                    </div>
                    <div class="product-info">
                        <div class="product-info--left">
                            <div class="product-info--block">
                                <p>Platform</p>
                                <div class="platform-list">
                                    <span class="info-item ${game.platform[0]}">
                                        <img src="./images/platforms/${game.platform[0]}.svg" alt=' '>
                                    </span>
                                    <span class="info-item ${game.platform[1]}">
                                        <img src="./images/platforms/${game.platform[1]}.svg" alt=' '>
                                    </span>
                                    <span class="info-item ${game.platform[2]}">
                                        <img src="./images/platforms/${game.platform[2]}.svg" alt=' '>
                                    </span>
                                </div>
                            </div>
                            <div class="product-info--block">
                                <p>Version</p>
                                <div class="version-list">
                                    <span class="info-item version">
                                        <span>Standart</span>
                                    </span>
                                </div>
                            </div>
                            <div class="product-info--block">
                                <p>Language</p>
                                <div class="version-list">
                                    <span class="info-item ${game.languages[0]}">
                                        <span>${game.languages[0]}</span>
                                    </span>
                                    <span class="info-item ${game.languages[1]}">
                                        <span>${game.languages[1]}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                            <div class="product-info--right">
                                <div class="info-price">
                                    <p>Price: <span>${game.price} ₴</span></p>
                                </div>
                                <div class="info-buttons">
                                    <a id="buy_btn" href="#cart/${game.url}">
                                        <span class="text_1">buy</span>
                                        <span class="text_2">In cart</span>
                                    </a>
                                    <a id="fav_btn" href="">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M28.3255 16.697C26.7111 19.0368 24.0796 21.5956 19.9388 25.2058L16.0203 28.1164L12.287 25.2164C8.13283 21.5954 5.44092 19.0305 3.76908 16.6796C2.15321 14.4074 1.5 12.3462 1.5 9.66848C1.5 5.63225 4.64705 2.5 8.8 2.5C11.08 2.5 13.3854 3.56799 14.8622 5.28718L16 6.61181L17.1378 5.28718C18.6146 3.56799 20.92 2.5 23.2 2.5C27.3529 2.5 30.5 5.63225 30.5 9.66848C30.5 12.3684 29.8872 14.4336 28.3255 16.697Z" stroke="white" stroke-width="3" stroke-linecap="round"></path>
                                        </svg>
                                    </a>
                                </div>
                                <div class="info-options">
                                    <img src="images/svg/rocket.svg" alt="">
                                    <p>Will arrive tomorrow at 3pm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-content">
                <div class="characteristics-block">
                    <p>Characteristics</p>
                    <div class="characteristics-content">
                        <ul>
                            <li>
                                <p class="characteristics-title">Platform</p>
                                <p class="characteristics-value">
                                    ${game.platform[0]} 
                                    ${game.platform[1]} 
                                    ${game.platform[2]}</p>
                            </li>
                            <li>
                                <p class="characteristics-title">Version</p>
                                <p class="characteristics-value">Standart</p>
                            </li>
                            <li>
                                <p class="characteristics-title">Language</p>
                                <p class="characteristics-value">
                                ${game.languages[0]} 
                                ${game.languages[1]}</p>
                            </li>
                            <li>
                                <p class="characteristics-title">Genres</p>
                                <p class="characteristics-value">
                                ${game.genres[0]}, 
                                ${game.genres[1]}</p>
                            </li>
                            <li>
                                <p class="characteristics-title">Warranty</p>
                                <p class="characteristics-value">14 days</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="description-block">
                    <p>Description</p>
                    <div class="description-block-content">
                        <p>${game.description}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}
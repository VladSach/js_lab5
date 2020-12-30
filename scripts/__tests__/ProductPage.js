/* eslint-env jest */
jest.mock('../fakeDB');

import {getData} from '../fakeDB.js';
import ProductPage from '../ProductPage';

describe('ProductPage class', ()=> {
    let _;
    beforeAll(()=>{
        document.body.innerHTML = '<div id="page-content"></div>';
        _ = new ProductPage();
    });

    afterEach(()=>{
        _ = new ProductPage();
    });


    describe('ProductPage: route', ()=>{
        it('should return route', ()=>{
            expect(_.route).toEqual('product');
        });
    });

    describe('ProductPage: loadProductPage', ()=>{

        it('should find game', async ()=>{
            const hash = 'ghost_of_tsushima';
            const data = await getData();
            let game = data.products.filter(product => {
                return product.url === hash;
            }); 
            game = game[0];

            let expected = {
                'url': 'ghost_of_tsushima',
                'title': 'Ghost of Tsushima',
                'platform': ['Playstation 4', '', ''],
                'price': 1349,
                'genres': ['Action', 'Adventure'],
                'image': './images/products_img/ghost_of_tsushima.webp',
                'backgroundImage': './images/products-bg-img/ghost_of_tsushima.png',
                'languages': ['English', ''],
                'description': '<p>Ghost of Tsushima is a 2020 action-adventure game developed by Sucker Punch Productions and published by Sony Interactive Entertainment. Featuring an open world, it follows Jin Sakai, a samurai on a quest to protect Tsushima Island during the first Mongol invasion of Japan. The game was released on July 17, 2020 for PlayStation 4. Ghost of Tsushima received praise for its visuals and combat but was criticized for its open world activities. Ghost of Tsushima received several award nominations and wins. </p>',
                'sold': 650
            };

            expect(game).toStrictEqual(expected);

        });

        it('should load game', ()=>{
            let game = {
                'url': 'ghost_of_tsushima',
                'title': 'Ghost of Tsushima',
                'platform': ['Playstation 4', '', ''],
                'price': 1349,
                'genres': ['Action', 'Adventure'],
                'image': './images/products_img/ghost_of_tsushima.webp',
                'backgroundImage': './images/products-bg-img/ghost_of_tsushima.png',
                'languages': ['English', ''],
                'description': '<p>Ghost of Tsushima is a 2020 action-adventure game developed by Sucker Punch Productions and published by Sony Interactive Entertainment. Featuring an open world, it follows Jin Sakai, a samurai on a quest to protect Tsushima Island during the first Mongol invasion of Japan. The game was released on July 17, 2020 for PlayStation 4. Ghost of Tsushima received praise for its visuals and combat but was criticized for its open world activities. Ghost of Tsushima received several award nominations and wins. </p>',
                'sold': 650
            };

            let gamePage = _.pageHTML(game);

            let expected = `
        <div class="product-bg-img">
            <img src="./images/products-bg-img/ghost_of_tsushima.png" alt="product bg img">
            <div class="gradient"></div>
        </div>
        <div class="product-container">
            <div class="product-info-wrap">
                <div class="product-image">
                    <img src="./images/products_img/ghost_of_tsushima.webp" alt="prod img">
                </div>
                <div class="product-details">
                    <div class="product-title">
                        <h1>Ghost of Tsushima</h1>
                    </div>
                    <div class="product-info">
                        <div class="product-info--left">
                            <div class="product-info--block">
                                <p>Platform</p>
                                <div class="platform-list">
                                    <span class="info-item Playstation 4">
                                        <img src="./images/platforms/Playstation 4.svg" alt=' '>
                                    </span>
                                    <span class="info-item ">
                                        <img src="./images/platforms/.svg" alt=' '>
                                    </span>
                                    <span class="info-item ">
                                        <img src="./images/platforms/.svg" alt=' '>
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
                                    <span class="info-item English">
                                        <span>English</span>
                                    </span>
                                    <span class="info-item ">
                                        <span></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                            <div class="product-info--right">
                                <div class="info-price">
                                    <p>Price: <span>1349 ₴</span></p>
                                </div>
                                <div class="info-buttons">
                                    <a id="buy_btn" href="#cart/ghost_of_tsushima">
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
                                    Playstation 4 
                                     
                                    </p>
                            </li>
                            <li>
                                <p class="characteristics-title">Version</p>
                                <p class="characteristics-value">Standart</p>
                            </li>
                            <li>
                                <p class="characteristics-title">Language</p>
                                <p class="characteristics-value">
                                English 
                                </p>
                            </li>
                            <li>
                                <p class="characteristics-title">Genres</p>
                                <p class="characteristics-value">
                                Action, 
                                Adventure</p>
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
                        <p><p>Ghost of Tsushima is a 2020 action-adventure game developed by Sucker Punch Productions and published by Sony Interactive Entertainment. Featuring an open world, it follows Jin Sakai, a samurai on a quest to protect Tsushima Island during the first Mongol invasion of Japan. The game was released on July 17, 2020 for PlayStation 4. Ghost of Tsushima received praise for its visuals and combat but was criticized for its open world activities. Ghost of Tsushima received several award nominations and wins. </p></p>
                    </div>
                </div>
            </div>
        </div>
        `;

            expect(gamePage).toEqual(expected);
        });
    });

    describe('ProductPage: loadPage', ()=>{
        it('should return false if null', ()=>{
            expect(_.loadPage(null)).toBeFalsy();
        });

        it('should invoke loadProductPage if not null', ()=>{
            const loadProductPage = jest.fn();
            ProductPage.prototype.loadProductPage = function (){
                return loadProductPage();
            };

            _.loadPage('test');
            expect(loadProductPage).toHaveBeenCalledTimes(1);
        });

        it('should return true if not null', ()=>{
            expect(_.loadPage('test')).toBeTruthy();
        });
    });
});
import Cart from './Cart.js';
import Router from './Router.js';
import HomePage from './HomePage.js';
import PagesHub from './PagesHub.js';
import OrderPage from './OrderPage.js';
import ActionPage from './ActionPage.js';
import ProductPage from './ProductPage.js';
import CatalogPage from './CatalogPage.js';
import {getData} from './fakeDB.js';

import '../css/style.css';
import '../css/action.css';
import '../css/cart.css';
import '../css/catalog.css';
import '../css/checkout.css';
import '../css/game-card.css';
import '../css/product.css';


export function showPacMan(){
    return `
        <div class="pacman-loader" role="status">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <g>
                        <circle cx="63.2327" cy="50" r="4" fill="#fff">
                            <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.67s"></animate>
                            <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.67s"></animate>
                        </circle>
                        <circle cx="83.6327" cy="50" r="4" fill="#fff">
                            <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.33s"></animate>
                            <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.33s"></animate>
                        </circle>
                        <circle cx="43.4327" cy="50" r="4" fill="#fff">
                            <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s"></animate>
                            <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="0s"></animate>
                        </circle>
                    </g><g transform="translate(-15 0)">
                    <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#fff" transform="rotate(90 50 50)"></path>
                    <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#fff" transform="rotate(12.6491 50 50)">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
                    </path>
                    <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#fff" transform="rotate(-12.6491 50 50)">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
                    </path>
                </g>
            </svg> 
        </div>
    `;
}

async function init_end_points(){

    let data = await getData();

    let products_end_points = [];
    let catalog_end_points = [];
    let actions_end_points = [];
    let orders_end_points = [];
    let cart_end_points = [];

    data.products.forEach(product => {
        products_end_points.push(product.url);
    });
    
    data.actions.forEach(action => {
        actions_end_points.push(action.url);
    });

    data.orders.forEach(order => {
        orders_end_points.push(order);
    });

    catalog_end_points = ['playstation_4', 'xbox_one', 'nintendo_switch'];

    cart_end_points = products_end_points.slice();
    cart_end_points.push('clear');

    return {products_end_points, catalog_end_points, actions_end_points, orders_end_points, cart_end_points};
}

let cart = new Cart();
let homePage = new HomePage();
let orderPage = new OrderPage();
let actionPage = new ActionPage();
let productPage = new ProductPage();
let catalogPage = new CatalogPage();


let hub = new PagesHub([cart, homePage, actionPage, productPage, catalogPage, orderPage], homePage);

(async function() {

    let end_points = await init_end_points();  

    new Router(end_points, hub);
    hub.loadDefaultPage();
    hub.loadCart();

})();
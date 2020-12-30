import {getData} from './fakeDB.js';

export default class CatalogPage {
    constructor(){
        this.route = 'catalog';
        this.content = document.getElementById('page-content');

        this.genresToShow = [];

        this.allGenres = ['Action', 'Horror', 'Shooter', 'Stealth', 'Andventure', 'Platformer', 'Roleplaying'];

        this.allProducts;

    }

    loadPage(hash = null) {
        this.loadCatalogPage(hash);
        return true;
    }

    async loadCatalogPage(hash = null) {

        this.content.innerHTML = showPacMan();

        let data = await getData();
        let allProducts = data.products;

        this.genresToShow = this.allGenres;

        this.content.innerHTML = `
            <div class="container">
                <div class="products-list">
                    <div class="products-list-sidebar">
                        ${this.loadCatalogListSidebar()}
                    </div>
                    <div class="products-list-catalog">
                        <div class="top-section">
                            <div class="catalog-control">
                                <a href="javascript:void(0);" class="catalog-sort active">Expensive first</a>
                                <a href="javascript:void(0);" class="catalog-sort">Cheap first</a>
                            </div>
                        </div>

                        <div class="catalog-content">
                            ${this.loadCatalog(allProducts)}
                        </div>

                    </div>
                </div>
            </div>
        `; 

        this.eventListener(allProducts, hash);

        this.refreshPage(allProducts, hash);
        
    }

    sortProducts(catalog, hash = null) {
        let filteredCatalog = catalog;

        if (hash) {
            let consoles = (hash === 'playstation_4') ? 'Playstation 4' :
                (hash === 'xbox_one') ? 'Xbox One' : 'Nintendo Switch';

            filteredCatalog = catalog.filter(product => {
                return product.platform.includes(consoles);
            });

        }
        
        
        if (this.genresToShow.length != 7) {
            if (this.genresToShow.length == 0) {
                filteredCatalog = [];
                return filteredCatalog;
            }

            this.genresToShow.forEach(genre => {
                filteredCatalog.forEach(game => {
                    if(!game.genres.includes(genre)){
                        filteredCatalog.splice(filteredCatalog.indexOf(game), 1);
                    }
                });
            });
        }

        // let prices = this.getPrices();
        // filteredCatalog.forEach(product => {
        //     if(product.price < prices[0].value && product.price > prices[1].value){
        //         filteredCatalog.splice(filteredCatalog.indexOf(product, 1));
        //     }
        // });

        return filteredCatalog;
    }

    eventListener(catalog, hash = null){

        let platformsCheckbox = this.getPlatforms();

        platformsCheckbox.forEach(platform => {
            platform.addEventListener('change', (e) => {
                
                if (e.target.checked) {
                    history.pushState(null, null, '#catalog/' + e.target.id.slice(6,));
                    this.refreshPage(catalog, e.target.id.slice(6,));
                    this.genresToShow = this.allGenres;
                    
                } else if (!e.target.checked) {
                    history.pushState(null, null, '#catalog');
                    this.refreshPage(catalog, null);
                    this.genresToShow = this.allGenres;
                }
            });

            if (platform.id.slice(6,) == hash) {
                platform.checked = true;
            }
        });

        let genresChechbox = this.getGenres();

        genresChechbox.forEach(genre => {
            genre.addEventListener('change', (e) => {

                if(this.genresToShow.length == 7){
                    this.genresToShow  = [];
                }

                if (e.target.checked){
                    this.genresToShow.push(e.target.id.slice(6,));
                    this.refreshPage(catalog, hash);
                    
                } else if (!e.target.checked) {
                    this.genresToShow.splice(this.genresToShow.indexOf(genre.id.slice(6,)), 1);
                    this.refreshPage(catalog, hash);
                }
            });

            if (this.genresToShow.includes(genre.id.slice(6,))) {
                genre.checked = true;
            }
        });

        // let prices = this.getPrices();
        // prices.forEach(price => {
        //     price.addEventListener('input', () => {
                
        //     })
        // })

        let sort = [];
        sort[0] = document.querySelectorAll('.catalog-sort')[0];
        sort[1] = document.querySelectorAll('.catalog-sort')[1];
        
        addEventListener('click', (e) => {
            if (e.target == sort[0]) {
                sort[0].classList.add('active');
                sort[1].classList.remove('active');
                
            } else if (e.target == sort[1]) {
                sort[1].classList.add('active');
                sort[0].classList.remove('active');
            }
        });


    }

    refreshPage(allProducts, hash){
        let catalog = this.sortProducts(allProducts, hash);

        this.content.innerHTML = `
            <div class="container">
                <div class="products-list">
                    <div class="products-list-sidebar">
                        ${this.loadCatalogListSidebar()}
                    </div>
                    <div class="products-list-catalog">
                        <div class="top-section">
                            <div class="catalog-control">
                                <a href="javascript:void(0);" class="catalog-sort active">Expensive first</a>
                                <a href="javascript:void(0);" class="catalog-sort">Cheap first</a>
                            </div>
                        </div>

                        <div class="catalog-content">
                            ${this.loadCatalog(catalog)}
                        </div>

                    </div>
                </div>
            </div>
        `; 

        this.eventListener(allProducts, hash);
    }


    getPlatforms() {
        let platformsCheckbox = [];
        platformsCheckbox[0] = document.getElementById('check-playstation_4');
        platformsCheckbox[1] = document.getElementById('check-xbox_one');
        platformsCheckbox[2] = document.getElementById('check-nintendo_switch');
        return platformsCheckbox;
    }

    getGenres() {
        let genresChechbox = [];
        genresChechbox[0] = document.getElementById('check-Action');
        genresChechbox[1] = document.getElementById('check-Horror');
        genresChechbox[2] = document.getElementById('check-Shooter');
        genresChechbox[3] = document.getElementById('check-Stealth');
        genresChechbox[4] = document.getElementById('check-Andventure');
        genresChechbox[5] = document.getElementById('check-Platformer');
        genresChechbox[6] = document.getElementById('check-Roleplaying');
        return genresChechbox;
    }

    getPrices() {
        let priceValue = [];
        priceValue[0] = document.getElementById('price-from');
        priceValue[1] = document.getElementById('price-to');
        return priceValue;
    }

    loadCatalogListSidebar() {
        return `
            <div class="filter-block">
                <div id="fixed-filter">
                    <div class="toggle-content">
                        <div class="toggle-row">
                            <div class="toggle-title">
                                Price
                            </div>
                            <div class="price-ranges">
                                <br>
                                <div class="price-input">
                                    <div class="form-group-price">
                                        <input type="text" id="price-from" maxlength="4" min="99" autocomplete="off" name="price_from" value="99">
                                    </div>
                                    <div class="form-group-price">
                                        <input type="text" id="price-to" maxlength="4" min="99" autocomplete="off" name="price_from" value="3999">
                                    </div>
                                </div>
                                <a id="price-btn" href="javascript:void(0);">OK</a>
                            </div>
                        </div>
                        <div class="toggle-row">
                            <div class="toggle-title">
                                Platform
                            </div>
                            <div class="checkbox-row">
                                <div class="checkbox-wrap">
                                    <a class="check-group" href="javascript:void(0);"> <!--#catalog/playstation_4-->
                                        <input id="check-playstation_4" type="checkbox">
                                        <label for="check-playstation_4">Playstation 4</label>
                                    </a>
                                </div>
                                <div class="checkbox-wrap">
                                    <a class="check-group" href="javascript:void(0);">
                                        <input id="check-xbox_one" type="checkbox">
                                        <label for="check-xbox_one">Xbox One</label>
                                    </a>
                                </div>
                                <div class="checkbox-wrap">
                                    <a class="check-group" href="javascript:void(0);">
                                        <input id="check-nintendo_switch" type="checkbox" >
                                        <label for="check-nintendo_switch">Nintendo Switch</label>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="toggle-row">
                            <div class="toggle-title">
                                Genre
                            </div>
                            <div class="checkbox-row">
                                <div class="checkbox-wrap">
                                    <a class="check-group" href="javascript:void(0);">
                                        <input id="check-Action" type="checkbox">
                                        <label for="check-Action">Action</label>
                                    </a>
                                </div>
                                <div class="checkbox-wrap">
                                    <a class="check-group" href="javascript:void(0);">
                                        <input id="check-Andventure" type="checkbox">
                                        <label for="check-Andventure">Andventure</label>
                                    </a>
                                </div>
                                <div class="checkbox-wrap">
                                    <a class="check-group" href="javascript:void(0);">
                                        <input id="check-Roleplaying" type="checkbox" >
                                        <label for="check-Roleplaying">Roleplaying</label>
                                    </a>
                                </div>
                                <div class="checkbox-wrap">
                                    <a class="check-group" href="javascript:void(0);">
                                        <input id="check-Horror" type="checkbox">
                                        <label for="check-Horror">Horror</label>
                                    </a>
                                </div>
                                <div class="checkbox-wrap">
                                    <a class="check-group" href="javascript:void(0);">
                                        <input id="check-Shooter" type="checkbox">
                                        <label for="check-Shooter">Shooter</label>
                                    </a>
                                </div>
                                <div class="checkbox-wrap">
                                    <a class="check-group" href="javascript:void(0);">
                                        <input id="check-Stealth" type="checkbox">
                                        <label for="check-Stealth">Stealth</label>
                                    </a>
                                </div>
                                <div class="checkbox-wrap">
                                    <a class="check-group" href="javascript:void(0);">
                                        <input id="check-Platformer" type="checkbox">
                                        <label for="check-Platformer">Platformer</label>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadCatalog(catalog) {
        let catalog_content = '';

        catalog.forEach(game => {
            catalog_content += `
                <div class="game-card">
                    <a class="game-card-image" href="#product/${game.url}">
                           <img src="${game.image}" alt="game image">
                    </a>
                    <a class="game-card-title" href="#product/${game.url}">${game.title}</a>
                    <div class="game-card-price">
                        <p>${game.price} ₴</p>
                    </div>
                    <div class="game-card-platform">
                        <span class="platform-item ${game.platform[0]}"><img src="./images/platforms/${game.platform[0]}.svg" alt=''></span>
                        <span class="platform-item ${game.platform[1]}"><img src="./images/platforms/${game.platform[1]}.svg" alt=''></span>
                        <span class="platform-item ${game.platform[2]}"><img src="./images/platforms/${game.platform[2]}.svg" alt=''></span>
                    </div>
                </div>
            `;
        });

        return catalog_content;
    }
}
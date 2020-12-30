import {getData} from './fakeDB.js';

export default class ActionPage {
    constructor(){
        this.route = 'action';
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

        let data = await getData();
        let action = data.actions.filter(action => {
            return action.url === hash;
        }); 
        action = action[0];
        

        this.content.innerHTML = `
            ${this.pageHTML(action)}
        `;
    }

    pageHTML(action) {
        return `
            <div class="action-container">
                <div class="action-top">
                    <div class="action-img-block">
                        <img src="${action.image}" alt="action image">
                    </div>
                    <div class="action-information">
                        <h1>${action.title}</h1>
                        <p class="action-description">${action.description}</p>
                        <p class="action-expire-date">${action.endDate}</p>
                    </div>
                </div>
            </div>
        `;
    }
}
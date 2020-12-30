/* eslint-env jest */
jest.mock('../fakeDB.js');


import Router from '../Router.js';
import HomePage from '../HomePage.js';
import PagesHub from '../PagesHub.js';
import OrderPage from '../OrderPage.js';
import ActionPage from '../ActionPage.js';
import ProductPage from '../ProductPage.js';
import CatalogPage from '../CatalogPage.js';
import {getData} from '../fakeDB'

describe('should define end points', ()=>{
    let end_points;
    beforeEach(() => {
        end_points = {
            products_end_poins: [
                'ghost_of_tsushima', 'spyro_reignited_trilogy', 'jedi_fallen_order', 'days_gone', 'resident_evil_2',
                'sekiro_shadows_die_twice','metro_exodus', 'deus_ex_mankind_divided', 'witcher_3', 'rise_of_the_tomb_rider', 'super_mario_odyssey',
                'zelda_breath_of_the_wild'],
            actions_end_poins: ['winter_action'],
            orders_end_poins: [],
            cart_end_poins: [
                'ghost_of_tsushima', 'spyro_reignited_trilogy', 'jedi_fallen_order', 'days_gone', 'resident_evil_2',
                'sekiro_shadows_die_twice','metro_exodus', 'deus_ex_mankind_divided', 'witcher_3', 'rise_of_the_tomb_rider', 'super_mario_odyssey',
                'zelda_breath_of_the_wild', 'clear']};
    });

    it('should init products endpoints', async () => {
        const data = await getData();
        let products_end_points = [];
        data.products.forEach(product => {
            products_end_points.push(product.url);
        });

        expect(products_end_points).toStrictEqual(end_points.products_end_poins);
    });

    it('should init actions endpoints', async () => {
        const data = await getData();
        let actions_end_points = [];
        data.actions.forEach(product => {
            actions_end_points.push(product.url);
        });

        expect(actions_end_points).toStrictEqual(end_points.actions_end_poins);
    });

    it('should init orders endpoints', async () => {
        const data = await getData();
        let orders_end_points = [];
        data.orders.forEach(product => {
            orders_end_points.push(product.url);
        });

        expect(orders_end_points).toStrictEqual(end_points.orders_end_poins);
    });

    it('should init cart endpoints', async () => {
        const data = await getData();
        let cart_end_points = [];
        data.products.forEach(product => {
            cart_end_points.push(product.url);
        });
        cart_end_points.push('clear');

        expect(cart_end_points).toStrictEqual(end_points.cart_end_poins);
    });
});

describe('should define classes', ()=>{
    it('HomePage', ()=>{
        expect(HomePage).toBeDefined();
    });
    it('OrderPage', ()=>{
        expect(OrderPage).toBeDefined();
    });
    it('ActionPage', ()=>{
        expect(ActionPage).toBeDefined();
    });
    it('ProductPage', ()=>{
        expect(ProductPage).toBeDefined();
    });
    it('CatalogPage', ()=>{
        expect(CatalogPage).toBeDefined();
    });
    it('PagesHub', ()=>{
        expect(PagesHub).toBeDefined();
    });
    it('Router', ()=>{
        expect(Router).toBeDefined();
    });

});
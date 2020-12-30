/* eslint-env jest */
import PagesHub from '../PagesHub';
import CatalogPage from '../CatalogPage';
import HomePage from '../HomePage';
import Cart from '../Cart';
import OrderPage from '../OrderPage';

jest.mock('../CatalogPage');
jest.mock('../HomePage');
jest.mock('../Cart');

describe('class PagesHub', ()=>{
    let _;

    beforeEach(()=>{
        CatalogPage.mockClear();
        HomePage.mockClear();
        Cart.mockClear();

        _ = new PagesHub();
    });

    describe('PagesHub: getPage', ()=>{
        it('should return page by route', ()=>{
            Cart.prototype.hash = 'cart';
            let t = new OrderPage();
            _ = new PagesHub([t]);
            expect(_.getPage('checkout')).toBeInstanceOf(OrderPage);
        });
    });

    describe('PagesHub: loadCart', ()=>{

        it('should init child pages', ()=>{
            new PagesHub([new CatalogPage()], new HomePage());
            expect(CatalogPage).toHaveBeenCalledTimes(1);
            expect(HomePage).toHaveBeenCalledTimes(1);
        });

        it('should invoke loadCart', ()=>{
            const getPage = jest.fn();
            PagesHub.prototype.getPage = function (){
                return getPage();
            };

            getPage.mockReturnValue(new Cart());
            _.loadCart();
            expect(Cart).toHaveBeenCalledTimes(1);
            expect(getPage).toHaveBeenCalledTimes(1);
        });
    });

    describe('PagesHub: loadHomePage', ()=>{
        it('should invoke loadDefaultPage', ()=>{
            _ = new PagesHub([], new HomePage());
            _.loadDefaultPage();
            expect(HomePage).toHaveBeenCalledTimes(1);
        });
    });

    describe('PagesHub: loadByHash', ()=>{
        it('should load page by its route', ()=>{
            let t = new Cart();
            const loadDefaultPage = PagesHub.prototype.loadDefaultPage = jest.fn();
            t.loadPage.mockReturnValue(true);

            _.loadByHash();
            expect(t.loadPage()).toBeTruthy();
            expect(loadDefaultPage).toHaveBeenCalledTimes(1);
        });
        
        it('should load false', ()=>{
            let t = new Cart();
            const loadDefaultPage = PagesHub.prototype.loadDefaultPage = jest.fn();
            t.loadPage.mockReturnValue(false);

            _.loadByHash();
            expect(t.loadPage()).toBeFalsy();
            expect(loadDefaultPage).toHaveBeenCalledTimes(1);
        });
    });
});
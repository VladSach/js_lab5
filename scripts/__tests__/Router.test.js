/* eslint-env jest */
import Router from '../Router.js';

import PagesHub from '../PagesHub.js';
jest.mock('../PagesHub');

describe('Router class', ()=>{
    let _;
    let d;
    let m;
    beforeEach(()=>{
        d = {products_end_points :['test_url1'],
            actions_end_points: ['test_url2'],
            catalog_end_points: ['test_url3'],
            orders_end_points: ['test_url4']};
        m = new PagesHub();
        _ = new Router(d, m);
        PagesHub.mockClear();
        console.error = jest.fn()
    });
    describe('Router: loadHome', ()=>{
        it('should load home page', ()=>{
            _.loadHome();
            expect(m.loadDefaultPage).toHaveBeenCalledTimes(1);
        });

        it('should change route', ()=>{
            _.loadHome();
            expect(window.location.hash).toBeTruthy();
        });
    });

    describe('Router: init', ()=>{
        it('window route exist', ()=>{
            history.pushState(null, null, '#test');
            const loadHome = Router.prototype.loadHome = jest.fn();

            _ = new Router(d, m);
            expect(loadHome).toHaveBeenCalledTimes(1);
        });
    });

    describe('Router: loadContent', ()=>{
        it('should process hash == null and route exist', ()=>{
            expect(_.loadContent('product')).toBeTruthy();
            expect(m.loadByHash).toHaveBeenCalledTimes(1);
            expect(m.loadByHash).toHaveBeenCalledWith('product');
        });

        it('should process hash == null and route DO NOT exist', ()=>{
            expect(_.loadContent('test')).toBeFalsy();
        });

        it('should process hash and route exist', ()=>{
            expect(_.loadContent('product', 'test_url1')).toBeTruthy();
            expect(m.loadByHash).toHaveBeenCalledTimes(1);
            expect(m.loadByHash).toHaveBeenCalledWith('product', 'test_url1');
        });

        it('should process hash DO NOT EXIST and route exist', ()=>{
            expect(_.loadContent('product', 'test')).toBeFalsy();
        });


    });

    describe('Router: onRouteChange', ()=>{
        it('should process without hash / case loadContent -> true ', ()=>{
            history.pushState(null, null, '#test');

            const loadHome = Router.prototype.loadHome = jest.fn();
            loadHome.mockClear();
            // eslint-disable-next-line no-unused-vars
            const loadContent = jest.fn((route)=>{
                return true;
            });
            Router.prototype.loadContent = (route)=>{
                return loadContent(route);
            };
            loadContent.mockClear();

            _.onRouteChange();
            expect(loadContent).toHaveBeenCalledTimes(1);
            expect(loadContent).toHaveBeenCalledWith('test');
            expect(_.loadContent()).toBeTruthy();
            expect(loadHome).not.toHaveBeenCalled();
        });

        it('should process without hash / case loadContent -> false ', ()=>{
            history.pushState(null, null, '#test');


            const loadHome = Router.prototype.loadHome = jest.fn();
            loadHome.mockClear();
            // eslint-disable-next-line no-unused-vars
            const loadContent = jest.fn((route)=>{
                return false;
            });
            Router.prototype.loadContent = (route)=>{
                return loadContent(route);
            };
            loadContent.mockClear();

            _.onRouteChange();
            expect(loadContent).toHaveBeenCalledTimes(1);
            expect(loadContent).toHaveBeenCalledWith('test');
            expect(_.loadContent()).toBeFalsy();
            expect(loadHome).toHaveBeenCalled();
        });

        it('should process with hash / case loadContent -> false ', ()=>{
            history.pushState(null, null, '#test/test');

            const loadHome = Router.prototype.loadHome = jest.fn();
            loadHome.mockClear();
            // eslint-disable-next-line no-unused-vars
            const loadContent = jest.fn((route, hash)=>{
                return false;
            });
            Router.prototype.loadContent = (route, hash)=>{
                return loadContent(route, hash);
            };
            loadContent.mockClear();

            _.onRouteChange();
            expect(loadContent).toHaveBeenCalledTimes(1);
            expect(loadContent).toHaveBeenCalledWith('test', 'test');
            expect(_.loadContent()).toBeFalsy();
            expect(loadHome).toHaveBeenCalled();
        });

        it('should process with hash / case loadContent -> true ', ()=>{
            history.pushState(null, null, '#test/test');

            const loadHome = Router.prototype.loadHome = jest.fn();
            loadHome.mockClear();
            // eslint-disable-next-line no-unused-vars
            const loadContent = jest.fn((route, hash)=>{
                return true;
            });
            Router.prototype.loadContent = (route, hash)=>{
                return loadContent(route, hash);
            };
            loadContent.mockClear();

            _.onRouteChange();
            expect(loadContent).toHaveBeenCalledTimes(1);
            expect(loadContent).toHaveBeenCalledWith('test', 'test');
            expect(_.loadContent()).toBeTruthy();
            expect(loadHome).not.toHaveBeenCalled();
        });

        it('should process with length > 3', ()=>{
            history.pushState(null, null, '#test/test/test');

            const loadHome = Router.prototype.loadHome = jest.fn();
            loadHome.mockClear();

            _.onRouteChange();

            expect(loadHome).toHaveBeenCalledTimes(1);
        });
    });

});
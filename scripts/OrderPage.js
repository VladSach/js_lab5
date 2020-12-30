import {sendRequest} from './script.js';

export default class OrderPage {
    constructor(){
        this.route = 'checkout';
        this.content = document.getElementById('page-content');

        this.formContent;

        this.validForm = [];
    }

    loadPage(hash) {

        if (hash == null){
            this.loadCheckout();
        }
        else {
            this.loadOrder(hash);
        }
        return true;
    }

    loadCheckout() {
        this.content.innerHTML =  `
        <div class="container-order">
            <h1 class="order-title">Forming order</h1>
            <div class="steps">
                <div class="steps-throuth"></div>
                <div class="steps-item">
                    <div class="steps-item-icon steps-item-icon-active" id="step-icon-1">
                        <svg class="steps-user" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="10" r="7.5" stroke="white" stroke-width="3"></circle>
                            <path d="M29 31C29 23.8203 23.1797 18 16 18C8.8203 18 3 23.8203 3 31" stroke="white" stroke-width="3"></path>
                        </svg>
                    </div>
                </div>
                <div class="steps-item">
                    <div class="steps-item-icon" id="step-icon-2">
                        <svg class="steps-box" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.25 2.9375V7.0625H2.9375V18.0625H18.0625V7.0625H18.75V2.9375H2.25ZM3.625 4.3125H17.375V5.6875H3.625V4.3125ZM4.3125 7.0625H16.6875V16.6875H4.3125V7.0625ZM8.30894 8.4375C8.21865 8.44594 8.13092 8.47208 8.05074 8.51443C7.97056 8.55678 7.8995 8.61451 7.84163 8.68432C7.78376 8.75413 7.7402 8.83465 7.71345 8.92129C7.6867 9.00794 7.67728 9.099 7.68572 9.18928C7.69416 9.27957 7.7203 9.3673 7.76265 9.44748C7.805 9.52766 7.86273 9.59872 7.93254 9.65659C8.07352 9.77347 8.25516 9.82955 8.4375 9.8125H12.5625C12.7448 9.8125 12.9197 9.74007 13.0486 9.61114C13.1776 9.4822 13.25 9.30734 13.25 9.125C13.25 8.94266 13.1776 8.7678 13.0486 8.63886C12.9197 8.50993 12.7448 8.4375 12.5625 8.4375H8.4375C8.41597 8.43649 8.3944 8.43649 8.37288 8.4375C8.35135 8.43649 8.33047 8.43649 8.30894 8.4375Z" fill="white"></path>
                        </svg>
                    </div>
                </div>
                <div class="steps-item">
                    <div class="steps-item-icon" id="step-icon-3">
                        <svg class="steps__cart" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.8789 3.41016H2.12109C1.76459 3.41016 1.47656 3.69818 1.47656 4.05469V16.9453C1.47656 17.3018 1.76459 17.5898 2.12109 17.5898H18.8789C19.2354 17.5898 19.5234 17.3018 19.5234 16.9453V4.05469C19.5234 3.69818 19.2354 3.41016 18.8789 3.41016ZM2.92676 4.86035H18.0732V7.27734H2.92676V4.86035ZM18.0732 16.1396H2.92676V9.0498H18.0732V16.1396ZM13.2997 14.8506H16.623C16.7117 14.8506 16.7842 14.7781 16.7842 14.6895V13.2393C16.7842 13.1506 16.7117 13.0781 16.623 13.0781H13.2997C13.2111 13.0781 13.1385 13.1506 13.1385 13.2393V14.6895C13.1385 14.7781 13.2111 14.8506 13.2997 14.8506Z" fill="white"></path>
                        </svg>
                    </div>
                </div>
                <div class="steps-item">
                    <div class="steps-item-icon" id="step-icon-4">
                        <svg class="steps__check" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.24484 11.997L6.32086 15.108L12.8659 7.62797L11.5716 6.49703L6.08539 12.767L3.2864 10.6306L2.24484 11.997ZM18.8815 7.62797L17.5873 6.49703L12.1139 12.7524L11.4668 12.2351L10.3926 13.5774L12.3236 15.1226L18.8815 7.62797Z" fill="white"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div class="order-wrapper">
                <div class="order-form">
                    <div class="order-form-block">
                        <div class="order-form-header">Personal information</div>
                        <div class="order-form-content">

                        </div>
                    </div>
                </div>  
            </div>

        </div>
        `;

        this.formContent = document.querySelector('.order-form-content');
        this.formContent.innerHTML = this.loadStepOne();
        this.eventListerStepOne();
    }

    loadStepOne() {
        return `
        <div id="step-1">
            <form id="form-step-1" autocomplete="off"  novalidate>
                <div class="form-group">
                    <input class = "form-group-input" id="name" name="name" type="text" value="" required>
                    <label for="name">Name</label>
                    <span class="help">Order will be placed in this name</span>
                </div>
                <div class="form-group">
                    <input class = "form-group-input" id="surname" name="surname" type="text" value="" required>
                    <label for="surname">Surname</label>
                    <span class="help">Order will be placed in this surname</span>
                </div>
                <div class="form-group">
                    <input class = "form-group-input" id="tel" name="tel" type="tel" value="" required>
                    <label for="tel">Phone</label>
                    <span class="help">Requared for order conformation</span>
                </div>
                <div class="form-group">
                    <input class = "form-group-input" id="email" name="email" type="email" value="" required>
                    <label for="email">Email</label>
                    <span class="help">Order detail will be sent there</span>
                </div>

                <button type="submit" id="btn-step-1" class="btn-submit">
                    Further
                </button>
            </form>
            
        </div>
        `;
    }

    eventListerStepOne(){

        let form = document.getElementById('form-step-1');

        const name = form.elements.namedItem('name');
        const surname = form.elements.namedItem('surname');
        const tel = form.elements.namedItem('tel');
        const email = form.elements.namedItem('email');

        const name_reg = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        const tel_reg = /^\+?3?8?(0\d{9})$/;
        const email_reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        name.addEventListener('input', e => {
            history.pushState(null, null, '#checkout');
            if (name_reg.test(e.target.value)) {
                e.target.classList.add('validated');
                e.target.classList.remove('non-validated');
            } else {
                e.target.classList.add('non-validated');
                e.target.classList.remove('validated');
            }
        });

        surname.addEventListener('input', e => {
            if (name_reg.test(e.target.value)) {
                e.target.classList.add('validated');
                e.target.classList.remove('non-validated');
            } else {
                e.target.classList.add('non-validated');
                e.target.classList.remove('validated');
            }
        });

        tel.addEventListener('input', e => {
            if (tel_reg.test(e.target.value)) {
                e.target.classList.add('validated');
                e.target.classList.remove('non-validated');
            } else {
                e.target.classList.add('non-validated');
                e.target.classList.remove('validated');
            }
        });

        email.addEventListener('input', e => {
            if (email_reg.test(e.target.value)) {
                e.target.classList.add('validated');
                e.target.classList.remove('non-validated');
            } else {
                e.target.classList.add('non-validated');
                e.target.classList.remove('validated');
            }
        });

        let validated = true;
        form.addEventListener('submit', e => {
            e.preventDefault();

            let errors = [];

            if (!name_reg.test(name.value)) {
                errors.push({text: 'name', el: name});
            }

            if (!name_reg.test(surname.value)) {
                errors.push({text: 'surname', el: surname});
            }

            if (!tel_reg.test(tel.value)) {
                errors.push({text: 'tel', el: tel});
            }

            if (!email_reg.test(email.value)) {
                errors.push({text: 'email', el: email});
            }

            if (errors.length > 0) {
                validated = false;
            }

            if(validated) {
                this.validForm.push(name.value);
                this.validForm.push(surname.value);
                this.validForm.push(tel.value);
                this.validForm.push(email.value);

                this.loadStepThree();
            }
        });
    }

    loadStepThree() {
        document.getElementById('step-icon-2').classList.add('steps-item-icon-active');
        document.getElementById('step-icon-3').classList.add('steps-item-icon-active');
        document.querySelector('.order-form-header').innerHTML = 'Payment';

        this.formContent.innerHTML = `
            <div id="step-2">
                <form id="form-step-2" autocomplete="off"  novalidate>
                    <div class="form-group">
                        <input class = "form-group-input" id="name-on-card" name="name-on-card" type="text" value="" required>
                        <label for="name">Name on card</label>
                        <span class="help">Full name as displayed on card</span>
                    </div>
                    <div class="form-group">
                        <input class = "form-group-input" id="credit-card-number" name="credit-card-number" type="text" value="" required>
                        <label for="surname">Credit card number</label>
                        <span class="help">Credit card number is required</span>
                    </div>
                    <div class="form-group">
                        <input class = "form-group-input" id="expiration-date" name="expiration-date" type="text" value="" required>
                        <label for="tel">Expiration date</label>
                        <span class="help">Expiration date is required</span>
                    </div>
                    <div class="form-group">
                        <input class = "form-group-input" id="cvc" name="cvc" type="password" value="" required>
                        <label for="tel">CVC</label>
                        <span class="help">CVC is required</span>
                    </div>

                    <button type="submit" id="btn-step-2" class="btn-submit">
                        Further
                    </button>
                </form>
                
            </div>
        `;

        this.eventListerStepThree();
    }

    eventListerStepThree() {
        let form = document.getElementById('form-step-2');

        const cardName = form.elements.namedItem('name-on-card');
        const creditCardNumber = form.elements.namedItem('credit-card-number');
        const expiration = form.elements.namedItem('expiration-date');
        const cvc = form.elements.namedItem('cvc');

        const cardName_reg = /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        const creditCardNumber_reg = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
        const expiration_reg = /^((0[1-9])|(1[0-2]))[/.-]*(2[0-9])$/;
        const cvc_reg = /^[0-9]{3,}/;


        cardName.addEventListener('input', e => {
            if (cardName_reg.test(e.target.value)) {
                e.target.classList.add('validated');
                e.target.classList.remove('non-validated');
            } else {
                e.target.classList.add('non-validated');
                e.target.classList.remove('validated');
            }
        });

        creditCardNumber.addEventListener('input', e => {
            if (creditCardNumber_reg.test(e.target.value)) {
                e.target.classList.add('validated');
                e.target.classList.remove('non-validated');
            } else {
                e.target.classList.add('non-validated');
                e.target.classList.remove('validated');
            }
        });

        expiration.addEventListener('input', e => {
            if (expiration_reg.test(e.target.value)) {
                e.target.classList.add('validated');
                e.target.classList.remove('non-validated');
            } else {
                e.target.classList.add('non-validated');
                e.target.classList.remove('validated');
            }
        });

        cvc.addEventListener('input', e => {
            if (cvc_reg.test(e.target.value)) {
                e.target.classList.add('validated');
                e.target.classList.remove('non-validated');
            } else {
                e.target.classList.add('non-validated');
                e.target.classList.remove('validated');
            }
        });

        let validated = true;
        form.addEventListener('submit', e => {
            e.preventDefault();

            let errors = [];

            if (!cardName_reg.test(cardName.value)) {
                errors.push({text: 'cardName', el: cardName});
            }

            if (!creditCardNumber_reg.test(creditCardNumber.value)) {
                errors.push({text: 'creditCardNumber', el: creditCardNumber});
            }

            if (!expiration_reg.test(expiration.value)) {
                errors.push({text: 'expiration', el: expiration});
            }

            if (!cvc_reg.test(cvc.value)) {
                errors.push({text: 'cvc', el: cvc});
            }

            if (errors.length > 0) {
                validated = false;
            }

            if(validated) {
                this.validForm.push(cardName.value);
                this.validForm.push(creditCardNumber.value);
                this.validForm.push(expiration.value);
                this.validForm.push(cvc.value);

                this.loadStepFour();
            }
        });
    }

    loadStepFour() {
        document.getElementById('step-icon-4').classList.add('steps-item-icon-active');
        document.querySelector('.order-form-header').innerHTML = 'Order review';


        let order = {
            name: this.validForm[0],
            surname: this.validForm[1],
            tel: this.validForm[2],
            email: this.validForm[3],
            cardName: this.validForm[4],
            creditCardNumber: this.validForm[5],
            expiration: this.validForm[6],
            cvc: this.validForm[7]
        };

        this.formContent.innerHTML = `
            <div id="step-4">
                <p>Name: ${order.name}</p>
                <p>Surame: ${order.surname}</p>
                <p>Phone: ${order.tel}</p>
                <p>Email: ${order.email}</p>
                <p>Card Name: ${order.cardName}</p>
                <p>Card: ${order.creditCardNumber}</p>
                <p>Expiration date: ${order.expiration}</p>
                <p>CVC: ***</p>  
                
                <a href="#cart/clear"type="button" id="btn-step-4" class="btn-submit">
                    Sumbit
                </a>
            </div>
        `;

        const postRequestUrl = 'https://my-json-server.typicode.com/VladSach/GameRshop/orders';
        document.getElementById('btn-step-4').addEventListener('click', () =>{
            sendRequest('POST', postRequestUrl, JSON.stringify(order))
                .then( data => {
                    this.loadOrderById(data.id, order);
                    
                })
                .catch((error) => {
                    console.log(error);
                    this.showError();
                });
        });
    }

    loadOrderById(id, {name, surname, tel, email, cardName, creditCardNumber, expiration}){
        history.pushState(null, null, ('#checkout/'+id));
        document.querySelector('.order-title').innerHTML = 'Your order';
        document.querySelector('.order-form-header').innerHTML = 'Congrats';

        this.formContent.innerHTML = `
            <div id="step-4">
            <h2>Order ID: ${id}</h2>
                <p>Name: ${name}</p>
                <p>Surame: ${surname}</p>
                <p>Phone: ${tel}</p>
                <p>Email: ${email}</p>
                <p>Card Name: ${cardName}</p>
                <p>Card: ${creditCardNumber}</p>
                <p>Expiration date: ${expiration}</p>
                <p>CVC: ***</p>  
            </div>
        `;
        history.pushState(null, null, ('#checkout/'+id));
    }

    showError(){
        this.content.innerHTML = `
        <div role="alert">
            Some problems with the data server. Sorry
        </div>
        `;
    }
}
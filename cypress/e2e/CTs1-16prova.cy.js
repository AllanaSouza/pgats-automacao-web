import { faker } from "@faker-js/faker";

    describe('handson6-CTs8-16', () => {
        beforeEach(() => {
        cy.visit('https://automationexercise.com/');
        cy.get('a[href="/login"]').click();
        });

    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime();

        cy.get('input[data-qa="signup-name"]').type('QA Tester');
        cy.get('input[data-qa="signup-email"]').type('qatester' + timestamp + '@test.com');

        cy.get('button[data-qa="signup-button"]').click();

        cy.get('input#id_gender1').check(); 
        cy.get('input#password').type('teste1234', {log: false});
        cy.get('select[data-qa=days]').select('10');
        cy.get('select[data-qa=months]').select('May');
        cy.get('select[data-qa=years]').select('1990');

        cy.get('input[type=checkbox]#newsletter').check();

        cy.get('input[type=checkbox]#optin').check();

        cy.get('input#first_name').type('QA');
        cy.get('input#last_name').type('Tester');
        cy.get('input#company').type('Teste QA Ltda');
        cy.get('input#address1').type('Rua dos Testes, 123');
        cy.get('input#address2').type('Apto 456');
        cy.get('select#country').select('Canada');
        cy.get('input#state').type('Ontario');
        cy.get('input#city').type('Toronto'); 
        cy.get('[data-qa="zipcode"]').type('A1B 2C3');
        cy.get('[data-qa="mobile_number"]').type('+1 234 567 8900');

        cy.get('[data-qa="create-account"]').click();

        cy.url().should('include', '/account_created');
        cy.contains('b', 'Account Created!');
    });


    it('Fazer login com e-mail e senha corretos', () => { 

        cy.get('[data-qa="login-email"]').type('qatester1768351954831@test.com');
        cy.get('[data-qa="login-password"]').type('teste1234');

        cy.get('[data-qa="login-button"]').click();

        cy.get('i.fa-user').parent().should('contain', 'QA Tester');
        cy.get('a[href="/logout"]').should('be.visible');
        cy.contains('b', 'QA Tester').should('be.visible');
    });


    it('Fazer login com e-mail e senha incorretos', () => { 

        cy.get('[data-qa="login-email"]').type('qatester@test.com');
        cy.get('[data-qa="login-password"]').type('teste');

        cy.get('[data-qa="login-button"]').click();

       cy.contains('p', 'Your email or password is incorrect!').should('be.visible');
    });


    it('Fazer logout do usuário', () => { 

        cy.get('[data-qa="login-email"]').type('qatester1768351954831@test.com');
        cy.get('[data-qa="login-password"]').type('teste1234');

        cy.get('[data-qa="login-button"]').click();

        cy.contains('b', 'QA Tester').should('be.visible');

        cy.get('a[href="/logout"]').click();

        cy.url().should('include', '/login');

    });

     
    it('Cadastrar usuário com e-mail existente', () => {

        cy.get('input[data-qa="signup-name"]').type('QA Tester');
        cy.get('input[data-qa="signup-email"]').type('qatester@test.com');

        cy.get('button[data-qa="signup-button"]').click();

        cy.contains('p', 'Email Address already exist!').should('be.visible');
    });
  

     it('Enviar um Formulário de Contato com Upload do Arquivo', () => {
        
        cy.get('a[href="/contact_us"]').click();

        cy.get('[data-qa="name"]').type('QA Tester');
        cy.get('[data-qa="email"]').type('qatester1766875828946@test.com');
        cy.get('[data-qa="subject"]').type('Fixtures are a great way to mock data for responses to routes');
        cy.get('[data-qa="message"]').type('Estou enviando uma mensagem de teste usando dados do arquivo contactus.json');
 
        cy.fixture('example.json').as('arquivoParaUpload');
        cy.get('input[type=file]').selectFile('@arquivoParaUpload');
        cy.get('[data-qa="submit-button"]').click();

        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    });


    it('Validar detalhes do produto', () => {

        cy.visit('https://automationexercise.com/');

        cy.get('a[href="/products"]').click();

        cy.get('a[href="/product_details/1"]').click();

        cy.url().should('include',  '/product_details/1'); 
        cy.contains('Blue Top').should('be.visible');
        cy.contains('Category').should('be.visible');
        cy.contains('Rs. 500').should('be.visible');
        cy.contains('Availability').should('be.visible');
        cy.contains('Condition').should('be.visible');
        cy.contains('Brand').should('be.visible');
    });


    it('Pesquisar Produto', () => {

        cy.visit('https://automationexercise.com/');

        cy.get('a[href="/products"]').click();

        cy.get('a[href="/product_details/1"]').click();

        cy.get('#search_product').type('Blue Top');
        cy.get('#submit_search').click();

        cy.url().should('include',  '/products?search=Blue%20Top'); 
        cy.contains('Blue Top').should('be.visible');
        cy.contains('Category').should('be.visible');
        cy.contains('Rs. 500').should('be.visible');
        cy.contains('Availability').should('be.visible');
        cy.contains('Condition').should('be.visible');
        cy.contains('Brand').should('be.visible');
    });


    it('Validar Subscription', () => {

        cy.visit('https://automationexercise.com/');

        cy.scrollTo('bottom');

        cy.contains('Subscription').should('be.visible');

        cy.contains('Subscription') 
        .parent() 
        .find('input[type="email"]') 
        .type('teste@email.com');
        cy.get('button[type="submit"]').click();

        cy.contains('You have been successfully subscribed!').should('be.visible');
    });


    it('Cadastrar e finalizar compra', () => {
        const timestamp = new Date().getTime();

        cy.get('input[data-qa="signup-name"]').type('QA Tester');
        cy.get('input[data-qa="signup-email"]').type('qatester' + timestamp + '@test.com');

        cy.get('button[data-qa="signup-button"]').click();

        cy.get('input#id_gender1').check(); 
        cy.get('input#password').type('teste1234', {log: false});
        cy.get('select[data-qa=days]').select('10');
        cy.get('select[data-qa=months]').select('May');
        cy.get('select[data-qa=years]').select('1990');

        cy.get('input[type=checkbox]#newsletter').check();

        cy.get('input[type=checkbox]#optin').check();

        cy.get('input#first_name').type('QA');
        cy.get('input#last_name').type('Tester');
        cy.get('input#company').type('Teste QA Ltda');
        cy.get('input#address1').type('Rua dos Testes, 123');
        cy.get('input#address2').type('Apto 456');
        cy.get('select#country').select('Canada');
        cy.get('input#state').type('Ontario');
        cy.get('input#city').type('Toronto'); 
        cy.get('[data-qa="zipcode"]').type('A1B 2C3');
        cy.get('[data-qa="mobile_number"]').type('+1 234 567 8900');

        cy.get('[data-qa="create-account"]').click();

        cy.contains('Products').click(); 
        cy.get('[data-product-id="1"]').click({ multiple: true, force: true });
        cy.contains('Continue Shopping').click();

        cy.get('#cartModal', { timeout: 10000 }).should('not.be.visible'); 
        cy.contains('Cart').click({ force: true });

        cy.contains('Proceed To Checkout').click();

        cy.contains('Address Details').should('be.visible'); 
        cy.contains('Review Your Order').should('be.visible');

        cy.get('textarea[name="message"]').type('Pedido de teste automatizado.'); 
        cy.contains('Place Order').click();

        cy.get('input[name="name_on_card"]').type('QA  Tester  2'); 
        cy.get('input[name="card_number"]').type('4111111111111111'); 
        cy.get('input[name="cvc"]').type('123'); 
        cy.get('input[name="expiry_month"]').type('12'); 
        cy.get('input[name="expiry_year"]').type('2026');

        cy.contains('Pay and Confirm Order').click();

        cy.contains('Congratulations!', { timeout: 10000 }).should('be.visible');

        //Excluir conta 
/*      cy.contains('Delete Account').click(); 
        cy.contains('Account Deleted!').should('be.visible'); 
        cy.get('[data-qa="continue-button"]').click(); */
    });


   it('Fazer login e finalizar compra', ()  =>  {
        cy.get('[data-qa="login-email"]').type('qatester1768351954831@test.com');
        cy.get('[data-qa="login-password"]').type('teste1234');

        cy.get('[data-qa="login-button"]').click();

        cy.get('i.fa-user').parent().should('contain', 'QA Tester');
        cy.get('a[href="/logout"]').should('be.visible');
        cy.contains('b', 'QA Tester').should('be.visible');

        cy.contains('Products').click(); 
        cy.get('[data-product-id="1"]').click({ multiple: true, force: true });
        cy.contains('Continue Shopping').click();

        cy.contains('Products').click(); 
        cy.get('[data-product-id="1"]').click({ multiple: true, force: true });
        cy.contains('Continue Shopping').click();

        cy.get('#cartModal', { timeout: 10000 }).should('not.be.visible'); 
        cy.contains('Cart').click({ force: true });

        cy.contains('Proceed To Checkout').click();

        cy.contains('Address Details').should('be.visible'); 
        cy.contains('Review Your Order').should('be.visible');

        cy.get('textarea[name="message"]').type('Pedido de teste automatizado.'); 
        cy.contains('Place Order').click();

        cy.get('input[name="name_on_card"]').type('QA  Tester  2'); 
        cy.get('input[name="card_number"]').type('4111111111111111'); 
        cy.get('input[name="cvc"]').type('123'); 
        cy.get('input[name="expiry_month"]').type('12'); 
        cy.get('input[name="expiry_year"]').type('2026');

        cy.contains('Pay and Confirm Order').click();

        cy.contains('Congratulations!', { timeout: 10000 }).should('be.visible');

        // Excluir conta 
/*      cy.contains('Delete Account').click(); 
        cy.contains('Account Deleted!').should('be.visible'); 
        cy.get('[data-qa="continue-button"]').click(); */
   });
});
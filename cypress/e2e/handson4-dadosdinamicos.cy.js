/// <reference types="cypress" /> 
import userData from '../fixtures/example.json' //importa os dados do arquivo example.json e atribui à variável userData
import {
    getRandomNumber,
    getRandomEmail
} from '../support/helpers.js'; //importa as funções getRandomNumber e getRandomEmail do arquivo helpers.js
import { faker } from '@faker-js/faker'; //importa a biblioteca faker para geração de dados aleatórios


describe('Automation Exercise', () => {
    beforeEach(() => { //Laço de repetição que executa antes de cada it
        //cy.view('iphone-xr'); //Define o tamanho da visualização em tela
        cy.visit('https://automationexercise.com/'); //Acessa o site
        cy.get('a[href="/login"]').click(); //Clica no botão de login
    });

    it('Cadastrar um usuário', () => {
        // Arrange - Preparar o cenário

        //TAGS: <h1>, <h2>, <h3>, <p>, <a>, <button>, <input>, <select>, <textarea>, <div>, <span>
        cy.get('input[data-qa="signup-name"]').type('QA Tester'); //Preenche o nome
        cy.get('input[data-qa="signup-email"]').type(getRandomEmail()); //Preenche com dados dinamicos
        cy.get('button[data-qa="signup-button"]').click(); //Clica no botão de cadastro
        cy.get('input#id_gender1').check(); //Comando para radio buttons ou checkboxes
        cy.get('input#password').type('teste1234'); //Preenche a senha

        //Dropdowns
        cy.get('select[data-qa=days]').select('10'); //Seleciona o dia
        cy.get('select[data-qa=months]').select('May'); //Seleciona o mês
        cy.get('select[data-qa=years]').select('1990');  //Seleciona o ano

        //Checkboxes ou Radio buttons
        cy.get('input[type=checkbox]#newsletter').check(); //Marca a checkbox
        cy.get('input[type=checkbox]#optin').check(); //Marca a checkbox

        cy.get('input#first_name').type(faker.person.firstName()); //Preenche o primeiro nome
        cy.get('input#last_name').type(faker.person.lastName()); //Preenche o último nome
        cy.get('input#company').type('PGATS ' + faker.company.name()); //Preenche a empresa
        cy.get('input#address1').type(faker.location.streetAddress()); //Preenche o endereço
        cy.get('select#country').select('Canada'); //Seleciona o país
        cy.get('input#state').type(faker.location.state()); //Preenche o estado
        cy.get('input#city').type(faker.location.city()); //Preenche a cidade
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode()); //Preenche o CEP
        cy.get('[data-qa="mobile_number"]').type(faker.phone.number()); //Preenche o número de celular

        // Act - Executar a ação
        cy.get('[data-qa="create-account"]').click(); //Clica no botão de criar conta

        // Triplo A - Arrange, Act, Assert
        // Assert - Validar o resultado
        cy.url().should('include', '/account_created'); //Valida que a URL (rota) contém /account_created
        cy.contains('b', 'Account Created!'); //Valida que o texto (componente) ACCOUNT CREATED! está visível
    });
});
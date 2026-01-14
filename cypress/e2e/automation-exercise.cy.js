/** */
// describe / context - suite ou conjunto de testes em um mesmo arquivo
// it - um teste dentro de um bloco ou conjunto de testes

// describe -> Automation Exercise
//  it -> Cadastrar um usuário
//  it -> Teste abcd

// A extensão ES6 Mocha Snippets cria estruturas básicas de teste
// describe and it + tab

//Hooks (Laços de Repetição) – opções para deixar explícito trechos de código que execute sempre antes de todos ou de cada teste ou depois de todos ou de cada teste. São ganchos
    //Before – 1x antes de todos os testes
    //BeforeEach – antes de cada teste
    //After – 1x depois de todos os testes
    //AfterEach – depois de cada teste

/** */

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

    it.skip('Exemplos de logs',() => {
        cy.log('Step 1 :: PGATS AUTOMAÇÃO WEB CY LOG'); //Adiciona um log no teste
        cy.log('Step 2 :: OUTRO LOG DE EXEMPLO');

        cy.log('getRandomNumber(): ' + getRandomNumber()); //Usa a função getRandomNumber do arquivo helpers.js
        cy.log('getRandomEmail(): ' + getRandomEmail()); //Usa a função getRandomEmail do arquivo helpers.js

        cy.log('Dog Breed: ' + faker.animal.dog()); //Usa a biblioteca faker para gerar dados aleatórios de raças de cachorro
        cy.log('Cat Breed: ' + faker.animal.cat()); //Usa a biblioteca faker para gerar dados aleatórios de raças de gato
        cy.log('Full Name: ' + faker.person.fullName()); //Usa a biblioteca faker para gerar dados aleatórios de nome completo
        cy.log('Company Name: ' + faker.company.name()); //Usa a biblioteca faker para gerar dados aleatórios de nome de empresa

        cy.log('Nome do usuário: ' + userData.name); //Usa dados importados do arquivo example.json
        cy.log('Email do usuário: ' + userData.email);
        });

    it.only('Cadastrar um usuário', () => { //Caso de teste
        // Arrange - Preparar o cenário

        //TAGS: <h1>, <h2>, <h3>, <p>, <a>, <button>, <input>, <select>, <textarea>, <div>, <span>
        //ID: #nomeDoId
        //Class: .nomeDaClasse
        //Atributo: [atributo="valor"]
        //Combinações: tag#id.classe[atributo="valor"]
        
        
        cy.get('input[data-qa="signup-name"]').type('QA Tester'); //Preenche o nome
        cy.get('input[data-qa="signup-email"]').type('qatester' + getRandomNumber() + '@test.com'); //Preenche o email com numeros aleatórios para garantir email único
        //qatester1766875828946@test.com
        //qatester1766875965907@test.com
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

        cy.get('input#first_name').type('QA'); //Preenche o primeiro nome
        cy.get('input#last_name').type('Tester'); //Preenche o último nome
        cy.get('input#company').type('Teste QA Ltda'); //Preenche a empresa
        cy.get('input#address1').type('Rua dos Testes, 123'); //Preenche o endereço
        cy.get('input#address2').type('Apto 456'); //Preenche o endereço 2
        cy.get('select#country').select('Canada'); //Seleciona o país
        cy.get('input#state').type('Ontario'); //Preenche o estado
        cy.get('input#city').type('Toronto'); //Preenche a cidade
        cy.get('[data-qa="zipcode"]').type('A1B 2C3'); //Preenche o CEP
        cy.get('[data-qa="mobile_number"]').type('+1 234 567 8900'); //Preenche o número de celular

        // Act - Executar a ação
        cy.get('[data-qa="create-account"]').click(); //Clica no botão de criar conta

        // Triplo A - Arrange, Act, Assert
        // Assert - Validar o resultado
        cy.url().should('include', '/account_created'); //Valida que a URL (rota) contém /account_created
        cy.contains('b', 'Account Created!'); //Valida que o texto (componente) ACCOUNT CREATED! está visível
    });
});
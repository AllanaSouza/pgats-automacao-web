/// <reference types="cypress" /> 

// Importa os dados do arquivo contactus.json
import userData from '../fixtures/contactus.json';

describe('Automation Exercise', () => {
    beforeEach(() => { //Laço de repetição que executa antes de cada it
        cy.visit('https://automationexercise.com/'); //Acessa o site
        cy.get('a[href="/contact_us"]').click(); //Clica no botão Contact Us
    });

    it('Enviar um Formulário de Contato com Upload do Arquivo', () => { //Caso de teste
        // Arrange - Preparar o cenário
        
        //Preenhe o formulário de contato com as informações do arquivo contactus.json
        cy.get('[data-qa="name"]').type(userData.name);
        cy.get('[data-qa="email"]').type(userData.email);
        cy.get('[data-qa="subject"]').type(userData.subject);
        cy.get('[data-qa="message"]').type(userData.message);
 
        //Upload de arquivo
        cy.fixture('example.json').as('arquivoParaUpload'); //Carrega o arquivo de fixture e atribui a um alias
        cy.get('input[type=file]').selectFile('@arquivoParaUpload'); //Faz o upload do arquivo usando o alias
        cy.get('[data-qa="submit-button"]').click();

        // Assert - Validar o resultado
        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    });
});
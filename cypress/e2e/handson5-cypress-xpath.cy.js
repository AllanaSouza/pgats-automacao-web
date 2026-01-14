import userData from '../fixtures/example.json' //importa os dados do arquivo example.json e atribui à variável userData
import {
    getRandomNumber,
    getRandomEmail
} from '../support/helpers.js'; //importa as funções getRandomNumber e getRandomEmail do arquivo helpers.js

import { faker } from '@faker-js/faker'; //importa a biblioteca faker para geração de dados aleatórios

import menu from '../modules/menu/index.js'; //importa o módulo de menu
import login from '../modules/login/index.js'; //importa o módulo de login
import cadastro from '../modules/cadastro/index.js'; //importa o módulo de cadastro
import contato from '../modules/contato/index.js'; //importa o módulo de contato


describe('Automation Exercise com Xpath', () => {
    beforeEach(() => { //Laço de repetição que executa antes de cada it
        //cy.view('iphone-xr'); //Define o tamanho da visualização em tela
        cy.visit('https://automationexercise.com/'); //Acessa o site
        cy.xpath('//a[contains(text(),"Signup / Login")]').click(); // menu.navegarParaLogin()
    });

    it('Cadastrar um usuário', () => {
        // Arrange - Preparar o cenário
        // Preencher o Formulário de Pre-Cadastro
        login.preencherFormularioDePreCadastro(); //Chama o método preencherFormularioDePreCadastro do módulo de login
        
        //Act - Ação
        //Preencher o Formulário de Cadastro Completo
        cadastro.preencherFormularioDeCadastroCompleto(); //Chama o método preencherFormularioDeCadastroCompleto do módulo de cadastro

        // Assert - Validar o resultado, não precisa ser modularizado
        cy.url().should('include', '/account_created'); //Valida que a URL (rota) contém /account_created
        cy.xpath('//b[contains(text(),"Account Created!")]').should('be.visible'); });

    it('Login do usuário com e-mail e senha corretos', () => { 
        // 6. Insira o endereço de e-mail e a senha corretos.
        //name:QA Tester
        //email: qatester1766875828946@test.com
        //senha: teste1234
        login.preencherFormularioDeLogin(userData.user, userData.password); //Chama o método preencherFormularioDeLogin do módulo de login

        // Assert - Validar o resultado, não precisa ser modularizado
        cy.xpath('//i[@class="fa fa-user"]/parent::*').should('contain', 'QA Tester'); 
        cy.xpath('//a[@href="/logout"]').should('be.visible'); 
        cy.xpath('(//li)[10]/a').should('be.visible').and('contain.text', 'Logged in as QA Tester'); 
        cy.xpath(`//b[contains(text(),"${userData.name}")]`).should('be.visible'); 
    });


    it('Login do usuário com e-mail e senha incorretos', () => { 
        // 6. Insira um endereço de e-mail e senha incorretos.
        //name correto:QA Tester
        //email correto: qatester@test.com
        //senha correto: teste1234
        login.preencherFormularioDeLogin(userData.user, '54321'); //Chama o método preencherFormularioDeLogin do módulo de login

        //Assert - Validar o resultado, não precisa ser modularizado
        cy.xpath('//p[contains(text(),"Your email or password is incorrect!")]').should('be.visible');
    });


    it('Fazer logout do usuário', () => { 
        //Arrange - Preparar o cenário
        // Insira o endereço de e-mail e a senha corretos.
        //name:QA Tester
        //email: qatester1766875828946@test.com
        //senha: teste1234
        login.preencherFormularioDeLogin(userData.user, userData.password); //Chama o método preencherFormularioDeLogin do módulo de login

        // Act - Executar a ação
        cy.xpath('//a[@href="/logout"]').click(); // menu.efetuarLogout()

        // Assert - Validar o resultado, não precisa ser modularizado
        cy.url().should('include', '/login'); 
        cy.xpath('//h2[contains(text(),"Login to your account")]').should('be.visible'); 
        cy.xpath('//a[@href="/logout"]').should('not.exist'); 
        cy.xpath('//a[@href="/login"]').should('contain', 'Signup / Login');
    });
 

    it('Cadastrar usuário com e-mail existente', () => {

        // 6. Insira o nome e o endereço de e-mail já cadastrado.
        //name: QA Tester
        //email: qatester1766875828946@test.com
        //senha: teste1234
        login.preencherComEmailExistente('QA Tester', 'qatester@test.com');

        // Assert - Validar o resultado, não precisa ser modularizado
        cy.xpath('//p[contains(text(),"Email Address already exist!")]').should('be.visible');
    });

    
    it('Enviar um Formulário de Contato com Upload do Arquivo', () => { //Caso de teste
        // Arrange - Preparar o cenário
        cy.xpath('//a[contains(text(),"Contact us")]').click(); // menu.contactUs()
        
        //Preenhe o formulário de contato com as informações do arquivo contactus.json
        contato.preencherFormularioDeContato(userData);
 
        //Upload de arquivo
        contato.fazerUploadDeArquivo('example.json');       

        // Assert - Validar o resultado
        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    });
});
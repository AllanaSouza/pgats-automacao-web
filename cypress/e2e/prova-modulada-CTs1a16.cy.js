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
import produtos from '../modules/produtos/index.js';
import carrinho from '../modules/carrinho/index.js';


describe('Automation Exercise', () => {
    beforeEach(() => { //Laço de repetição que executa antes de cada it
        cy.visit('https://automationexercise.com/'); //Acessa o site
        menu.navegarParaLogin(); //Clica no botão de login a partir do módulo de menu
    });

    //CT 1 - Cadastrar Usuário
    it('Cadastrar um usuário', () => {
        // Arrange - Preparar o cenário
        // Preencher o Formulário de Pre-Cadastro
        login.preencherFormularioDePreCadastro(); //Chama o método preencherFormularioDePreCadastro do módulo de login
        
        //Act - Ação
        //Preencher o Formulário de Cadastro Completo
        cadastro.preencherFormularioDeCadastroCompleto(); //Chama o método preencherFormularioDeCadastroCompleto do módulo de cadastro

        // Assert - Validar o resultado, não precisa ser modularizado
        cy.url().should('include', '/account_created'); //Valida que a URL (rota) contém /account_created
        cy.contains('b', 'Account Created!'); //Valida que o texto (componente) ACCOUNT CREATED! está visível
    });


    //CT2 - Login e senha corretos
    it('Login do usuário com e-mail e senha corretos', () => { 

        // 6. Insira o endereço de e-mail e a senha corretos.
        //name:QA Tester
        //email: qatester1766875828946@test.com
        //senha: teste1234
        login.preencherFormularioDeLogin(userData.user, userData.password); //Chama o método preencherFormularioDeLogin do módulo de login

        // Assert - Validar o resultado, não precisa ser modularizado
        cy.get('i.fa-user').parent().should('contain', 'QA Tester'); //Valida que o nome do usuário está visível
        cy.get('a[href="/logout"]').should('be.visible'); //Valida que o botão de logout está visível

        cy.get(':nth-child(10) >a') //Seletor do elemento Logged in as QA Tester
        .should('be.visible')
        .and('contain.text', 'Logged in as QA Tester'); //Valida que o elemento está visível

        cy.contains('b', userData.name) //Valida que o nome do usuário está visível
        cy.contains('Logged in as ' + userData.name).should('be.visible'); //Valida que o elemento está visível
    });


    //CT3 - Login e senha Incorretos
    it('Login do usuário com e-mail e senha incorretos', () => { 

        // 6. Insira um endereço de e-mail e senha incorretos.
        //name correto:QA Tester
        //email correto: qatester@test.com
        //senha correto: teste1234
        login.preencherFormularioDeLogin(userData.user, '54321'); //Chama o método preencherFormularioDeLogin do módulo de login

        //Assert - Validar o resultado, não precisa ser modularizado
       cy.contains('p', 'Your email or password is incorrect!').should('be.visible'); //Valida que a mensagem de erro está visível
    });


    //CT4 - Logout
    it('Fazer logout do usuário', () => { 

        //Arrange - Preparar o cenário
        // Insira o endereço de e-mail e a senha corretos.
        //name:QA Tester
        //email: qatester1766875828946@test.com
        //senha: teste1234
        login.preencherFormularioDeLogin(userData.user, userData.password); //Chama o método preencherFormularioDeLogin do módulo de login

        // Act - Executar a ação
        menu.efetuarLogout(); //Clica no botão de logout a partir do módulo de menu

        // Assert - Validar o resultado, não precisa ser modularizado
        cy.url().should('include', '/login');
        cy.contains('Login to your account'); //Valida que o texto (componente) Login to your account está visível
        cy.get('a[href="/logout"]').should('not.exist'); //Valida que o botão de logout não está mais visível
        cy.get('a[href="/login"]').should('contain', 'Signup / Login'); //Valida que o botão de login está visível

    });
 

    //CT5 - Cadastrar usuário que já existe
    it('Cadastrar usuário com e-mail existente', () => {

        // 6. Insira o nome e o endereço de e-mail já cadastrado.
        //name: QA Tester
        //email: qatester1766875828946@test.com
        //senha: teste1234
        login.preencherComEmailExistente('QA Tester', 'qatester@test.com');

        // Assert - Validar o resultado, não precisa ser modularizado
        cy.contains('p', 'Email Address already exist!').should('be.visible');
    });

    
    //CT6 - Formularío de Contato
    it('Enviar um Formulário de Contato com Upload do Arquivo', () => { //Caso de teste
        // Arrange - Preparar o cenário
        menu.contactUs(); 
        
        //Preenhe o formulário de contato com as informações do arquivo contactus.json
        contato.preencherFormularioDeContato(userData);
 
        //Upload de arquivo
        contato.fazerUploadDeArquivo('example.json');       

        // Assert - Validar o resultado
        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    });
  
    //CT8 - Verificar todos os produtos e a página de detalhes do produtos
        it('Verificar página de produtos', () => { //Caso de teste
        // Arrange - Preparar o cenário
        menu.navegarParaProdutos(); 
        
        //Atc - Clique em 'Ver Produto' no primeiro produto.
        produtos.clicaViewProducts();     

        // Assert - Verifica  se está  na  página correta
        cy.url().should('include',  '/product_details/1'); 
        //  Nome do  produto
        cy.contains('Blue Top').should('be.visible');
        //  Categoria
        cy.contains('Category').should('be.visible');
        //  Preço
        cy.contains('Rs. 500').should('be.visible');
        // Disponibilidade
        cy.contains('Availability').should('be.visible');
        // Condição
        cy.contains('Condition').should('be.visible');
        // Marca
        cy.contains('Brand').should('be.visible');
    });


     //CT9 - Pesquisar produto
        it('Pesquisar produto', () => { //Caso de teste
        // Arrange - Preparar o cenário
        menu.navegarParaProdutos(); 
        
        //Atc - Digite o nome do produto no campo de pesquisa e clique no botão de pesquisa.
        produtos.PesquisarProduto();    

        // Assert - Verifique se a seção 'PRODUTOS PESQUISADOS' está visível.
        // Verifique se todos os produtos relacionados à pesquisa estão visíveis.
        cy.get('h2.title.text-center').should('contain.text', 'Searched Products'); 
        //  Nome do  produto
        cy.contains('Blue Top').should('be.visible');
    });


    //CT10 - Verificar assinatura na página inicial
        it('Verificar assinatura na página inicial', () => { //Caso de teste
        // Arrange - Preparar o cenário
        menu.navegarParaSubscription();

        // Assert - Verifique se a mensagem de sucesso "Você se inscreveu com sucesso!" está visível.
        cy.contains('You have been successfully subscribed!').should('be.visible');
    });


    //CT15 - Fazer pedido: Registre-se antes de finalizar a compra
        it('Cadastrar e Finalizar Pedido', () => { //Caso de teste
        // Arrange
        login.preencherFormularioDePreCadastro(); //Chama o método preencherFormularioDePreCadastro do módulo de login
        
        //Act
        //Preencher o Formulário de Cadastro Completo
        cadastro.preencherFormularioDeCadastroCompleto();

        //Clica em Continuar após fazer o cadastro
        cadastro.clicaEmContinue();

        //Adiciona produtos no carrinho
        produtos.adicionarProdutosNoCarrinho();

        //Ir para o carrinho
        produtos.navegarParaCarrinho();

        //Chekout
        carrinho.navegarParaCheckout();
        carrinho.fazerCheckout();

        // Assert - Mensagem de sucesso
        cy.contains('Pay and Confirm Order').click();
        cy.contains('Congratulations!', { timeout: 10000 }).should('be.visible');
    });


    //CT16 - Logar e fazer pedido
        it.only('Logar e Finalizar Pedido', () => { //Caso de teste
        // Arrange - Fazer login
        login.preencherFormularioDeLogin(userData.user, userData.password); 
        
        //Adiciona produtos no carrinho
        produtos.adicionarProdutosNoCarrinho();

        //Ir para o carrinho
        produtos.navegarParaCarrinho();

        //Chekout
        carrinho.navegarParaCheckout();
        carrinho.fazerCheckout();

        // Assert - Mensagem de sucesso
        cy.contains('Pay and Confirm Order').click();
        cy.contains('Congratulations!', { timeout: 10000 }).should('be.visible');
    });

});
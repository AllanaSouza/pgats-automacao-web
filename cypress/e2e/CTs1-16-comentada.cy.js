import { faker } from "@faker-js/faker";

    describe('handson6-CTs8-16', () => {
        beforeEach(() => {
        // 1. Inicie o navegador
        // 2. Acesse o endereço URL 'http://automationexercise.com'
        // 3. Verifique se a página inicial está visível corretamente.
        cy.visit('https://automationexercise.com/');

        // 4. Clique no botão 'Cadastrar-se / Entrar'.
        // 5. Verifique se a mensagem "Novo usuário se cadastrando!" está visível.
        cy.get('a[href="/login"]').click();
        });

    // Test Case 1: Caso de teste 1: Cadastrar usuário
    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime(); //Gera numeros aleatórios para garantir email único

        // 6. Insira o nome e o endereço de e-mail.
        cy.get('input[data-qa="signup-name"]').type('QA Tester');
        cy.get('input[data-qa="signup-email"]').type('qatester' + timestamp + '@test.com');

        // 7. Clique no botão 'Cadastrar'
        // 8. Verifique se 'INSERIR INFORMAÇÕES DA CONTA' está visível.
        cy.get('button[data-qa="signup-button"]').click();

        // 9. Preencha os detalhes: Título, Nome, E-mail, Senha, Data de nascimento
        cy.get('input#id_gender1').check(); 
        cy.get('input#password').type('teste1234', {log: false});
        cy.get('select[data-qa=days]').select('10');
        cy.get('select[data-qa=months]').select('May');
        cy.get('select[data-qa=years]').select('1990');

        // 10. Selecione a caixa de seleção "Inscreva-se em nossa newsletter!"
        cy.get('input[type=checkbox]#newsletter').check();

        // 11. Selecione a caixa de seleção "Receber ofertas especiais dos nossos parceiros!"
        cy.get('input[type=checkbox]#optin').check();

        // 12. Preencha os detalhes: Nome, Sobrenome, Empresa, Endereço, Endereço 2, País, Estado, Cidade, CEP, Número de celular
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

        // 13. Clique no botão 'Criar conta'.
        cy.get('[data-qa="create-account"]').click();

        // 14. Verifique se a mensagem "CONTA CRIADA!" está visível.
        cy.url().should('include', '/account_created');
        cy.contains('b', 'Account Created!');
    });


    // Test Case 2: Login do usuário com e-mail e senha corretos
    it('Login do usuário com e-mail e senha corretos', () => { 

        // 6. Insira o endereço de e-mail e a senha corretos.
        //name:QA Tester
        //email: qatester1766875828946@test.com
        //senha: teste1234
        cy.get('[data-qa="login-email"]').type('qatester1768351954831@test.com');
        cy.get('[data-qa="login-password"]').type('teste1234');

        // 7. Clique no botão 'entrar'
        //Seletor: data-qa="login-button"
        cy.get('[data-qa="login-button"]').click();

        // 8. Verifique se a mensagem "Logged in as [nome de usuário]" está visível.
        // Seletor: "Logged in as QA Tester"
        cy.get('i.fa-user').parent().should('contain', 'QA Tester');
        cy.get('a[href="/logout"]').should('be.visible');
        cy.contains('b', 'QA Tester').should('be.visible');
    });


    // Test Case 3: Login do usuário com e-mail e senha incorretos
    it('Login do usuário com e-mail e senha incorretos', () => { 

        // 6. Insira um endereço de e-mail e senha incorretos.
        //name correto:QA Tester
        //email correto: qatester@test.com
        //senha correto: teste1234
        cy.get('[data-qa="login-email"]').type('qatester@test.com');
        cy.get('[data-qa="login-password"]').type('teste');

        // 7. Clique no botão 'entrar'
        //Seletor: data-qa="login-button"
        cy.get('[data-qa="login-button"]').click();

        // 8. Verifique se a mensagem de erro "Seu e-mail ou senha está incorreto!" está visível.
        // Seletor: Your email or password is incorrect!
       cy.contains('p', 'Your email or password is incorrect!').should('be.visible');
    });


// Test Case 4: Fazer logout do usuário
    it('Fazer logout do usuário', () => { 

        // 6. Insira o endereço de e-mail e a senha corretos.
        //name:QA Tester
        //email: qatester1766875828946@test.com
        //senha: teste1234
        cy.get('[data-qa="login-email"]').type('qatester1768351954831@test.com');
        cy.get('[data-qa="login-password"]').type('teste1234');

        // 7. Clique no botão 'entrar'
        //Seletor: data-qa="login-button"
        cy.get('[data-qa="login-button"]').click();

        // 8. Verifique se a mensagem "Logged in as [nome de usuário]" está visível.
        // Seletor: "Logged in as QA Tester"
       cy.contains('b', 'QA Tester').should('be.visible');

        // 9. Clique no botão 'Sair'
        // Seletor: a[href="/logout"]
        cy.get('a[href="/logout"]').click();

        // 10. Verifique se o usuário foi redirecionado para a página de login.
        cy.url().should('include', '/login');

    });

    
 // Test Case 5: Cadastrar usuário com e-mail existente   
    it('Cadastrar usuário com e-mail existente', () => {

        // 6. Insira o nome e o endereço de e-mail já cadastrado.
        //name: QA Tester
        //email: qatester1766875828946@test.com
        //senha: teste1234
        cy.get('input[data-qa="signup-name"]').type('QA Tester');
        cy.get('input[data-qa="signup-email"]').type('qatester@test.com');

        // 7. Clique no botão 'Cadastrar'
        cy.get('button[data-qa="signup-button"]').click();

        // 8. Verifique se o erro "O endereço de e-mail já existe!" está visível.
        // Nome existente: QA Tester
        // Email existente: qatester@test.com
        // Seletor: Email Address already exist!
        cy.contains('p', 'Email Address already exist!').should('be.visible');
    });
  

    //CT6 - Upload de arquivo
     it('Enviar um Formulário de Contato com Upload do Arquivo', () => { //Caso de teste
        
        // Arrange - Preparar o cenário
        cy.get('a[href="/contact_us"]').click(); //Clica no botão Contact Us

        //Preenhe o formulário de contato com as informações do arquivo contactus.json
        cy.get('[data-qa="name"]').type('QA Tester');
        cy.get('[data-qa="email"]').type('qatester1766875828946@test.com');
        cy.get('[data-qa="subject"]').type('Fixtures are a great way to mock data for responses to routes');
        cy.get('[data-qa="message"]').type('Estou enviando uma mensagem de teste usando dados do arquivo contactus.json');
 
        //Upload de arquivo
        cy.fixture('example.json').as('arquivoParaUpload'); //Carrega o arquivo de fixture e atribui a um alias
        cy.get('input[type=file]').selectFile('@arquivoParaUpload'); //Faz o upload do arquivo usando o alias
        cy.get('[data-qa="submit-button"]').click();

        // Assert - Validar o resultado
        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    });


// Caso de teste 8: Verificar todos os produtos e a página de detalhes do produto
    it('Verificar todos os produtos e a página de detalhes do produto', () => {
        // 1. Inicie o navegador
        // 2. Acesse o endereço URL 'http://automationexercise.com'
        // 3. Verifique se a página inicial está visível corretamente.
        cy.visit('https://automationexercise.com/');

        // 4. Clique no botão 'Produtos'.
        // 5. Verifique se o usuário foi direcionado com sucesso para a página TODOS OS PRODUTOS.
        cy.get('a[href="/products"]').click();

        //6. A lista de produtos está visível.
        //7. Clique em 'Ver Produto' no primeiro produto.
        cy.get('a[href="/product_details/1"]').click();

        //8. O usuário é direcionado para a página de detalhes do produto.
        //9. Verifique se todos os detalhes estão visíveis: nome do produto, categoria, preço, disponibilidade, condição e marca. */
        //  Verifica  se está  na  página correta
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

//Caso de teste 9: Pesquisar produto
    it('Verificar todos os produtos e a página de detalhes do produto', () => {
        // 1. Inicie o navegador
        // 2. Acesse o endereço URL 'http://automationexercise.com'
        // 3. Verifique se a página inicial está visível corretamente.
        cy.visit('https://automationexercise.com/');

        // 4. Clique no botão 'Produtos'.
        // 5. Verifique se o usuário foi direcionado com sucesso para a página TODOS OS PRODUTOS.
        cy.get('a[href="/products"]').click();

        //6. A lista de produtos está visível.
        //7. Clique em 'Ver Produto' no primeiro produto.
        cy.get('a[href="/product_details/1"]').click();

        //6. Digite o nome do produto no campo de pesquisa e clique no botão de pesquisa.
        cy.get('#search_product').type('Blue Top');
        cy.get('#submit_search').click();

        //7. Verifique se a seção 'PRODUTOS PESQUISADOS' está visível.
        //8. Verifique se todos os produtos relacionados à pesquisa estão visíveis.
        cy.url().should('include',  '/products?search=Blue%20Top'); 
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

//Caso de teste 10: Verificar assinatura na página inicial
    it('Verificar todos os produtos e a página de detalhes do produto', () => {
        // 1. Inicie o navegador
        // 2. Acesse o endereço URL 'http://automationexercise.com'
        // 3. Verifique se a página inicial está visível corretamente.
        cy.visit('https://automationexercise.com/');

        //4. Role para baixo até o rodapé.
        cy.scrollTo('bottom');

        //5. Verifique o texto 'ASSINATURA'
        cy.contains('Subscription').should('be.visible');

        //6. Insira o endereço de e-mail no campo de entrada e clique no botão de seta.
        cy.contains('Subscription') 
        .parent() 
        .find('input[type="email"]') 
        .type('teste@email.com');
        cy.get('button[type="submit"]').click();

        //7. Verifique se a mensagem de sucesso "Você se inscreveu com sucesso!" está visível.
        cy.contains('You have been successfully subscribed!').should('be.visible');
    });


    // Test Case 15: Fazer pedido - Registre-se antes de finalizar a compra
    it('Fazer pedido - Registre-se antes de finalizar a compra', () => {
        const timestamp = new Date().getTime(); //Gera numeros aleatórios para garantir email único

        // Insira o nome e o endereço de e-mail.
        cy.get('input[data-qa="signup-name"]').type('QA Tester');
        cy.get('input[data-qa="signup-email"]').type('qatester' + timestamp + '@test.com');

        // Clique no botão 'Cadastrar'
        // Verifique se 'INSERIR INFORMAÇÕES DA CONTA' está visível.
        cy.get('button[data-qa="signup-button"]').click();

        // Preencha os detalhes: Título, Nome, E-mail, Senha, Data de nascimento
        cy.get('input#id_gender1').check(); 
        cy.get('input#password').type('teste1234', {log: false});
        cy.get('select[data-qa=days]').select('10');
        cy.get('select[data-qa=months]').select('May');
        cy.get('select[data-qa=years]').select('1990');

        // elecione a caixa de seleção "Inscreva-se em nossa newsletter!"
        cy.get('input[type=checkbox]#newsletter').check();

        // Selecione a caixa de seleção "Receber ofertas especiais dos nossos parceiros!"
        cy.get('input[type=checkbox]#optin').check();

        // Preencha os detalhes: Nome, Sobrenome, Empresa, Endereço, Endereço 2, País, Estado, Cidade, CEP, Número de celular
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

        // Clique no botão 'Criar conta'.
        cy.get('[data-qa="create-account"]').click();

        // Adicionar produto ao carrinho 
        cy.contains('Products').click(); 
        cy.get('[data-product-id="1"]').click({ multiple: true, force: true });
        cy.contains('Continue Shopping').click();

        // Ir para o carrinho 
        cy.get('#cartModal', { timeout: 10000 }).should('not.be.visible'); 
        cy.contains('Cart').click({ force: true });

        // Finalizar compra 
        cy.contains('Proceed To Checkout').click();

        // 12. Verificar endereço e pedido 
        cy.contains('Address Details').should('be.visible'); 
        cy.contains('Review Your Order').should('be.visible');

        // Comentário e fazer pedido 
        cy.get('textarea[name="message"]').type('Pedido de teste automatizado.'); 
        cy.contains('Place Order').click();

        // Dados de pagamento 
        cy.get('input[name="name_on_card"]').type('QA  Tester  2'); 
        cy.get('input[name="card_number"]').type('4111111111111111'); 
        cy.get('input[name="cvc"]').type('123'); 
        cy.get('input[name="expiry_month"]').type('12'); 
        cy.get('input[name="expiry_year"]').type('2026');

        // Confirmar pedido 
        cy.contains('Pay and Confirm Order').click();

        // Verificar sucesso 
        cy.contains('Congratulations!', { timeout: 10000 }).should('be.visible');

        // 17-18. Excluir conta 
/*         cy.contains('Delete Account').click(); 
        cy.contains('Account Deleted!').should('be.visible'); 
        cy.get('[data-qa="continue-button"]').click(); */
    });


   //CT16  -  Fazer pedido  com  login antes  da  compra
   it('Deve  fazer  pedido  com login  e  excluir  conta', ()  =>  {
        cy.get('[data-qa="login-email"]').type('qatester1768351954831@test.com');
        cy.get('[data-qa="login-password"]').type('teste1234');

        // 7. Clique no botão 'entrar'
        //Seletor: data-qa="login-button"
        cy.get('[data-qa="login-button"]').click();


        // Verifique se a mensagem "Logged in as [nome de usuário]" está visível.
        // Seletor: "Logged in as QA Tester"
        cy.get('i.fa-user').parent().should('contain', 'QA Tester');
        cy.get('a[href="/logout"]').should('be.visible');
        cy.contains('b', 'QA Tester').should('be.visible');

        cy.contains('Products').click(); 
        cy.get('[data-product-id="1"]').click({ multiple: true, force: true });
        cy.contains('Continue Shopping').click();

        // Adicionar produto ao carrinho 
        cy.contains('Products').click(); 
        cy.get('[data-product-id="1"]').click({ multiple: true, force: true });
        cy.contains('Continue Shopping').click();

        // Ir para o carrinho 
        cy.get('#cartModal', { timeout: 10000 }).should('not.be.visible'); 
        cy.contains('Cart').click({ force: true });

        // Finalizar compra 
        cy.contains('Proceed To Checkout').click();

        // 12. Verificar endereço e pedido 
        cy.contains('Address Details').should('be.visible'); 
        cy.contains('Review Your Order').should('be.visible');

        // Comentário e fazer pedido 
        cy.get('textarea[name="message"]').type('Pedido de teste automatizado.'); 
        cy.contains('Place Order').click();

        // Dados de pagamento 
        cy.get('input[name="name_on_card"]').type('QA  Tester  2'); 
        cy.get('input[name="card_number"]').type('4111111111111111'); 
        cy.get('input[name="cvc"]').type('123'); 
        cy.get('input[name="expiry_month"]').type('12'); 
        cy.get('input[name="expiry_year"]').type('2026');

        // Confirmar pedido 
        cy.contains('Pay and Confirm Order').click();

        // Verificar sucesso 
        cy.contains('Congratulations!', { timeout: 10000 }).should('be.visible');

        // Excluir conta 
/*         cy.contains('Delete Account').click(); 
        cy.contains('Account Deleted!').should('be.visible'); 
        cy.get('[data-qa="continue-button"]').click(); */
   });
});
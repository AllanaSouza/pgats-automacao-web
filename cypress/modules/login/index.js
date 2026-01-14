import { faker } from '@faker-js/faker'; //importa a biblioteca faker para geração de dados aleatórios
import { getRandomEmail } from '../../support/helpers.js'; //importa a função getRandomEmail do arquivo helpers.js


class Login { //Define a classe Login
    //CT1
    preencherFormularioDePreCadastro(){ //Define o método preencherFormularioDePreCadastro
        const firstName = faker.person.firstName(); //Gera um primeiro nome aleatório
        const lastName = faker.person.lastName(); //Gera um sobrenome aleatório

        cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`); //Preenche o nome
        cy.get('[data-qa="signup-email"]').type(getRandomEmail()); //Preenche com dados dinamicos
        
        cy.contains('button', 'Signup').click(); //Clica no botão de cadastro
    } //fim do método preencherFormularioDePreCadastro

    //CT2
    preencherFormularioDeLogin(user,pass) { //Define o método preencherFormularioDeLogin
        cy.get('[data-qa="login-email"]').type(user);
        cy.get('[data-qa="login-password"]').type(pass);

        cy.get('[data-qa="login-button"]').click();
    } //fim do método preencherFormularioDeLogin

    preencherComEmailExistente(name, email) { //Define o método preencherComEmailExistente
        cy.get('input[data-qa="signup-name"]').type('QA Tester');
        cy.get('input[data-qa="signup-email"]').type('qatester_Kassulke@hotmail.com');

        cy.get('button[data-qa="signup-button"]').click();
    } //fim do método preencherComEmailExistente
} //fim da classe Login

export default new Login(); //Exporta uma nova instância da classe Login
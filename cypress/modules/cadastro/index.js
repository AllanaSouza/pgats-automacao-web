import { faker } from '@faker-js/faker'; //importa a biblioteca faker para geração de dados aleatórios

class Cadastro { //Define a classe Cadastro
    preencherFormularioDeCadastroCompleto() { //Define o método preencherFormularioDeCadastroCompleto
                //Preencher o Formulário de Cadastro Completo
        cy.get('#id_gender1').check(); //Comando para radio buttons ou checkboxes
        cy.get('input#password').type('teste1234', { log: false }); //Preenche a senha e esconde ela

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
    } //fim do método preencherFormularioDeCadastroCompleto


    clicaEmContinue() {
        // Act - Executar a ação
        cy.get('[data-qa="continue-button"]').click(); //Clica no botão Continue
    }
}

export default new Cadastro(); //Exporta uma nova instância da classe Cadastro

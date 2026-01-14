import { faker } from "@faker-js/faker"; //importa a biblioteca faker para geração de dados aleatórios
import { getRandomEmail } from "../../support/helpers";

//a partir do menu estou navegando para o login
class Menu { //Define a classe Menu
    navegarParaLogin() { //Define o método navegarParaLogin
        cy.get('a[href="/login"]').click(); //Clica no botão de login
    }

    efetuarLogout() { //Define o método efetuarLogout
        cy.get('a[href="/logout"]').click(); //Clica no botão de logout
    }

    contactUs() { //Define o método contactUs
         cy.get('a[href="/contact_us"]').click(); //Clica no botão Contact Us
    }

    navegarParaProdutos() {
        cy.get('a[href="/products"]').click(); //Clica no botão Produtos
    }

    navegarParaSubscription() {
        //Role para baixo até o rodapé.
        cy.scrollTo('bottom');
        cy.get('#susbscribe_email').type(getRandomEmail());
        cy.get('#subscribe').click();
    }
}

export default new Menu(); //Exporta uma nova instância da classe Menu
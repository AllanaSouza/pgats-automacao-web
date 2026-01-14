import { faker } from '@faker-js/faker'; //importa a biblioteca faker para geração de dados aleatórios

class Contato {
    preencherFormularioDeContato(userData) { //Define o método preencherFormularioDeContato que recebe userData como parâmetro
    cy.get('[data-qa="name"]').type(userData.name);
    cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="subject"]').type(userData.subject);
    cy.get('[data-qa="message"]').type(userData.message);
    }

    fazerUploadDeArquivo(filePath) { //Define o método uploadArquivo que recebe filePath como parâmetro
        cy.fixture('example.json').as('arquivoParaUpload'); //Carrega o arquivo de fixture e atribui a um alias
        cy.get('input[type=file]').selectFile('@arquivoParaUpload'); //Faz o upload do arquivo usando o alias
        cy.get('[data-qa="submit-button"]').click();
    }
}

export default new Contato(); //Exporta uma nova instância da classe Contato
import { faker } from "@faker-js/faker";

class Produts {

    clicaViewProducts(){
        cy.get('a[href="/product_details/1"]').click();
    }

    PesquisarProduto(){
        cy.get('#search_product').type('Blue Top');
        cy.get('#submit_search').click();
    }

    navegarParaCarrinho(){
        cy.get('#cartModal', { timeout: 10000 }).should('not.be.visible'); 
        cy.contains('Cart').click({ force: true });
    }

    adicionarProdutosNoCarrinho(){
        cy.get('[data-product-id="1"]').click({ multiple: true, force: true });
        cy.contains('Continue Shopping').click();
    }

}


export default new Produts();
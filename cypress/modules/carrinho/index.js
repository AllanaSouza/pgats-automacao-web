class Carrinho {
    navegarParaCheckout() {
         cy.contains('Proceed To Checkout').click();
    }

    fazerCheckout(){
        //Verificar endereço e pedido 
        cy.contains('Address Details').should('be.visible'); 
        cy.contains('Review Your Order').should('be.visible');

        // Comentário e fazer pedido 
        cy.get('textarea[name="message"]').type('Pedido de teste automatizado.'); 
        cy.contains('Place Order').click();

        // 14. Dados de pagamento 
        cy.get('input[name="name_on_card"]').type('QA  Tester  2'); 
        cy.get('input[name="card_number"]').type('4111111111111111'); 
        cy.get('input[name="cvc"]').type('123'); 
        cy.get('input[name="expiry_month"]').type('12'); 
        cy.get('input[name="expiry_year"]').type('2026');





    }
}

export default new Carrinho();
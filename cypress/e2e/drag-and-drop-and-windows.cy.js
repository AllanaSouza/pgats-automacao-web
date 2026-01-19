describe('Drag and Drop and Windows', () => {
    it('Multiple Windows', () => {
        cy.visit('https://the-internet.herokuapp.com/windows');

        cy.get('a[href="/windows/new"]')
        .invoke('removeAttr', 'target') 
        .click();

        cy.get('h3').should('have.text', 'New Window')

    });


    it.only('Darg and Drop', () => {
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop');

        const dataTransfer = new DataTransfer()

        cy.contains('A').trigger('dragstart', { dataTransfer })
        cy.contains('B').trigger('drop', { dataTransfer })

    });
    
});
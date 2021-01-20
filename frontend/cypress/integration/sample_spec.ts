describe('App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });
    it('should render 20 initally fetched products', () => {
        cy.get('.App a').should('have.length', 3);
    });
});

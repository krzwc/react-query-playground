describe('App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });
    it('should render 3 links to predefined products', () => {
        cy.get('#app a').should('have.length', 3);
    });
});

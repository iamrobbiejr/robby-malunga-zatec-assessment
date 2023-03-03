describe('homepage', () => {
    it('user can view album, genres and songs', () => {
        //     open application
        cy.visit('http://127.0.0.1:5173')
        //     navigate tabs
        cy.wait(3000);
        cy.findByRole('tab', {name: /genres/i}).click()
        cy.wait(3000);
        cy.findByRole('tab', {name: /songs/i}).click({force: true})
        cy.wait(3000);
        cy.findByRole('tab', {name: /albums/i}).click({force: true})

    })
})

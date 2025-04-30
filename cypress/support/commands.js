Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, { log: false })
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('checkout', (logradouro, complemento, cidade, cep, telefone) => {
    cy.get('#billing_address_1').clear().type(logradouro)
    cy.get('#billing_address_2').clear().type(complemento)
    cy.get('#billing_city').clear().type(cidade)
    cy.get('#billing_postcode').clear().type(cep)
    cy.get('#billing_phone').clear().type(telefone)
    cy.get('[class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"]').check()
    cy.get('[class="btn btn-primary btn-outline alt"]').click()

});
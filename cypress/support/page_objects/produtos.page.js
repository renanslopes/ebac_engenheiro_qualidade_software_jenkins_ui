class Produtos {

    produtos_lote(qtd_produtos) {
        for (let i = 0; i < qtd_produtos; i++) {
            cy.get('[class="product-block grid"]').eq(i).click()
            cy.get('[role="radio"]').eq(0).click()
            cy.get('[role="radio"]').last().click()
            cy.get('[class="plus"]').click()
            cy.get('[class="single_add_to_cart_button button alt"]').click()
            cy.get('[class="product_title entry-title"]').invoke('text').then((productName) => {
                cy.get('[class="woocommerce-message"]').should('contain', productName)
            })

        }
    }

}

export default new Produtos()
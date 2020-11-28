describe('Adding a product to an order', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/auth',
      response: "fixtures:successfull_sign_up.json",
      headers: {
        uid: 'thomas@craft.com',
        access_token: 'whatever',
        client: '12345',
        token_type: "Bearer",
        expiry: 1699999
      }
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/products',
      response: 'fixtures:product.json'
    })

    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/orders',
      response: 'fixtures:first_product_added_to_order.json'
    })
    cy.visit('/')
    cy.get('[data-cy="register-cta"]').click()
    cy.get('[data-cy="email"]').type('thomas@craft.com', {force: true})
    cy.get('[data-cy="password"]').type('password', {force: true})
    cy.get('[data-cy="password-confirmation"]').type('password', {force: true})
    cy.get('[data-cy="register"]').click({force: true})

  });
  it('', () => {
    cy.get('[data-cy="product-1"]').within(()=>{
      cy.get('button').click()
    })
    cy.get('[data-cy="message"]').should('contain', 'Product was successfully added to your order')
    cy.get('[data-cy="order-items-count"]').should('contain', 'You have 1 item in your order')
  });
});
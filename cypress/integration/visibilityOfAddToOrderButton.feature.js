describe("Add to Order button", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth",
      response: "fixture:successfull_sign_up.json",
      headers: {
        uid: "thomas@craft.com",
        access_token: "accesstoken",
        client: "12345",
        token_type: "Bearer",
        expiry: 1699999,
      },
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/products",
      response: "fixture:products.json",
    });
    cy.visit("/");
  });

  describe("when user is NOT authenticated", () => {
    it("is expected to be hidden", () => {
      cy.get('[data-cy="product-1"]').within(() => {
        cy.get("button").should("not.be.visible");
      });
    });
  });

  describe("when user is authenticated", () => {
    beforeEach(() => {
      cy.get('[data-cy="register-cta"]').click();
      cy.get('[data-cy="email"]').type("thomas@craft.com");
      cy.get('[data-cy="password"]').type("password");
      cy.get('[data-cy="password-confirmation"]').type("password");
      cy.get('[data-cy="register"]').click();
    });

    it("is expected to be VISIBLE", () => {
      cy.get('[data-cy="product-1"]').within(() => {
        cy.get("button").should("be.visible");
      });
    });
  });
});

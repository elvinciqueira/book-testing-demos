describe("page render", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.injectAxe();
  });

  it("focuses on the wrapper when you click on the button toggle", () => {
    cy.get("#color-scheme")
      .click()
      .focused()
      .should("have.id", "radio-wrapper");
  });

  it("should have proper contrast", () => {
    cy.checkA11y("body", {
      runOnly: ["cat.color"],
    });
  });
});

describe("page render", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.injectAxe();
  });

  it("should have proper contrast", () => {
    cy.checkA11y("body", {
      runOnly: ["cat.color"],
    });
  });
});

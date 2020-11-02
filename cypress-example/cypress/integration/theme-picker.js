describe("user color scheme preferences", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("changes and maintains the color scheme on user preferences", () => {
    cy.get("#light")
      .click()
      .get("body")
      .should("have.css", "background-color", "rgb(255, 255, 255)")
      .reload()
      .get("body")
      .should("have.css", "background-color", "rgb(255, 255, 255)");
  });
});

describe("user color scheme preferences", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("changes and maintains the color scheme on user preferences", () => {
    cy.get("#light").click();
    cy.get("body").should("have.css", "background-color", "rgb(255, 255, 255)");
    cy.reload();
    cy.get("body").should("have.css", "background-color", "rgb(255, 255, 255)");
  });
});

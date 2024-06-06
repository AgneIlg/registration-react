describe("Registration form visibility", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("displays the form with empty fields", () => {
    cy.contains("label", "Username:").should("be.visible");
    cy.get('[name="username"]').should("be.visible").and("have.value", "");

    cy.contains("label", "Email:").should("be.visible");
    cy.get('[name="email"]').should("be.visible").and("have.value", "");

    cy.contains("label", "Password:").should("be.visible");
    cy.get('[name="password"]').should("be.visible").and("have.value", "");

    cy.contains("label", "Date of Birth:").should("be.visible");
    cy.get('[name="dob"]').should("be.visible").and("have.value", "");
  });

  it("displays submit button; submit button is enabled", () => {
    cy.contains("button", /submit/i)
      .should("be.visible")
      .and("not.be.disabled");
  });
});


describe("Registration form correct data functionality", () => {

  it("User is able to fill registration form", () => {
    const username = 'jonasjonaitis';
    const email = 'jonasjonaitis@gmail.com';
    const password = 'password123';
    const dob = '1990-01-01';

    const expectedAge = '34';

    cy.visit('http://localhost:5173/');
    cy.get('[name="username"]').type(username);
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[name="dob"]').type(dob);
    // Presses the button
    cy.contains("button", /submit/i).click();

    cy.get('.submitted-info').should('be.visible');
    cy.get('.submitted-info').should('contain', `Username: ${username}`);
    cy.get('.submitted-info').should('contain', `Email: ${email}`);
    cy.get('.submitted-info').should('contain', `Date of Birth: ${dob}`);
    cy.get('.submitted-info').should('contain', `Age: ${expectedAge}`);

  });
});


describe('Registration form incorrect data functionality ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); // Adjust the URL to where your app is running
  });

  it('should display validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('contain', 'Username is required');
    cy.get('.error').should('contain', 'Email is required');
    cy.get('.error').should('contain', 'Password is required');
    cy.get('.error').should('contain', 'Date of Birth is required');
  });

  it('should display validation error for invalid email', () => {
    cy.get('input[name="email"]').type('invalidemail');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('contain', 'Email is invalid');
  });

  it('should display validation error for short password', () => {
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('contain', 'Password must be at least 6 characters');
  });

});
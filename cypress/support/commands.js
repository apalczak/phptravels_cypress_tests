// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("fillContactUsFormField", (xpathLocator, content) => {
    cy.get(xpathLocator).scrollIntoView().clear();
    if (content) cy.get(xpathLocator).type(content, { delay: 0 });
});

Cypress.Commands.add(
    "contactUsFormMessageCheck",
    (expectedAlertStyle, expectedMessage) => {
        cy.xpath('//div[@id="body-section"]//form/div[1]/div[1]')
            .should("have.class", expectedAlertStyle)
            .and("contain", expectedMessage);
    }
);

///<reference types="cypress"/>

describe("Contact Us form tests", () => {
    beforeEach(() => {
        cy.visit("/contact-us");
    });

    it("Submits Contact Us form with a proper data", () => {
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_name"]',
            "John Doe"
        ).should("have.attr", "required");
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_email"]',
            "test@test.com"
        );
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_subject"]',
            "New subject"
        ).should("have.attr", "required");
        cy.fillContactUsFormField(
            '#body-section form textarea[name="contact_message"]',
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        );
        cy.xpath(
            '//div[@id="message-contact"]/../..//*[@name="submit_contact"]'
        )
            .scrollIntoView()
            .click();
        cy.contactUsFormMessageCheck(
            "alert-success",
            "Message Sent Successfully"
        );
    });

    it("Submits Contact Us form with empty name field", () => {
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_name"]'
        ).should("have.attr", "required");
        cy.get('#body-section form input[name="contact_name"]:invalid').should(
            "have.length",
            1
        );
    });

    it("Submits Contact Us form with empty email field", () => {
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_name"]',
            "John Doe"
        ).should("have.attr", "required");
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_email"]'
        ).should("have.attr", "required");
        cy.get('#body-section form input[name="contact_email"]:invalid').should(
            "have.length",
            1
        );
    });

    it("Submits Contact Us form with invalid email address - improper domain", () => {
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_name"]',
            "John Doe"
        ).should("have.attr", "required");
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_email"]',
            "test@test"
        )
            .invoke("attr", "type")
            .should("eq", "email");
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_subject"]',
            "New subject"
        ).should("have.attr", "required");
        cy.fillContactUsFormField(
            '#body-section form textarea[name="contact_message"]',
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        );
        cy.xpath(
            '//div[@id="message-contact"]/../..//*[@name="submit_contact"]'
        )
            .scrollIntoView()
            .click();
        cy.contactUsFormMessageCheck(
            "alert-danger",
            "The Email field must contain a valid email address."
        );
    });

    it("Submits Contact Us form with empty subject field", () => {
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_name"]',
            "John Doe"
        ).should("have.attr", "required");
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_email"]',
            "test@test.com"
        );
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_subject"]'
        ).should("have.attr", "required");
        cy.get(
            '#body-section form input[name="contact_subject"]:invalid'
        ).should("have.length", 1);
    });

    it("Submits Contact Us form with empty message text field", () => {
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_name"]',
            "John Doe"
        ).should("have.attr", "required");
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_email"]',
            "test@test.com"
        );
        cy.fillContactUsFormField(
            '#body-section form input[name="contact_subject"]',
            "New subject"
        ).should("have.attr", "required");
        cy.fillContactUsFormField(
            '#body-section form textarea[name="contact_message"]'
        );
        cy.xpath(
            '//div[@id="message-contact"]/../..//*[@name="submit_contact"]'
        )
            .scrollIntoView()
            .click();
        cy.contactUsFormMessageCheck(
            "alert-danger",
            "The Message field is required."
        );
    });
});

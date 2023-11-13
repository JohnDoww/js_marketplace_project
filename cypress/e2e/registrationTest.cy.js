import user from '../fixtures/user.json';
import validationForRegistrationFields from '../fixtures/validationForRegistrationFields.json'

import {faker} from '@faker-js/faker';
import registrationPage from "../support/pages/RegistrationPage";
import homePage from "../support/pages/HomePage";
import accountPage from "../support/pages/AccountPage";
import {BasePage} from "../support/pages/BasePage"


describe('Registration flow', () => {

    beforeEach(() => {
        homePage.visit();
    })

    it('Create a new user', () => {
        user.loginName = faker.internet.userName({lastName: "test"});
        user.email = faker.internet.email();
        registrationPage.registrateNewUser(user);
    })
    afterEach(() => {
        accountPage.logOut();
    })

})


describe.skip('Check empty fields validation', () => {
    beforeEach(() => {
        homePage.visit();
    })


    // function fillInFields(webElement, data) {
    //     if (webElement.toString() === "#AccountFrm_zone_id") {
    //         if (!data) {
    //             cy.get(webElement).select("--- Please Select ---")
    //                 .should('contain.text', " --- Please Select --- ");
    //             return;
    //         }
    //         cy.get(webElement)
    //             .select(data)
    //             .should('contain.text', data);
    //         return;
    //     }
    //     if (!data) {
    //         cy.get(webElement)
    //             // .clear()
    //             .should('be.empty');
    //         return;
    //     }
    //     cy.get(webElement)
    //         // .clear()
    //         .type(data)
    //         .should('have.value', data);
    // }

    validationForRegistrationFields.forEach(fieldsParameters => {
        it(`Validation for ${fieldsParameters.testData.emptyField} field`, () => {

            cy.get('#customer_menu_top li').click();
            cy.get('#accountFrm_accountregister')
                .should('be.enabled');

            cy.get('[title="Continue"]').click();

            fillInFields(registrationPage.elements.firstNameField, fieldsParameters.testData.firstNameData);
            fillInFields(registrationPage.elements.lastNameField, fieldsParameters.testData.lastNameData);
            fillInFields(registrationPage.elements.emailField, fieldsParameters.testData.emailData);
            fillInFields(registrationPage.elements.addressFirstField, fieldsParameters.testData.addressData);
            fillInFields(registrationPage.elements.cityField, fieldsParameters.testData.cityData);
            fillInFields(registrationPage.elements.zoneIdField, fieldsParameters.testData.regionData);
            fillInFields(registrationPage.elements.postcodeField, fieldsParameters.testData.zipCodeData);
            fillInFields(registrationPage.elements.loginNameField, fieldsParameters.testData.loginData);
            fillInFields(registrationPage.elements.passwordField, fieldsParameters.testData.passwordData);
            fillInFields(registrationPage.elements.passwordConfirmField, fieldsParameters.testData.passwordConfirmData);

            cy.get('#AccountFrm_agree')
                .should('be.enabled');
            cy.get('#AccountFrm_agree')
                .click();
            cy.get('[title="Continue"]')
                .should('be.visible');
            cy.get('[title="Continue"]')
                .click();

            cy.get("div ~span")
                .eq(fieldsParameters.fieldExpectation.lastNameFieldNumber)
                .should('have.attr', 'class', 'help-block')
                .then(element => {
                    expect(element)
                        .to
                        .contain
                        .text(fieldsParameters.fieldExpectation.errorMessage);
                })
        })
    })


    afterEach(() => {
        accountPage.logOut();
    })
})

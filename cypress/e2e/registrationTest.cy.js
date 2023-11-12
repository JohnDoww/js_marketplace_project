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

// There I have a trouble  - so I will rewrite this test

// describe('Check empty fields validation', () => {
//     beforeEach(() => {
//         homePage.visit();
//     })
//
//
//     function fillInFields(webElement, data) {
//         if (webElement.toString() === "#AccountFrm_zone_id") {
//             if (!data) {
//                 cy.get(webElement).select("--- Please Select ---")
//                     .should('contain.text', " --- Please Select --- ");
//                 return;
//             }
//             cy.get(webElement)
//                 .select(data)
//                 .should('contain.text', data);
//             return;
//         }
//         if (!data) {
//             cy.get(webElement)
//                 .clear()
//                 .should('be.empty');
//             return;
//         }
//         cy.get(webElement)
//             .clear()
//             .type(data)
//             .should('have.value', data);
//     }
//
//     validationForRegistrationFields.forEach(fieldsParameters => {
//         it(`Validation for ${fieldsParameters.testData.emptyField} field`, () => {
//
//             cy.get('#customer_menu_top li').click();
//             cy.get('#accountFrm_accountregister')
//                 .should('be.enabled');
//
//             cy.get('[title="Continue"]').click();
//
//             fillInFields(registrationPage.getFirstNameField(), fieldsParameters.testData.firstNameData);
//             fillInFields(registrationPage.getLastNameField(), fieldsParameters.testData.lastNameData);
//             fillInFields(registrationPage.getEmailField(), fieldsParameters.testData.emailData);
//             fillInFields(registrationPage.getAddressFirstField(), fieldsParameters.testData.addressData);
//             fillInFields(registrationPage.getCityField(), fieldsParameters.testData.cityData);
//             fillInFields(registrationPage.getZoneIdField(), fieldsParameters.testData.regionData);
//             fillInFields(registrationPage.getPostcodeField(), fieldsParameters.testData.zipCodeData);
//             fillInFields(registrationPage.getLoginNameField(), fieldsParameters.testData.loginData);
//             fillInFields(registrationPage.getPasswordField(), fieldsParameters.testData.passwordData);
//             fillInFields(registrationPage.getPasswordConfirmField(), fieldsParameters.testData.passwordConfirmData);
//
//             cy.get('#AccountFrm_agree')
//                 .should('be.enabled');
//             cy.get('#AccountFrm_agree')
//                 .click();
//             cy.get('[title="Continue"]')
//                 .should('be.visible');
//             cy.get('[title="Continue"]')
//                 .click();
//
//             cy.get("div ~span")
//                 .eq(fieldsParameters.fieldExpectation.lastNameFieldNumber)
//                 .should('have.attr', 'class', 'help-block')
//                 .then(element => {
//                     expect(element)
//                         .to
//                         .contain
//                         .text(fieldsParameters.fieldExpectation.errorMessage);
//                 })
//         })
//     })
//
//
//     afterEach(() => {
//         accountPage.logOut();
//     })
// })

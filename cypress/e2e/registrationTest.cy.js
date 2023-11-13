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


describe('Check empty fields validation', () => {
    beforeEach(() => {
        homePage.visit();
    })


    validationForRegistrationFields.forEach(fieldsParameters => {
        it(`Validation for ${fieldsParameters.testData.emptyField} field`, () => {

            cy.get('#customer_menu_top li').click();
            cy.get('#accountFrm_accountregister')
                .should('be.enabled');

            cy.get('[title="Continue"]').click();

            registrationPage.fillInRegistrationFields(registrationPage.elements.firstNameField, fieldsParameters.testData.firstNameData);
            registrationPage.fillInRegistrationFields(registrationPage.elements.lastNameField, fieldsParameters.testData.lastNameData);
            registrationPage.fillInRegistrationFields(registrationPage.elements.emailField, fieldsParameters.testData.emailData);
            registrationPage.fillInRegistrationFields(registrationPage.elements.addressFirstField, fieldsParameters.testData.addressData);
            registrationPage.fillInRegistrationFields(registrationPage.elements.cityField, fieldsParameters.testData.cityData);
            registrationPage.fillInRegistrationFields(registrationPage.elements.zoneIdField, fieldsParameters.testData.regionData);
            registrationPage.fillInRegistrationFields(registrationPage.elements.postcodeField, fieldsParameters.testData.zipCodeData);
            registrationPage.fillInRegistrationFields(registrationPage.elements.loginNameField, fieldsParameters.testData.loginData);
            registrationPage.fillInRegistrationFields(registrationPage.elements.passwordField, fieldsParameters.testData.passwordData);
            registrationPage.fillInRegistrationFields(registrationPage.elements.passwordConfirmField, fieldsParameters.testData.passwordConfirmData);

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

})

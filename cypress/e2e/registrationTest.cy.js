import user from '../fixtures/user.json';
import validationForRegistrationFields from '../fixtures/validationForRegistrationFields.json'

import {faker} from '@faker-js/faker';
import registrationPage from "../support/pages/RegistrationPage";
import homePage from "../support/pages/HomePage";
import accountPage from "../support/pages/AccountPage";
import BasePage from "../support/pages/BasePage";

const basePage = new BasePage();



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
            basePage.getLoginOrRegistratedButton().click();
            registrationPage.getRegisterAccountRadioBatton().should('be.enabled');
            registrationPage.getToStartRegistrationButton().click();

            registrationPage.fillINAndCheckFieldsValidation(fieldsParameters);
        })
    })

})

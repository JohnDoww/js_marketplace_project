import BasePage from "./BasePage";


class RegistrationPage extends BasePage {

    constructor() {
        super();
        this.elements.firstNameField = '#AccountFrm_firstname';
        this.elements.lastNameField = '#AccountFrm_lastname';
        this.elements.emailField = '#AccountFrm_email';
        this.elements.phoneNumberField = '#AccountFrm_telephone';
        this.elements.faxField = '#AccountFrm_fax';
        this.elements.companyNameField = '#AccountFrm_company';
        this.elements.addressFirstField = '#AccountFrm_address_1';
        this.elements.addressSecondField = '#AccountFrm_address_2';
        this.elements.cityField = '#AccountFrm_city';
        this.elements.postcodeField = '#AccountFrm_postcode';
        this.elements.countryIdField = '#AccountFrm_country_id';
        this.elements.zoneIdField = '#AccountFrm_zone_id';
        this.elements.loginNameField = '#AccountFrm_loginname';
        this.elements.passwordField = '#AccountFrm_password';
        this.elements.passwordConfirmField = '#AccountFrm_confirm';
        this.elements.newsLetterCheckbox = '#AccountFrm_newsletter1';
        this.elements.privacyPolicyCheckbox = '#AccountFrm_agree';
        this.elements.submitRegistrationFormButton = 'button[title="Continue"]';
        this.elements.registerAccountRadioBatton = '#accountFrm_accountregister';
        this.elements.toStartRegistrationButton = '[title="Continue"]';
        this.elements.applyRegistrationFormButton = '[title="Continue"]';
        this.elements.privacyPolicyCheckbox = '#AccountFrm_agree';

    }


    getNewsLetterCheckbox() {
        return cy.get(this.elements.newsLetterCheckbox)
    }

    getPrivacyPolicyCheckbox() {
        return cy.get(this.elements.privacyPolicyCheckbox)
    }

    getRegisterAccountRadioBatton() {
        return cy.get(this.elements.registerAccountRadioBatton)
    }

    getToStartRegistrationButton() {
        return cy.get(this.elements.toStartRegistrationButton)
    }


    getSubmitRegistrationFormButton() {
        return cy.get(this.elements.submitRegistrationFormButton)
    }

    fillInRegistrationFields(webElement, data) {
        if (webElement.toString() === "#AccountFrm_zone_id" || webElement.toString() === "#AccountFrm_country_id") {
            if (!data) {
                cy.get(webElement).select("--- Please Select ---")
                    .should('contain.text', " --- Please Select --- ");
                return;
            }
            cy.get(webElement)
                .select(data)
            // .should('contain.text', data);
            return;
        }
        if (!data) {
            cy.get(webElement)
                .clear()
                .should('be.empty');
            return;
        }
        cy.get(webElement)
            .clear()
            .type(data)
            .should('have.value', data);
    }


    registrateNewUser(user) {

        const basePage = new BasePage();
        basePage.getLoginOrRegistratedButton().click();


        this.getRegisterAccountRadioBatton().should('be.enabled');
        this.getToStartRegistrationButton().click();

        this.fillInRegistrationFields(this.elements.firstNameField, user.firstName);
        this.fillInRegistrationFields(this.elements.lastNameField, user.lastName);
        this.fillInRegistrationFields(this.elements.emailField, user.email);
        this.fillInRegistrationFields(this.elements.phoneNumberField, user.phone);
        this.fillInRegistrationFields(this.elements.faxField, user.fax);
        this.fillInRegistrationFields(this.elements.companyNameField, user.companyName);
        this.fillInRegistrationFields(this.elements.addressFirstField, user.address1);
        this.fillInRegistrationFields(this.elements.addressSecondField, user.address2);
        this.fillInRegistrationFields(this.elements.cityField, user.city);
        this.fillInRegistrationFields(this.elements.postcodeField, user.postcode);
        this.fillInRegistrationFields(this.elements.countryIdField, user.country_select);

        this.fillInRegistrationFields(this.elements.zoneIdField, user.region);
        this.fillInRegistrationFields(this.elements.loginNameField, user.loginName);
        this.fillInRegistrationFields(this.elements.passwordField, user.password);
        this.fillInRegistrationFields(this.elements.passwordConfirmField, user.password);

        this.getNewsLetterCheckbox().click();
        this.getPrivacyPolicyCheckbox().click();
        this.getSubmitRegistrationFormButton().click();
    }

    fillINAndCheckFieldsValidation(data) {

        this.fillInRegistrationFields(this.elements.firstNameField, data.testData.firstNameData);
        this.fillInRegistrationFields(this.elements.lastNameField, data.testData.lastNameData);
        this.fillInRegistrationFields(this.elements.emailField, data.testData.emailData);
        this.fillInRegistrationFields(this.elements.addressFirstField, data.testData.addressData);
        this.fillInRegistrationFields(this.elements.cityField, data.testData.cityData);
        this.fillInRegistrationFields(this.elements.zoneIdField, data.testData.regionData);
        this.fillInRegistrationFields(this.elements.postcodeField, data.testData.zipCodeData);
        this.fillInRegistrationFields(this.elements.loginNameField, data.testData.loginData);
        this.fillInRegistrationFields(this.elements.passwordField, data.testData.passwordData);
        this.fillInRegistrationFields(this.elements.passwordConfirmField, data.testData.passwordConfirmData);

        cy.get(this.elements.privacyPolicyCheckbox)
            .should('be.enabled');
        cy.get(this.elements.privacyPolicyCheckbox)
            .click();
        cy.get(this.elements.applyRegistrationFormButton)
            .should('be.visible');
        cy.get(this.elements.applyRegistrationFormButton)
            .click();

        cy.get("div ~span")
            .eq(data.fieldExpectation.lastNameFieldNumber)
            .should('have.attr', 'class', 'help-block')
            .then(element => {
                expect(element)
                    .to
                    .contain
                    .text(data.fieldExpectation.errorMessage);
            })
    }


}

export default new RegistrationPage();
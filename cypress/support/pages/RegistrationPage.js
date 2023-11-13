import BasePage from "./BasePage";



class RegistrationPage extends BasePage{

    constructor(){
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

    }

    getFirstNameField(){
        return cy.get(this.elements.firstNameField)
    }

    getLastNameField(){
        return cy.get(this.elements.lastNameField)
    }

    getEmailField(){
        return cy.get(this.elements.emailField)
    }

    getPhoneNumberField(){
        return cy.get(this.elements.phoneNumberField)
    }

    getFaxField(){
        return cy.get(this.elements.faxField)
    }

    getCompanyNameField(){
        return cy.get(this.elements.companyNameField)
    }

    getAddressFirstField(){
        return cy.get(this.elements.addressFirstField)
    }

    getAddressSecondField(){
        return cy.get(this.elements.addressSecondField)
    }

    getCityField(){
        return cy.get(this.elements.cityField)
    }

    getPostcodeField(){
        return cy.get(this.elements.postcodeField)
    }

    getCountryIdField(){
        return cy.get(this.elements.countryIdField)
    }

    getZoneIdField(){
        return cy.get(this.elements.zoneIdField)
    }

    getLoginNameField(){
        return cy.get(this.elements.loginNameField)
    }

    getPasswordField(){
        return cy.get(this.elements.passwordField)
    }

    getPasswordConfirmField(){
        return cy.get(this.elements.passwordConfirmField)
    }

    getNewsLetterCheckbox(){
        return cy.get(this.elements.newsLetterCheckbox)
    }

    getPrivacyPolicyCheckbox(){
        return cy.get(this.elements.privacyPolicyCheckbox)
    }

    getRegisterAccountRadioBatton(){
        return cy.get(this.elements.registerAccountRadioBatton)
    }

    getToStartRegistrationButton(){
        return cy.get(this.elements.toStartRegistrationButton)
    }

    /**
     * Get submit button element from page
     * @returns {CypressElement} Returns the Submit Button in Registration Form as Cypress element.
     */
    getSubmitRegistrationFormButton(){
        return cy.get(this.elements.submitRegistrationFormButton)
    }

    fillInRegistrationFields(webElement, data) {
        if (webElement.toString() === "#AccountFrm_zone_id" || webElement.toString() === "#AccountFrm_country_id" ) {
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

    /**
     *  Fill in registration fields
     *  @param {Object} user - user object
     *  User object example can be found in ./cypress/fixtures/user.json
     */
    registrateNewUser(user){

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

        // this.getFirstNameField().type(user.firstName);
        // this.getLastNameField().type(user.lastName);
        // this.getEmailField().type(user.email);
        // this.getPhoneNumberField().type(user.phone);
        // this.getFaxField().type(user.fax);
        // this.getCompanyNameField().type(user.companyName);
        // this.getAddressFirstField().type(user.address1);
        // this.getAddressSecondField().type(user.address2);
        // this.getCityField().type(user.city);
        // this.getPostcodeField().type(user.postcode);
        // this.getCountryIdField().select(user.country);
        // this.getZoneIdField().select(user.zoneId);
        // this.getLoginNameField().type(user.loginName);
        // this.getPasswordField().type(user.password);
        // this.getPasswordConfirmField().type(user.password);

        this.getNewsLetterCheckbox().click();
        this.getPrivacyPolicyCheckbox().click();
        this.getSubmitRegistrationFormButton().click();
    }

}
export default new RegistrationPage();
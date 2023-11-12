import validationForRegistrationFields from '../fixtures/validationForRegistrationFields.json'


describe('Check validation for each field. Field is empty or not', () => {


    beforeEach(() => {
        cy.visit('https://automationteststore.com/');
    })

    let firstNameLocator = "#AccountFrm_firstname";
    let lastNameLocator = "#AccountFrm_lastname";
    let emailLocator = "#AccountFrm_email";
    let addressLocator = "#AccountFrm_address_1";
    let cityLocator = "#AccountFrm_city";
    let regionLocator = "#AccountFrm_zone_id";
    let zipCodeLocator = "#AccountFrm_postcode";
    let loginLocator = "#AccountFrm_loginname";
    let passwordLocator = "#AccountFrm_password";
    let passwordConfirmLocator = "#AccountFrm_confirm";


    validationForRegistrationFields.forEach(fieldsParameters => {
        it(`Validation for ${fieldsParameters.testData.emptyField} field`, () => {

            cy.get('#customer_menu_top li').click();
            cy.get('#accountFrm_accountregister')
                .should('be.enabled');

            cy.get('[title="Continue"]').click();

            function fillInFields(webElement, data) {
                if (webElement.toString() === "#AccountFrm_zone_id") {
                    if (!data) {
                        cy.get(webElement).select("--- Please Select ---")
                            .should('contain.text', " --- Please Select --- ");
                        return;
                    }
                    cy.get(webElement)
                        .select(data)
                        .should('contain.text', data);
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

            fillInFields(firstNameLocator, fieldsParameters.testData.firstNameData);
            fillInFields(lastNameLocator, fieldsParameters.testData.lastNameData);
            fillInFields(emailLocator, fieldsParameters.testData.emailData);
            fillInFields(addressLocator, fieldsParameters.testData.addressData);
            fillInFields(cityLocator, fieldsParameters.testData.cityData);
            fillInFields(regionLocator, fieldsParameters.testData.regionData);
            fillInFields(zipCodeLocator, fieldsParameters.testData.zipCodeData);
            fillInFields(loginLocator, fieldsParameters.testData.loginData);
            fillInFields(passwordLocator, fieldsParameters.testData.passwordData);
            fillInFields(passwordConfirmLocator, fieldsParameters.testData.passwordConfirmData);

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

    after(() => {
        cy.end();
    })
})

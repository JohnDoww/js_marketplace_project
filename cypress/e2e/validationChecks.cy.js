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

    const fieldsData = [
        {
            testData: {
                firstNameData: null,
                lastNameData: "Lastname",
                emailData: "somemeail@emaaail.com",
                addressData: "Down Town 111",
                cityData: "Uganda",
                regionData: "Angus",
                zipCodeData: "12341234",
                loginData: "loooogin111",
                passwordData: "1234",
                passwordConfirmData: "1234",
                emptyField: "First Name"
            },
            fieldExpectation: {
                errorMessage: "First Name must be between 1 and 32 characters!",
                lastNameFieldNumber: 0
            }
        }, {
            testData: {
                firstNameData: "Firstname",
                lastNameData: null,
                emailData: "somemeail@emaaail.com",
                addressData: "Down Town 111",
                cityData: "Uganda",
                regionData: "Angus",
                zipCodeData: "12341234",
                loginData: "loooogin111",
                passwordData: "1234",
                passwordConfirmData: "1234",
                emptyField: "Last Name"
            },
            fieldExpectation: {
                errorMessage: "Last Name must be between 1 and 32 characters!",
                lastNameFieldNumber: 1
            }
        }, {
            testData: {
                firstNameData: "Firstname",
                lastNameData: "Lastname",
                emailData: null,
                addressData: "Down Town 111",
                cityData: "Uganda",
                regionData: "Angus",
                zipCodeData: "12341234",
                loginData: "loooogin111",
                passwordData: "1234",
                passwordConfirmData: "1234",
                emptyField: "Email"
            },
            fieldExpectation: {
                errorMessage: "Email Address does not appear to be valid!",
                lastNameFieldNumber: 2
            }
        }, {
            testData: {
                firstNameData: "Firstname",
                lastNameData: "Lastname",
                emailData: "somemeail@emaaail.com",
                addressData: null,
                cityData: "Uganda",
                regionData: "Angus",
                zipCodeData: "12341234",
                loginData: "loooogin111",
                passwordData: "1234",
                passwordConfirmData: "1234",
                emptyField: "Address"
            },
            fieldExpectation: {
                errorMessage: "Address 1 must be between 3 and 128 characters!",
                lastNameFieldNumber: 6
            }
        }, {
            testData: {
                firstNameData: "Firstname",
                lastNameData: "Lastname",
                emailData: "somemeail@emaaail.com",
                addressData: "Down Town 111",
                cityData: null,
                regionData: "Angus",
                zipCodeData: "12341234",
                loginData: "loooogin111",
                passwordData: "1234",
                passwordConfirmData: "1234",
                emptyField: "City"
            },
            fieldExpectation: {
                errorMessage: "City must be between 3 and 128 characters!",
                lastNameFieldNumber: 8
            }
        }, {
            testData: {
                firstNameData: "Firstname",
                lastNameData: "Lastname",
                emailData: "somemeail@emaaail.com",
                addressData: "Down Town 111",
                cityData: "Uganda",
                regionData: null,
                zipCodeData: "12341234",
                loginData: "loooogin111",
                passwordData: "1234",
                passwordConfirmData: "1234",
                emptyField: "Region"
            },
            fieldExpectation: {
                errorMessage: "Please select a region / state!",
                lastNameFieldNumber: 9
            }
        }, {
            testData: {
                firstNameData: "Firstname",
                lastNameData: "Lastname",
                emailData: "somemeail@emaaail.com",
                addressData: "Down Town 111",
                cityData: "Uganda",
                regionData: "Angus",
                zipCodeData: null,
                loginData: "loooogin111",
                passwordData: "1234",
                passwordConfirmData: "1234",
                emptyField: "Zip Code"
            },
            fieldExpectation: {
                errorMessage: "Zip/postal code must be between 3 and 10 characters!",
                lastNameFieldNumber: 10
            }
        }, {
            testData: {
                firstNameData: "Firstname",
                lastNameData: "Lastname",
                emailData: "somemeail@emaaail.com",
                addressData: "Down Town 111",
                cityData: "Uganda",
                regionData: "Angus",
                zipCodeData: "12341234",
                loginData: null,
                passwordData: "1234",
                passwordConfirmData: "1234",
                emptyField: "Login"
            },
            fieldExpectation: {
                errorMessage: "Login name must be alphanumeric only and between 5 and 64 characters!",
                lastNameFieldNumber: 12
            }
        }, {
            testData: {
                firstNameData: "Firstname",
                lastNameData: "Lastname",
                emailData: "somemeail@emaaail.com",
                addressData: "Down Town 111",
                cityData: "Uganda",
                regionData: "Angus",
                zipCodeData: "12341234",
                loginData: "loooogin111",
                passwordData: null,
                passwordConfirmData: "1234",
                emptyField: "Password"
            },
            fieldExpectation: {
                errorMessage: "Password must be between 4 and 20 characters!",
                lastNameFieldNumber: 13
            }
        }, {
            testData: {
                firstNameData: "Firstname",
                lastNameData: "Lastname",
                emailData: "somemeail@emaaail.com",
                addressData: "Down Town 111",
                cityData: "Uganda",
                regionData: "Angus",
                zipCodeData: "12341234",
                loginData: "loooogin111",
                passwordData: "1234",
                passwordConfirmData: null,
                emptyField: "Password Confirm"

            },
            fieldExpectation: {
                errorMessage: "Password confirmation does not match password!",
                lastNameFieldNumber: 14
            }
        }
    ]

    fieldsData.forEach(fieldsParameters => {
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

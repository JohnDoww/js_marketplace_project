/* global JQuery */
import user from '../fixtures/user.json';
import {faker} from '@faker-js/faker';


describe('registration flow', () => {

    beforeEach(() => {

        cy.visit('https://automationteststore.com/');
    })


    it.skip('Create the user', () => {
        user.loginName = faker.internet.userName({lastName: "test"});
        user.email = faker.internet.email();

        cy.get('#customer_menu_top li').click();

        cy.get('#accountFrm_accountregister').should('be.enabled');
        cy.get('[title="Continue"]').click();

        cy.get('#AccountFrm_firstname').type(user.firstName);
        cy.get('#AccountFrm_firstname').should('contain.value', user.firstName);

        cy.get('#AccountFrm_lastname').type(user.lastName);
        cy.get('#AccountFrm_lastname').should('contain.value', user.lastName);
        cy.get('#AccountFrm_email').type(user.email);
        cy.get('#AccountFrm_email').should('contain.value', user.email);
        cy.get('#AccountFrm_telephone').type(user.phone);
        cy.get('#AccountFrm_telephone').should('contain.value', user.phone);
        cy.get('#AccountFrm_fax').type(user.fax);
        cy.get('#AccountFrm_fax').should('contain.value', user.fax);

        cy.get('#AccountFrm_company').type(user.companyName);
        cy.get('#AccountFrm_company').should('contain.value', user.companyName);
        cy.get('#AccountFrm_address_1').type(user.address1);
        cy.get('#AccountFrm_address_1').should('contain.value', user.address1);
        cy.get('#AccountFrm_address_2').type(user.address2);
        cy.get('#AccountFrm_address_2').should('contain.value', user.address2);
        cy.get('#AccountFrm_city').type(user.city);
        cy.get('#AccountFrm_city').should('contain.value', user.city);
        cy.get('#AccountFrm_postcode').type(user.postcode);
        cy.get('#AccountFrm_postcode').should('contain.value', user.postcode);
        cy.get('#AccountFrm_country_id').select(user.country);
        cy.get('#AccountFrm_country_id').should('contain.text', user.country);
        cy.get('#AccountFrm_zone_id').select(user.city);
        cy.get('#AccountFrm_zone_id').should('contain.text', user.city);

        cy.get('#AccountFrm_loginname').type(user.loginName);
        cy.get('#AccountFrm_loginname').should('contain.value', user.loginName);
        cy.get('#AccountFrm_password').type(user.password);
        cy.get('#AccountFrm_password').should('contain.value', user.password);
        cy.get('#AccountFrm_confirm').type(user.password);
        cy.get('#AccountFrm_confirm').should('contain.value', user.password);
        cy.get('#AccountFrm_newsletter1').click();

        cy.get('#AccountFrm_agree').click();
        cy.get('#AccountFrm_agree').should('be.enabled');
        cy.get('[title="Continue"]').click();
        cy.get('[title="Continue"]').should('be.visible');
        cy.get('.heading1').should('contain.text', ' Your Account Has Been Created!');

        cy.log("Create " + user.loginName);
        cy.log("Create " + user.email);
    })

    function openNeededItemFromTheCatalog(searchItem) {
        cy.visit("https://automationteststore.com/index.php?rt=product/search&keyword=e&category_id=0");

        for (let i = 0; i < 10; i++) {
            cy.get('[class="fixed_wrapper"]').then(($itemTitles) => {
                // for (let i = 0; i < 100; i++) {
                if ($itemTitles.text().includes(searchItem)) {
                  cy.log("we do")
                  cy.contains(searchItem).click();
                  break
                } else {
                  cy.log("we don't")
                    cy.get('[class="pagination"] li a').contains(">").click()
                }
            })
        }
    }


    it('login', () => {
        cy.get('#customer_menu_top li').click();

        // cy.get('#loginFrm_loginname').type(user.loginName);
        // cy.get('#loginFrm_loginname').should('contain.value', user.loginName);
        // cy.get('#loginFrm_password').type(user.password);
        // cy.get('#loginFrm_passworda').should('not.be.empty');
        //
        // cy.get('#accountFrm_accountregister').should('be.enabled');
        // cy.get('[title="Login"]').click();
        //
        // cy.get('.top.menu_account div').should('be.visible').and('contain.text', `Welcome back ${user.firstName}`);
        //
        // cy.log("Login " + user.loginName);
        // cy.log("Login " + user.email);

        openNeededItemFromTheCatalog("Benefit Bella Bamba")


    })


    // afterEach(()=>{
    //   cy.get('.side_account_list li').eq(9).click();
    //
    //   cy.get('.btn.btn-default.mr10').should('be.visible');
    //   cy.get('.btn.btn-default.mr10').click();
    //
    //   cy.url().should('eq', 'https://automationteststore.com/')
    // })

})

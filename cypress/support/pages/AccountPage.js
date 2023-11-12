import BasePage from "./BasePage";

class AccountPage extends BasePage{

    constructor(){
        super();
    }

    logOut(){
        cy.visit('https://automationteststore.com/index.php?rt=account/account');
        cy.get('.side_account_list li').eq(9).click();
        cy.get('.btn.btn-default.mr10').should('be.visible');
        cy.get('.btn.btn-default.mr10').click();
        cy.url().should('eq', 'https://automationteststore.com/')
        // cy.getCookie('customer').should('be.null');
    }
    
}
export default new AccountPage();
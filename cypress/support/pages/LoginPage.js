import BasePage from "./BasePage";
import homePage from "./HomePage";

class LoginPage extends BasePage {

    constructor(){
        super();
        this.elements.loginNameField = '#loginFrm_loginname';
        this.elements.passwordField = '#loginFrm_password';
        this.elements.toLoginButton = '[title="Login"]';

    }

    getLoginNameField(){
        return cy.get(this.elements.loginNameField)
    }

    getPasswordField(){
        return cy.get(this.elements.passwordField)
    }
    getToLoginButton(){
        return cy.get(this.elements.toLoginButton)
    }



    logIn(user) {
        const basePage = new BasePage();

        homePage.visit()

        cy.getCookie('customer').should('be.null');

        basePage.getLoginOrRegistratedButton().click();

        this.getLoginNameField().type(user.loginName);
        this.getLoginNameField().should('contain.value', user.loginName);

        this.getPasswordField().type(user.password);
        this.getPasswordField().should('contain.value',user.password);

        this.getToLoginButton().click();

        basePage.getHelloUserTitle().should('be.visible').and('contain.text', `Welcome back ${user.firstName}`);

    }

}

export default new LoginPage();
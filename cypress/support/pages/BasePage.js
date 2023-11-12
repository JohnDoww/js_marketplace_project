export default class BasePage{
    
    constructor(){
        this.elements = {};
        this.elements.loginOrRegistratedButton = '#customer_menu_top li';
        this.elements.helloUserTitle = '.top.menu_account div';
    }

    getLoginOrRegistratedButton(){
        return cy.get(this.elements.loginOrRegistratedButton);
    }

    getHelloUserTitle(){
        return cy.get(this.elements.helloUserTitle);
    }

}



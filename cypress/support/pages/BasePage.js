export default class BasePage{
    
    constructor(){
        this.elements = {};
        this.elements.headerAccountButton = '.topnavbar [data-id="menu_account"]';
    }

    getHeaderAccountButton(){
        return cy.get(this.elements.headerAccountButton);
    }

}
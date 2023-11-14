import BasePage from "./BasePage";

class Item extends BasePage{

    constructor(){
        super();
        this.elements.addToTheCartButton = '[class="cart"]';

    }

    getAddToTheCartButton(){
        return cy.get(this.elements.addToTheCartButton)
    }


}
export default new Item();
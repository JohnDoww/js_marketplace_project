import BasePage from "./BasePage";

class Item extends BasePage{

    constructor(){
        super();
        this.elements.addToTheCartButton = '[class="cart"]';

    }

    getAddToTheCartButton(){
        return cy.get(this.elements.addToTheCartButton)
    }

    addItemToTheCart(){
        this.getSizeOfItemField().select('')
    }

}
export default new Item();
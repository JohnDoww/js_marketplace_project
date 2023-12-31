import user from '../fixtures/user.json';
import homePage from "../support/pages/HomePage";
import loginPage from "../support/pages/LoginPage";
import {openNeededItemFromTheCatalog} from "../support/helperFunctions";
import item from "../support/pages/Item";

describe('Purchasing',()=>{

    beforeEach(() => {
        homePage.visit();
    })

    it('Buy item', () => {

        loginPage.logIn(user);
        cy.visit("https://automationteststore.com/index.php?rt=product/search&keyword=e&category_id=0");

        openNeededItemFromTheCatalog("Lancome Visionnaire Advanced Skin Corrector");

        item.getAddToTheCartButton().click();

    })
})

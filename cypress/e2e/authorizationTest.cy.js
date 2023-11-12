import user from '../fixtures/user.json';
import homePage from "../support/pages/HomePage";
import accountPage from "../support/pages/AccountPage";
import loginPage from "../support/pages/LoginPage";

describe('Login tests',()=>{

    beforeEach(() => {
    homePage.visit();
    })

    it('login', () => {

        loginPage.logIn(user);

    })

    afterEach(()=> {
        accountPage.logOut();
    })

})


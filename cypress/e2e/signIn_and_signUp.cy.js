describe('registration flow', () => {

  let login = "pro_test_user"+Math.floor(Math.random() * 100000);
  let password = "qwerty123";
  let firstName = 'Test';

  beforeEach(() =>{
    cy.visit('https://automationteststore.com/');
  })

  it('create the user', () => {
    let email = "sahopaho" + Math.floor(Math.random() * 100000)+ '@mailinator.com';
    let phoneNumber = '380097'+ Math.floor(Math.random() * 9999) + 1000;
    let lastName = 'Testenko';
    let fax = 1222355;
    let company = 'The Best Company';
    let myAddress ="Velyka Vasylkivska str. 16b";
    let myCity = "Kyiv";
    let myPostCode = 12021;
    let myRegion = "Kyiv";
    let myCountry = "Ukraine";

    cy.get('#customer_menu_top li').click();

    cy.get('#accountFrm_accountregister').should('be.enabled');
    cy.get('[title="Continue"]').click();

    cy.get('#AccountFrm_firstname').type(firstName);
    cy.get('#AccountFrm_firstname').should('contain.value', firstName);

    cy.get('#AccountFrm_lastname').type(lastName);
    cy.get('#AccountFrm_lastname').should('contain.value', lastName);
    cy.get('#AccountFrm_email').type(email);
    cy.get('#AccountFrm_email').should('contain.value', email);
    cy.get('#AccountFrm_telephone').type(phoneNumber);
    cy.get('#AccountFrm_telephone').should('contain.value', phoneNumber);
    cy.get('#AccountFrm_fax').type(fax);
    cy.get('#AccountFrm_fax').should('contain.value', fax);

    cy.get('#AccountFrm_company').type(company);
    cy.get('#AccountFrm_company').should('contain.value', company);
    cy.get('#AccountFrm_address_1').type(myAddress);
    cy.get('#AccountFrm_address_1').should('contain.value', myAddress);
    cy.get('#AccountFrm_address_2').type(myAddress);
    cy.get('#AccountFrm_address_2').should('contain.value', myAddress);
    cy.get('#AccountFrm_city').type(myCity);
    cy.get('#AccountFrm_city').should('contain.value', myCity);
    cy.get('#AccountFrm_postcode').type(myPostCode);
    cy.get('#AccountFrm_postcode').should('contain.value',myPostCode);
    cy.get('#AccountFrm_country_id').select(myCountry);
    cy.get('#AccountFrm_country_id').should('contain.text',myCountry);
    cy.get('#AccountFrm_zone_id').select(myRegion);
    cy.get('#AccountFrm_zone_id').should('contain.text', myRegion);

    cy.get('#AccountFrm_loginname').type(login);
    cy.get('#AccountFrm_loginname').should('contain.value', login);
    cy.get('#AccountFrm_password').type(password);
    cy.get('#AccountFrm_password').should('contain.value', password);
    cy.get('#AccountFrm_confirm').type(password);
    cy.get('#AccountFrm_confirm').should('contain.value', password);
    cy.get('#AccountFrm_newsletter1').click();

    cy.get('#AccountFrm_agree').click();
    cy.get('#AccountFrm_agree').should('be.enabled');
    cy.get('[title="Continue"]').click();
    cy.get('[title="Continue"]').should('be.visible');
    cy.get('.heading1').should('contain.text',' Your Account Has Been Created!');
  })

  it('login', () =>{
    cy.get('#customer_menu_top li').click();

    cy.get('#loginFrm_loginname').type(login);
    cy.get('#loginFrm_loginname').should('contain.value', login);
    cy.get('#loginFrm_password').type(password);
    cy.get('#loginFrm_passworda').should('not.be.empty');

    cy.get('#accountFrm_accountregister').should('be.enabled');
    cy.get('[title="Login"]').click();

    cy.get('.top.menu_account div').should('be.visible').and('contain.text', `Welcome back ${firstName}`);
  })

  afterEach(()=>{
    cy.get('.side_account_list li').eq(9).click();

    cy.get('.btn.btn-default.mr10').should('be.visible');
    cy.get('.btn.btn-default.mr10').click();

    cy.url().should('eq', 'https://automationteststore.com/')
  })

})

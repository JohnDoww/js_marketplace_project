
export function openNeededItemFromTheCatalog(searchItem) {
    cy.visit("https://automationteststore.com/index.php?rt=product/search&keyword=e&category_id=0");

    for (let i = 0; i < 10; i++) {

        cy.get('[class="fixed_wrapper"]').then(($itemTitles) => {
            // for (let i = 0; i < 9; i++) {
            if ($itemTitles.text().includes(searchItem)) {
                cy.log("Item is detected")
                /**
                 * How can we get out from the loop when the needed web element is detected ?
                 */
                i = 11;
            } else {
                cy.log("Item isn't detected on the page")
                cy.get('[class="pagination"] li a').contains(">").click()
            }
        })
    }
    cy.contains(searchItem).click();
}
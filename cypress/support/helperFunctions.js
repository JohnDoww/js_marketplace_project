
export function openNeededItemFromTheCatalog(searchItem) {
        cy.get('[class="fixed_wrapper"]').then(($itemTitles) => {
            if ($itemTitles.text().includes(searchItem)) {
                cy.log("Item is detected")
                cy.get(`[title="${searchItem}"]`).click();
            } else {
                cy.log("Item isn't detected on the page");
                cy.get('[class="pagination"] li a').contains(">").click();

                openNeededItemFromTheCatalog(searchItem);
            }
        })
}
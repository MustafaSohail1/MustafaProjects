function selectGroupMenuItem(groupName){
    cy.get('.styles__SideNavTabMenu-sc-199ectb-0')
    cy.contains(groupName).click()
}

export class navigationBar{


    selectStudiesTenant(){
        selectGroupMenuItem('Studies')
        cy.get('[class="Select-placeholder"]').contains('Select a Tenant').click()
        cy.get('[class="Select-menu-outer"]').contains('Loki').click()           
    }
    
    SelectRowFromStudies(){

        // search for row and create an object 'tableRow'. JQuery
        cy.get('tbody').contains('tr', 'Chris CepppiI').then ( tableRow => {
        cy.wrap(tableRow).find('.sponsor-column').click()
        })
    }
    
    selectVisitPlanTab(){
        selectGroupMenuItem('Study Visit Plan')
        cy.contains('Study Visit Plan').click()          
    }

    selectFormsTab(){
        selectGroupMenuItem('Study Forms')
        cy.contains('Study Forms').click()          
    }

    selectTenantUsersTab(){
        selectGroupMenuItem('Tenants')
        cy.contains('Tenants').click()
        // search for row and create an object 'tableRow'. JQuery
        cy.get('tbody').contains('tr', 'Loki').then ( tableRow => {
    // find the edit button class.
                cy.wrap(tableRow).contains('Loki').click()
                cy.contains('Tenant Users').click()
                cy.get('[data-i="tenant-user-add-button"]', { timeout: 15000 }).click()
    })
 }
}

export const navigateTo = new navigationBar()
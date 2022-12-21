import { last } from "cypress/types/lodash"


export class SmartTable{

    updateAgeByFirstName(age){

// search for row and create an object 'tableRow'. JQuery
cy.get('tbody').contains('tr', 'Larry').then ( tableRow => {

    // find the edit button class.
                cy.wrap(tableRow).find('.nb-edit').click()
    
    // find the AGE COLUMN and clear the field to update with new value.      
                cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
    
    // find the edit button again to save the changes after updating the value. class name changed now. 
                cy.wrap(tableRow).find('.nb-checkmark').click()
    
    // Validate the value of age via array index.
                cy.wrap(tableRow).find('td').eq(6).should('contain', age)
            })
    }

    addRowWithFirstAndLastName(firstName , lastName){

      
// find the Plus button to add new row. JS
cy.get('thead').find('.nb-plus').click()

// find the first name COLUMN and add Value.
            cy.get('input-editor').find('[placeholder="First Name"]').click().type(firstName)

// find the last name COLUMN and add Value
            cy.get('input-editor').find('[placeholder="Last Name"]').click().type(lastName)

// find the edit button again to save the changes after adding the value. class name changed now. 
            cy.get('td').find('.nb-checkmark').click()

// Validate the value of first / last name via array index.
            cy.get('td').eq(2).should('contain', firstName)
            cy.get('td').eq(3).should('contain', lastName) 
    }

    deleteRowByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then( () => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    }
}

export const onSmartTablePage = new SmartTable()
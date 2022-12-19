export class visitPlanList{

    selectTenant(){
        cy.contains('.level-left').find('Sites').then( studies =>{
        cy.wrap(studies).find('.active-nested')
        console.log('success')

        })

    }



    // submitInLineFormWithNameAndEmail(name, email){
    //     cy.contains('nb-card','Inline form').find('form').then( form => {
    //     cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
    //     cy.wrap(form).find('[placeholder="Email"]').type(email)
    //     cy.wrap(form).find('[type="checkbox"]').check({force: true})
    //     cy.wrap(form).submit()
    //     }) 

    // }
    // submitBasicFormWithEmailAndPassword(email, password){
    //     cy.contains('nb-card','Inline form').find('form').then( form => {
    //     cy.wrap(form).find('[placeholder="Email"]').type(email)
    //     cy.wrap(form).find('[placeholder="Password"]').type(password)
    //     cy.wrap(form).find('[type="checkbox"]').check({force: true})
    //     cy.wrap(form).submit()
    //     })
    // }
}

export const onVisitPlanList = new visitPlanList()
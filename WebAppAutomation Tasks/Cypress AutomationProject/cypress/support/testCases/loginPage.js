export class loginPage{

    login(){
        cy.visit('https://dev1-platform.s37dev.com/')
        cy.get('.welcome-text').should('contain','Log in to your account')
        cy.get('[data-i="username-input-element"]').click().type("MSDataDesignerDev")
        cy.get('[data-i="password-input-element"]').click().type("Mustafa1234")
        cy.get('[type="submit"]').click()
    }

    loginWithMissionControl(){
        cy.visit('https://dev1-platform.s37dev.com/')
        cy.get('.welcome-text').should('contain','Log in to your account')
        cy.get('[data-i="username-input-element"]').click().type("mission_control")
        cy.get('[data-i="password-input-element"]').click().type("kK10dynJ2okgPeQC")
        cy.get('[type="submit"]').click()
    }
}
export const navigateTologin = new loginPage()
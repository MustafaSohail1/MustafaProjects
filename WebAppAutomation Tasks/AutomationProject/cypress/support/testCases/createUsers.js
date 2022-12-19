  function randomStringGenerator() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 3; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  function randomNumGenerator() {
    var num = "";
    var possible = "0123456789";

    for (var i = 0; i < 3; i++)
      num += possible.charAt(Math.floor(Math.random() * possible.length));

    return num;
  }
  
function selectDayFromCurrent(){

  let date = new Date()
  let futureDay = date.getDate()
  let futureMonth = date.toLocaleString('default', {month: 'short'})
  let dateAssert = futureMonth+futureDay+date.getFullYear()
 
  return dateAssert
}
var tenantEmail = 'msohail+tenantadmin' + randomNumGenerator() + selectDayFromCurrent().toLowerCase()+'@science37.com'
var userPassword = 'Mustafa@12345'
var securityAns = 'computer'
var dbUserTable = 'dev1_loki_admin'

function dbConnect(){
  cy.task('queryDb', `select * from ${dbUserTable}.InvitesAndUsers where inviteEmail= '${tenantEmail}';`, { timeout: 15000 })
  .then(function (result) {
      const activationToken = result[0].token
      cy.log(activationToken)
      cy.wrap(activationToken).as("wrapToken")
      expect(result[0].inviteEmail).to.equal(`${tenantEmail}`);
      cy.visit(`https://dev1-platform.s37dev.com/activate/${activationToken}`, {failOnStatusCode: false})
  })
}

export class createUsers{
 

    configureTenantAdmin(){ 
        cy.get(userCreation.selectRole).should('contain','Select a role').click()
        cy.get(userCreation.dropDownValue).should('contain','Tenant Admin').click()
        cy.get(userCreation.selectLanguage).click().type('English (United States)')
        cy.get(userCreation.dropDownValue).click()
        cy.get(userCreation.userEmail).click().type(`${tenantEmail}`)
        cy.get(userCreation.confirmBtn).should('contain','Send Invitation(s)').click()

// connecting DB
        dbConnect()

//page 1 agreement page
        cy.get(userCreation.selectLanguage).click().type('English (United States)')
        cy.get(userCreation.dropDownValue).click()
        cy.get(userCreation.createAccountBtn).click()
        cy.get(userCreation.agreeCheckbox1).click()
        cy.get(userCreation.agreeCheckbox2).click()
        // next button
        cy.get(userCreation.nextBtn, { timeout: 10000 }).contains('Next').click()

// page 2 details of tenant
        cy.get(userCreation.userName).click().type('MStenantAdmin '+ randomNumGenerator() + ' ' + selectDayFromCurrent())
        cy.get(userCreation.securityQues).contains('Select a security question').click()
        .type('What was your dream job as a child')
        cy.get(userCreation.dropDownValue).click()
        cy.get(userCreation.securityAns).click().type(`${securityAns}`)
        cy.get(userCreation.pass).click().type(`${userPassword}`)
        cy.get(userCreation.passAgain).click().type(`${userPassword}`)
        cy.get(userCreation.nextBtn, { timeout: 10000 }).contains('Next').click()
        
// page 3 First / Last name
        cy.get(userCreation.firstName).click().type('MS tenant Admin')
        cy.get(userCreation.lastName).click().type(randomNumGenerator())
        cy.get(userCreation.primaryEmail).click().type(`${tenantEmail}`)
        cy.get(userCreation.timeZone).click()
        .type('Pakistan Time (UTC+05:00)', {delay:50} )
        cy.get(userCreation.dropDownValue).click()
        cy.get(userCreation.agreeCheckbox3).click()
        cy.get(userCreation.nextBtn, { timeout: 10000 }).contains('Next').click()
        cy.get(userCreation.validateEmail).should('contain',`${tenantEmail}`)
        cy.get(userCreation.createAccountBtn2, { timeout: 10000 }).contains('Create Account').click()
    }

}
export const navigateToCreateUsers = new createUsers()
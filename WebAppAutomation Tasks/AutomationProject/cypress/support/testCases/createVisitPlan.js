
import { allButtons, config, config1, list, listHeaders, vpBasic, vpForms, vpVisitType } from "../../fixtures/visitPlanPo"

  /* function selectRandomCheckboxWorking(){
        cy.get('[data-c="checkbox-element"]')
        .should('be.visible')
        .and('have.length',2)
        .then($items) = () => {
          return Cypress._.sampleSize($items.toArray(),1)
        .click({multiple:true}) 
    }
      // for(let x=0; x<2; x++){}
      //  cy.get(':nth-child('+randomCheckBoxSelector()+') > .column > .style__FormTypeCard-sc-4uw5cu-5 > .form-type-radio > .field > .radio-control > .control__indicator').click()
} */

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

let visitPlanID = 'Visit plan Title: ' + randomStringGenerator() + selectDayFromCurrent()

export class visitPlanTab{

  
    addNewVisitPlan(){
        cy.get(list.addVisitPlan).click()
        cy.get(vpBasic.vpTitle).click().type(visitPlanID)
        cy.get(vpBasic.vpDesc).click().type('Visit Plan Description: ' + randomStringGenerator())
        cy.get(vpBasic.vpProtocol).click().type('Visit Plan Protocol: ' + randomNumGenerator())
       
    }

    addVisitFields(){
      cy.get(vpVisitType.addVisitType).click()
      cy.get(vpVisitType.visitTitle0).should('contain','Visit Title')
      .find(vpVisitType.visitTitle1).click().type('Visit title-0: ' + randomStringGenerator())
      cy.get(vpVisitType.visitOid).click().type('VisitOid-0:' + randomStringGenerator())
  }

    associateFormToVisits(){

      cy.get(allButtons.vpAddFormsBtn).click()
      cy.get(vpForms.searchForm).click().type('Mustafa ECRF form fixture')
      cy.get(vpForms.selectForm).click()    
      cy.get(vpForms.addFormBtn).click()
      //cy.get(vpForms.associateForm).click({multiple:true})
      cy.get('.selectedWithoutLeft > .style__CheckboxContainer-sc-v8e7kn-4 > .checkbox-container > :nth-child(1) > .checkbox-component > .checkbox-field-wrapper > .field > label')
      .click({multiple:true})
    }  
  
    verifyVisitPlan(){
        cy.get(allButtons.vpSaveBtn, {timeout: 20000}).click()
        cy.wait(10000)
        cy.get(allButtons.vpEclpseBtn, { timeout: 10000 }).click()
        cy.get(allButtons.vpVerifyBtn).click()
        cy.get(allButtons.vpConfirmBtn).click()
    }

    draftVisitPlan(){
        cy.get(allButtons.vpSaveBtn, {timeout: 10000}).click() //#template-save-btn
        cy.wait(10000)
        cy.get(allButtons.vpCloseBtn,{timeout: 10000}).click()
    }
    
    searchVisitPlan(){
      cy.get(vpBasic.vpSearch).click().type(visitPlanID,{delay:30})
}
    addEconsentVisit(){
        this.addVisitFields()
        cy.get(vpVisitType.econsentVisitType).click()
       this.associateFormToVisits() 
       // this.verifyVisitPlan()
       this.draftVisitPlan()
       this.searchVisitPlan()
    }

    addScreeningVisit(){
        this.addVisitFields()
        cy.get(vpVisitType.screeningVisitType).click()
        this.associateFormToVisits()
        // this.verifyVisitPlan()
        this.draftVisitPlan()
        this.searchVisitPlan()
    }

    addEligibilityVisit(){
        this.addVisitFields()
        cy.get(vpVisitType.eligibilityVisitType).click()
        this.associateFormToVisits()
//      this.verifyVisitPlan()
        this.draftVisitPlan()
    }

    addStudyPeriodVisit(){
      this.addVisitFields()
      cy.get(vpVisitType.studyPeriodVisitType).click()
        this.associateFormToVisits()
//      this.verifyVisitPlan()
        this.draftVisitPlan()
    
  }

    addUnscheduledVisit(){
      this.addVisitFields()
      cy.get(vpVisitType.unscheduledVisitType).click()
        this.associateFormToVisits()
//      this.verifyVisitPlan()
        this.draftVisitPlan()
    
    }

}
export const navigateToVisitPlan = new visitPlanTab()
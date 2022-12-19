import { allForms, extra1, extraForm } from "../../fixtures/formBuilderPo";

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

  function formSave(){
    cy.get(extraForm.saveBtnForm).click()
    cy.get(extraForm.eclipseBtnForm).click()
    cy.get(extraForm.publishBtnForm).click()
    cy.get(extraForm.alertBtnForm).click()
  }
export class createForms{

    addECRFFormFixture(){
        cy.get(extraForm.addBtnForm).click()
        cy.get(extraForm.createNewForm).click()
        cy.get(allForms.formTitle).click().type('Mustafa ECRF form fixture ' + randomNumGenerator() + ' ' +  selectDayFromCurrent())
        cy.get(allForms.formLabel).click().type('Mustafa ECRF form fixture')
        cy.get(allForms.formOid).click().type('ECRF form Oid')
        cy.get(allForms.formTypeECRF).click()
        cy.get(allForms.buildTab).click()

        // form controls
    // 1
        cy.get(allForms.textControl).click()
        cy.get(allForms.openTextSetting).click()
        cy.get(allForms.formOid).click().type('Field  Oid: 0' + randomNumGenerator())    
        cy.get(allForms.textTitle).click().type('Field Title: 0' + randomNumGenerator())
        cy.get(allForms.textLabel).click().type(randomStringGenerator() + randomNumGenerator())

    //2
        cy.get(allForms.textAreaControl).click()
        cy.get(allForms.openTextAreaSetting).click()
        cy.get(allForms.textOid).click().type('Field  Oid: 0' + randomNumGenerator()) 
        cy.get(allForms.textTitle).click().type('Field Title: 0' + randomNumGenerator())
        cy.get(allForms.textLabel).click().type(randomStringGenerator() + randomNumGenerator())
        this.formSave()
        
        // cy.get('[data-i="draggable-Dropdown-field"]').click()
        // cy.get('[data-i="draggable-CheckboxGroup-field"]').click()
        // cy.get('[data-i="draggable-DateTime-field"]').click()
        // cy.get('[data-i="draggable-InputNumber-field"]').click()
        // cy.get('[data-i="draggable-FileUpload-field"]').click()
        // cy.get('[data-i="draggable-RatingScale-field"]').click()
        // cy.get('[data-i="draggable-VASRange-field"]').click()
        // cy.get('[data-i="draggable-FormulaView-field"]').click()
    }

    addEPROFormFixture(){
      cy.get(allForms.textControl).click()
      cy.get(allForms.openTextSetting).click()
      cy.get(allForms.formOid).click().type('Field  Oid: 0' + randomNumGenerator())    
      cy.get(allForms.textTitle).click().type('Field Title: 0' + randomNumGenerator())
      cy.get(allForms.textLabel).click().type(randomStringGenerator() + randomNumGenerator())
      cy.get(allForms.formTypeEPRO).click()
      cy.get(allForms.buildTab).click()

        // form controls
    // 1
        cy.get(allForms.textControl).click()
        cy.get(allForms.openTextSetting).click()
        cy.get(allForms.formOid).click().type('Field  Oid: 0' + randomNumGenerator())    
        cy.get(allForms.textTitle).click().type('Field Title: 0' + randomNumGenerator())
        cy.get(allForms.textLabel).click().type(randomStringGenerator() + randomNumGenerator())    
        cy.get(extraForm.checkboxWrapper).click()
       
    //2
        cy.get(allForms.textAreaControl).click()
        cy.get(allForms.openTextAreaSetting).click()   
        cy.get(allForms.textOid).click().type('Field  Oid: 0' + randomNumGenerator()) 
        cy.get(allForms.textTitle).click().type('Field Title: 0' + randomNumGenerator())
        cy.get(allForms.textLabel).click().type(randomStringGenerator() + randomNumGenerator())
        cy.get(extraForm.checkboxWrapper).click()  
        this.formSave()
        
        // cy.get('[data-i="draggable-Dropdown-field"]').click()
        // cy.get('[data-i="draggable-CheckboxGroup-field"]').click()
        // cy.get('[data-i="draggable-DateTime-field"]').click()
        // cy.get('[data-i="draggable-InputNumber-field"]').click()
        // cy.get('[data-i="draggable-FileUpload-field"]').click()
        // cy.get('[data-i="draggable-RatingScale-field"]').click()
        // cy.get('[data-i="draggable-VASRange-field"]').click()
        // cy.get('[data-i="draggable-FormulaView-field"]').click()
    }

    addECONSENTFormFixture(){
      cy.get(allForms.textControl).click()
      cy.get(allForms.openTextSetting).click()
      cy.get(allForms.formOid).click().type('Field  Oid: 0' + randomNumGenerator())    
      cy.get(allForms.textTitle).click().type('Field Title: 0' + randomNumGenerator())
      cy.get(allForms.textLabel).click().type(randomStringGenerator() + randomNumGenerator())
      cy.get(allForms.formTypeEconsent).click()
      cy.get(allForms.buildTab).click()

        // Form controls

  // 1) Text
        cy.get(allForms.textControl).click()
        cy.get(allForms.openTextSetting).click()
        cy.get(allForms.formOid).click().type('Field  Oid: 0' + randomNumGenerator())    
        cy.get(allForms.textTitle).click().type('Field Title: 0' + randomNumGenerator())
        cy.get(allForms.textLabel).click().type(randomStringGenerator() + randomNumGenerator())    
        cy.get(extraForm.checkboxWrapper).click()

  // 2) TextArea
        cy.get(allForms.textAreaControl).click()
        cy.get(allForms.openTextAreaSetting).click()   
        cy.get(allForms.textOid).click().type('Field  Oid: 0' + randomNumGenerator()) 
        cy.get(allForms.textTitle).click().type('Field Title: 0' + randomNumGenerator())
        cy.get(allForms.textLabel).click().type(randomStringGenerator() + randomNumGenerator())
        cy.get(extraForm.checkboxWrapper).click()  
        this.formSave()
        
        // cy.get('[data-i="draggable-Dropdown-field"]').click()
        // cy.get('[data-i="draggable-CheckboxGroup-field"]').click()
        // cy.get('[data-i="draggable-DateTime-field"]').click()
        // cy.get('[data-i="draggable-InputNumber-field"]').click()
        // cy.get('[data-i="draggable-FileUpload-field"]').click()
        // cy.get('[data-i="draggable-RatingScale-field"]').click()
        // cy.get('[data-i="draggable-VASRange-field"]').click()
        // cy.get('[data-i="draggable-FormulaView-field"]').click()
    }  


    addECRFFormVerified(){
        cy.get('[data-i="form-add-button"]').click()
        cy.get('[data-i="form-add-btn"').click()
        cy.get('[data-i="form-setting-title-input-element"]').click().type('ECRF form Title: 0 ' + randomNumGenerator())
        cy.get('[data-i="form-setting-label-input-element"]').click().type('\n' + 'ECRF form Label: 0 ' + randomNumGenerator())
        cy.get('[data-i="form-setting-sponsorVariable-input-element"]').click().type('\n' + 'ECRF form Oid: 0 ' + randomNumGenerator())
        cy.get('[data-i="form-type-ecrf"]').click()
        cy.get('[data-i="form-builder-subheader-tab-Build"]').click()

        // form controls
    // 1
        cy.get('[data-c="draggable-BasicInput-field"]').click()
        cy.get('[data-c="BasicInput-field"]').click()
        cy.get(':nth-child(1) > .basic-input').click().type('Field  Oid: 0' + randomNumGenerator())    
        cy.get('#react-tabs-1 > :nth-child(1) > :nth-child(2)').click().type('Field Title: 0' + randomNumGenerator())
        cy.get('[data-c="FormSettingsRichTextEditor-field"]').click().type(randomStringGenerator() + randomNumGenerator())
      //  cy.wait(1000)
    //2
        cy.get('[data-c="draggable-TextArea-field"]').click()
        cy.get('[data-c="canvas-item-1"]').click()
        cy.get(':nth-child(1) > .basic-input').click().type('Field  Oid: 0' + randomNumGenerator()) 
        cy.get('#react-tabs-1 > :nth-child(1) > :nth-child(2)').click().type('Field Title: 0' + randomNumGenerator())
        cy.get('[data-c="FormSettingsRichTextEditor-field"]').click().type(randomStringGenerator() + randomNumGenerator())
        cy.get('#save-menu').click()
      //  cy.wait(4000)
        cy.get('[data-i="form-builder-header-ellipsis-button"]').click()
        cy.get('[data-i="form-save-publish-btn"]').click()
        cy.get('[data-i="alert-modal-confirm-btn"]').click()
        
        // cy.get('[data-i="draggable-Dropdown-field"]').click()
        // cy.get('[data-i="draggable-CheckboxGroup-field"]').click()
        // cy.get('[data-i="draggable-DateTime-field"]').click()
        // cy.get('[data-i="draggable-InputNumber-field"]').click()
        // cy.get('[data-i="draggable-FileUpload-field"]').click()
        // cy.get('[data-i="draggable-RatingScale-field"]').click()
        // cy.get('[data-i="draggable-VASRange-field"]').click()
        // cy.get('[data-i="draggable-FormulaView-field"]').click()
    }

    addEPROFormVerified(){
        cy.get('[data-i="form-add-button"]').click()
        cy.get('[data-i="form-add-btn"').click()
        cy.get('[data-i="form-setting-title-input-element"]').click().type('EPRO form Title: 0 ' + randomNumGenerator())
        cy.get('[data-i="form-setting-label-input-element"]').click().type('\n' + 'EPRO form Label: 0 ' + randomNumGenerator())
        cy.get('[data-i="form-setting-sponsorVariable-input-element"]').click().type('\n' + 'EPRO form Oid: 0 ' + randomNumGenerator())
        cy.get('[data-i="form-type-epro"]').click()
        cy.get('[data-i="form-builder-subheader-tab-Build"]').click()

        // form controls
    // 1
        cy.get('[data-c="draggable-BasicInput-field"]').click()
        cy.get('[data-c="BasicInput-field"]').click()
        cy.get(':nth-child(1) > .basic-input').click().type('Field  Oid: 0' + randomNumGenerator())
      //  cy.wait(2000)    
        cy.get('#react-tabs-1 > :nth-child(1) > :nth-child(2)').click().type('Field Title: 0' + randomNumGenerator())
        cy.get('[data-c="FormSettingsRichTextEditor-field"]').click().type('Rich text' + randomStringGenerator() + randomNumGenerator())
        cy.get(':nth-child(3) > .styles__CheckboxWrapper-sc-11z37ji-0 > .checkbox-wrapper > :nth-child(2) > .checkbox-component > .checkbox-field-wrapper > .field > label').click()
      //  cy.wait(1000)
    //2
        cy.get('[data-c="draggable-TextArea-field"]').click()
        cy.get('[data-c="canvas-item-1"]').click()
        cy.get(':nth-child(1) > .basic-input').click().type('Field  Oid: 0' + randomNumGenerator()) 
       // cy.wait(2000) 
        cy.get('#react-tabs-1 > :nth-child(1) > :nth-child(2)').click().type('Field Title: 0' + randomNumGenerator())
        cy.get('[data-c="FormSettingsRichTextEditor-field"]').click().type(randomStringGenerator() + randomNumGenerator())
        cy.get(':nth-child(3) > .styles__CheckboxWrapper-sc-11z37ji-0 > .checkbox-wrapper > :nth-child(2) > .checkbox-component > .checkbox-field-wrapper > .field > label').click()
        cy.get('#save-menu').click()
       //cy.wait(3000)
        cy.get('[data-i="form-builder-header-ellipsis-button"]').click()
        cy.get('[data-i="form-save-publish-btn"]').click()
        cy.get('[data-i="alert-modal-confirm-btn"]').click()
        
        // cy.get('[data-i="draggable-Dropdown-field"]').click()
        // cy.get('[data-i="draggable-CheckboxGroup-field"]').click()
        // cy.get('[data-i="draggable-DateTime-field"]').click()
        // cy.get('[data-i="draggable-InputNumber-field"]').click()
        // cy.get('[data-i="draggable-FileUpload-field"]').click()
        // cy.get('[data-i="draggable-RatingScale-field"]').click()
        // cy.get('[data-i="draggable-VASRange-field"]').click()
        // cy.get('[data-i="draggable-FormulaView-field"]').click()
    }

    addECONSENTFormVerified(){
        cy.get('[data-i="form-add-button"]').click()
        cy.get('[data-i="form-add-btn"').click()
        cy.get('[data-i="form-setting-title-input-element"]').click().type('ECONSENT form Title: 0 ' + randomNumGenerator())
        cy.get('[data-i="form-setting-label-input-element"]').click().type('\n' + 'ECONSENT form Label: 0 ' + randomNumGenerator())
        cy.get('[data-i="form-setting-sponsorVariable-input-element"]').click().type('\n' + 'ECONSENT form Oid: 0 ' + randomNumGenerator())
        cy.get('[data-i="form-type-econsent"]').click()
        cy.get('[data-i="form-builder-subheader-tab-Build"]').click()

        // form controls
    // 1
        cy.get('[data-c="draggable-BasicInput-field"]').click()
        cy.get('[data-c="BasicInput-field"]').click()
        cy.get(':nth-child(1) > .basic-input').click().type('Field Oid: 0' + randomNumGenerator())    
       // cy.wait(2000) 
        cy.get('#react-tabs-1 > :nth-child(1) > :nth-child(2)').click().type('Field Title: 0' + randomNumGenerator())
        cy.get('[data-c="FormSettingsRichTextEditor-field"]').click().type('Rich text' + randomStringGenerator() + randomNumGenerator())
        cy.get(':nth-child(3) > .styles__CheckboxWrapper-sc-11z37ji-0 > .checkbox-wrapper > :nth-child(2) > .checkbox-component > .checkbox-field-wrapper > .field > label').click()
       // cy.wait(1000)
    //2
        cy.get('[data-c="draggable-TextArea-field"]').click()
        cy.get('[data-c="canvas-item-1"]').click()
        cy.get(':nth-child(1) > .basic-input').click().type('Field Oid: 0' + randomNumGenerator()) 
       // cy.wait(2000) 
        cy.get('#react-tabs-1 > :nth-child(1) > :nth-child(2)').click().type('Field Title: 0' + randomNumGenerator())
        cy.get('[data-c="FormSettingsRichTextEditor-field"]').click().type(randomStringGenerator() + randomNumGenerator())
        cy.get(':nth-child(3) > .styles__CheckboxWrapper-sc-11z37ji-0 > .checkbox-wrapper > :nth-child(2) > .checkbox-component > .checkbox-field-wrapper > .field > label').click()
        cy.get('#save-menu').click()
       // cy.wait(3000)
        cy.get('[data-i="form-builder-header-ellipsis-button"]').click()
        cy.get('[data-i="form-save-publish-btn"]').click()
        cy.get('[data-i="alert-modal-confirm-btn"]').click()
        
        // cy.get('[data-i="draggable-Dropdown-field"]').click()
        // cy.get('[data-i="draggable-CheckboxGroup-field"]').click()
        // cy.get('[data-i="draggable-DateTime-field"]').click()
        // cy.get('[data-i="draggable-InputNumber-field"]').click()
        // cy.get('[data-i="draggable-FileUpload-field"]').click()
        // cy.get('[data-i="draggable-RatingScale-field"]').click()
        // cy.get('[data-i="draggable-VASRange-field"]').click()
        // cy.get('[data-i="draggable-FormulaView-field"]').click()
    }   
}
export const navigateToForms = new createForms()
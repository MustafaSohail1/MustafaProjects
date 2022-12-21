/// <reference types="cypress" />

import { navigateTologin} from "../../support/testCases/loginPage"
import { navigateToForms } from "../../support/testCases/createForms";
import { navigateTo } from "../../support/testCases/navigationBar";
import { navigateToException } from "../../support/testCases/exceptionHandling";

const { clear } = require("console");
const { STATUS_CODES } = require("http");
const { empty } = require("rxjs")

describe('Login to Dev1', () => {

    it('DD - Creating all type of forms', () => {
        navigateToException.exceptionMethod()
        navigateTologin.login()
        navigateTo.selectStudiesTenant()
        navigateTo.SelectRowFromStudies()
        navigateTo.selectFormsTab()
        navigateToForms.addECRFFormVerified()
       // navigateToForms.addEPROFormVerified()
       // navigateToForms.addECONSENTFormVerified()
        cy.screenshot()
    })

    it.only('DD - Creating Fixture form - Verified', () => {
        navigateToException.exceptionMethod()
        navigateTologin.login()
        navigateTo.selectStudiesTenant()
        navigateTo.SelectRowFromStudies()
        navigateTo.selectFormsTab()
        navigateToForms.addECRFFormFixture()
     // navigateToForms.addEPROFormFixture()
     // navigateToForms.addECONSENTFormFixture()

        cy.screenshot()
    })


    

})



/// <reference types="cypress" />

import { navigateTologin} from "../../support/testCases/loginPage"
import { navigateTo } from "../../support/testCases/navigationBar";
import { navigateToException } from "../../support/testCases/exceptionHandling";
import { navigateToCreateUsers } from "../../support/testCases/createUsers";

const { clear } = require("console");
const { STATUS_CODES } = require("http");
const { empty } = require("rxjs")

describe('Login to Dev1', () => {

    it.only('Creating Tenant User', () => {
        navigateToException.exceptionMethod()
        navigateTologin.loginWithMissionControl()
        navigateTo.selectTenantUsersTab() 
        navigateToCreateUsers.configureTenantAdmin()

    })

    it('Creating Study User', () => {
        navigateToException.exceptionMethod()
        // navigateTologin.login()
        // navigateTo.selectStudiesTenant()
        // navigateTo.SelectRowFromStudies()
        // navigateTo.selectFormsTab()
        // navigateToForms.addECRFFormFixture()
     // navigateToForms.addEPROFormFixture()
     // navigateToForms.addECONSENTFormFixture()
        cy.screenshot()
    })
})
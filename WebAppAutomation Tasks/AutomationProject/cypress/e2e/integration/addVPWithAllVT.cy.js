/// <reference types="cypress" />

import { navigateTologin} from "../../support/testCases/loginPage"
import { navigateToVisitPlan} from "../../support/testCases/createVisitPlan"
import { navigateTo } from "../../support/testCases/navigationBar";
import { navigateToException } from "../../support/testCases/exceptionHandling";

const { clear } = require("console");
const { STATUS_CODES } = require("http");
const { empty } = require("rxjs")

describe('Login to Dev1', () => {

    it('DD - Creating a Visit Plan with all Visit Types ', () => {
        navigateToException.exceptionMethod()
        navigateTologin.login()
        navigateTo.selectStudiesTenant()
        navigateTo.SelectRowFromStudies()
        navigateTo.selectVisitPlanTab()
        navigateToVisitPlan.addNewVisitPlan()
        navigateToVisitPlan.addEconsentVisit()
        cy.screenshot()
    })


    it('DD - Creating a Visit Plan with Screening ', () => {
        navigateToException.exceptionMethod()
        navigateTologin.login()
        navigateTo.selectStudiesTenant()
        navigateTo.SelectRowFromStudies()
        navigateTo.selectVisitPlanTab()
        navigateToVisitPlan.addNewVisitPlan()
        navigateToVisitPlan.addScreeningVisit()
        cy.screenshot()
    })


    it('DD - Creating a Visit Plan with Eligibility ', () => {
        navigateToException.exceptionMethod()
        navigateTologin.login()
        navigateTo.selectStudiesTenant()
        navigateTo.SelectRowFromStudies()
        navigateTo.selectVisitPlanTab()
        navigateToVisitPlan.addNewVisitPlan()
        navigateToVisitPlan.addEligibilityVisit()
        cy.screenshot()
    })


    it('DD - Creating a Visit Plan with Study Period ', () => {
        navigateToException.exceptionMethod()
        navigateTologin.login()
        navigateTo.selectStudiesTenant()
        navigateTo.SelectRowFromStudies()
        navigateTo.selectVisitPlanTab()
        navigateToVisitPlan.addNewVisitPlan()
        navigateToVisitPlan.addStudyPeriodVisit()
        cy.screenshot()
    })


    it('DD - Creating a Visit Plan with Unscheduled ', () => {
        navigateToException.exceptionMethod()
        navigateTologin.login()
        navigateTo.selectStudiesTenant()
        navigateTo.SelectRowFromStudies()
        navigateTo.selectVisitPlanTab()
        navigateToVisitPlan.addNewVisitPlan()
        navigateToVisitPlan.addUnscheduledVisit()
        cy.screenshot()
    })

})



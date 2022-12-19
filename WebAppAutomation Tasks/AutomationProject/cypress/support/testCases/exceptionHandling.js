export class exceptionHandling{

    exceptionMethod(){
    Cypress.on('uncaught:exception', (err, runnable) =>{
        return false;
    })
}
    }
    export const navigateToException = new exceptionHandling()
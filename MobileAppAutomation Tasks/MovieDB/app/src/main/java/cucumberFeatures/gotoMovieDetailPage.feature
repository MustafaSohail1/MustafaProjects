Scenario: Go to the movie Detail Screen page from the Main page.
@Given("^I am at a MovieDB main screen")
@When("^I click on a first movie")
@Then("^I should not see any error")

Scenario: Filter the movie by Popularity basis.
@Given("^I am at Movie detail screen")
@When("^I click on a filter dropdown")
@And("^I Select the Popularity Ascending")
@Then("^I should see Popularity Ascending Movies")
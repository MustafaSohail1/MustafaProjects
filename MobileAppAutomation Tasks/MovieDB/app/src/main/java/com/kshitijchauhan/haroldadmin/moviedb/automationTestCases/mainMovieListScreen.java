package com.kshitijchauhan.haroldadmin.moviedb.automationTestCases;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;

import io.cucumber.java.en.When;


public class mainMovieListScreen {
    public WebDriver driver;

@Test
@When("^I click on a first movie")
    public void movieListScreen() {
    System.setProperty("web-driver.chrome.driver", "../chromedriver.exe");
     driver= new ChromeDriver();
    driver.manage().window().maximize();
    driver.get("https://www.themoviedb.org");

    WebDriverWait wait = new WebDriverWait(driver,10);


    WebElement openMovie =  wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("/html[1]/body[1]/div[1]/main[1]/section[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/section[1]/div[1]/div[1]/div[1]/div[1]/div[1]/a[1]/img[1]")));
    openMovie.click();

    System.out.println("You are on the Main Movie List Screen");
    }

    @Test
    @When("^I click on a filter dropdown")
    public void filterMovies() {
        System.setProperty("web-driver.chrome.driver", "../chromedriver.exe");
         driver= new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://www.themoviedb.org/movie");

        WebDriverWait wait = new WebDriverWait(driver,10);

        WebElement popularityFilterDropdown =  wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//span[@class='k-input' AND @role='option']")));
        popularityFilterDropdown.click();

        WebElement popularityFilterDropdownAsc =  wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//li[@class='k-item' AND @role='option']")));
        popularityFilterDropdownAsc.click();

        WebElement btnSearch =  wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//p[@class='load_more']")));
        btnSearch.click();

        System.out.println("You are on the Top Popular Movie List Screen");
    }
}
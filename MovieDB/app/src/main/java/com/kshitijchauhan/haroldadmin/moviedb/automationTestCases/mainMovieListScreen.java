package com.kshitijchauhan.haroldadmin.moviedb.automationTestCases;

import org.junit.Before;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;


public class mainMovieListScreen {
   @Before
    public void driverSetting(){
       System.out.println("success");
    }
@Test
    public void movieListScreen() {
    System.setProperty("web-driver.chrome.driver", "../chromedriver.exe");
    WebDriver driver= new ChromeDriver();
    driver.manage().window().maximize();
    driver.get("https://www.themoviedb.org");

    WebDriverWait wait = new WebDriverWait(driver,10);

    WebElement openMovie =  wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("#popular_scroller > div > div:nth-child(1) > div.image > div.wrapper > a")));
    openMovie.click();

    WebElement validateName =  wait.until(ExpectedConditions.elementToBeClickable(By.tagName("a")));
    validateName.getAttribute("href=\"/movie/668461-slumberland\"");
    validateName.click();

    System.out.println("You are on the Main Movie List Screen ");
    }

    @Test
    public void filterMovies() {
        System.setProperty("web-driver.chrome.driver", "../chromedriver.exe");
        WebDriver driver= new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://www.themoviedb.org");

        WebDriverWait wait = new WebDriverWait(driver,10);

        WebElement openMovie =  wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("#popular_scroller > div > div:nth-child(1) > div.image > div.wrapper > a")));
        openMovie.click();

        WebElement validateName =  wait.until(ExpectedConditions.elementToBeClickable(By.tagName("a")));
        validateName.getAttribute("href=\"/movie/668461-slumberland\"");
        validateName.click();

        System.out.println("You are on the Main Movie List Screen ");
    }
}

// Import the centralizedPageObjects
import centralizedPageObjects from "./centralizedPageObjects";

// Example test using the centralized page objects
describe("Example Test Suite", () => {
  it("should perform actions on different pages", () => {
    // Access the home page object
    const homePage = centralizedPageObjects.home;

    // Perform actions on the home page
    homePage.getLogo().should("be.visible");

    // Access the login page object
    const loginPage = centralizedPageObjects.login;

    // Perform actions on the login page
    loginPage.getLoginButton().click();

    // Access the dashboard page object
    const dashboardPage = centralizedPageObjects.dashboard;

    // Perform actions on the dashboard page
    dashboardPage.getWelcomeMessage().should("contain", "Welcome");
  });
});

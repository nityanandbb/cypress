import centralizedFunctions from "../../path/to/centralizedFunctions";

// Import the setBaseUrl function
import { setBaseUrl } from '../scripts/setBaseUrl';

// Before each test setup
beforeEach(() => {
  // Set base URL based on environment
  setBaseUrl();

  // Set dynamic viewport
  const viewportWidth = Cypress.env('viewportWidth') || 1280;
  const viewportHeight = Cypress.env('viewportHeight') || 720;
  cy.viewport(viewportWidth, viewportHeight);

  // Log memory usage before the test
  cy.window().then((win) => {
    const memoryBeforeTest = win.performance.memory;
    cy.log('Memory usage before test:');
    cy.log(memoryBeforeTest);
  });
});

// After each test teardown
afterEach(() => {
  // Clear cookies, local storage, and session storage
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();

    // Log memory usage after the test
    const memoryAfterTest = win.performance.memory;
    cy.log('Memory usage after test:');
    cy.log(memoryAfterTest);
  });
});

describe("My Test Suite", () => {
  it("should click on a web element", () => {
    centralizedFunctions.commonUtils.clickingOnWebElement(() =>
      cy.get("selector")
    );
  });

  it("should click on a visible web element", () => {
    centralizedFunctions.commonUtils.clickIfVisible(() => cy.get("selector"));
  });

  it("should click on a link and stay on the same page", () => {
    centralizedFunctions.commonUtils.clickLinkAndStayOnPage(() =>
      cy.get("selector")
    );
  });

  it("should test element visibility with text", () => {
    centralizedFunctions.commonUtils.testElementVisibilityWithHaveText(
      () => cy.get("selector"),
      "Expected Text"
    );
  });

  it("should test element visibility", () => {
    centralizedFunctions.commonUtils.testElementVisibility(() =>
      cy.get("selector")
    );
  });

  it("should login using SFLogin", () => {
    centralizedFunctions.sflogin.login();
  });
});

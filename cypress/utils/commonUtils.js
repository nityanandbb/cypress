// cypress/support/util.js

/**
 * Clicks on a web element.
 * @param {function} locatorEle - Function that returns the locator for the element.
 */
export function clickingOnWebElement(locatorEle) {
  cy.log("Clicking on a web element");
  locatorEle().click();
  cy.log("Clicked on the web element");
}

/**
 * Clicks on a web element if it is visible.
 * @param {function} locatorEle - Function that returns the locator for the element.
 */
export function clickIfVisible(locatorEle) {
  cy.log("Clicking on the web element if it is visible");
  locatorEle().should("be.visible").click();
  cy.log("Clicked on the web element");
}

/**
 * Clicks on a link while staying on the same page.
 * @param {function} locatorEle - Function that returns the locator for the link.
 */
export function clickLinkAndStayOnPage(locatorEle) {
  cy.log("Clicking on the link and staying on the same page");
  locatorEle().should("be.visible").invoke("removeAttr", "target").click();
}

/**
 * Checks if a web element has the expected text.
 * @param {function} locatorElement - Function that returns the locator for the element.
 * @param {string} expText - Expected text of the element.
 */
export function testElementVisibilityWithHaveText(locatorElement, expText) {
  cy.log("Checking if the web element has the expected text");
  locatorElement().should("have.text", expText);
}

/**
 * Checks if a web element is visible.
 * @param {function} locatorElement - Function that returns the locator for the element.
 */
export function testElementVisibility(locatorElement) {
  cy.log("Checking if the web element is visible");
  locatorElement().should("be.visible");
}

/**
 * Checks if a web element is not empty.
 * @param {function} locatorElement - Function that returns the locator for the element.
 */
export function testElementNotEmpty(locatorElement) {
  cy.log("Checking if the web element is not empty");
  locatorElement().should("not.be.empty");
}

/**
 * Checks if a web element is visible, has the expected text, and has the expected font weight.
 * @param {function} locatorElement - Function that returns the locator for the element.
 * @param {string} expectedText - Expected text of the element.
 * @param {string} expectedFontWeight - Expected font weight of the element.
 */
export function testElementVisibleHaveTextAndHaveFontWeight(
  locatorElement,
  expectedText,
  expectedFontWeight
) {
  cy.log(
    "Checking if the web element is visible, has the expected text, and has the expected font weight"
  );
  locatorElement()
    .should("be.visible")
    .and("have.text", expectedText)
    .and("have.css", "font-weight", expectedFontWeight);
}

/**
 * Checks if an input box is visible, neither disabled nor read-only.
 * @param {function} locatorElement - Function that returns the locator for the input box.
 */
export function checkInputBoxIsVisibleEnabledAndEditable(locatorElement) {
  cy.log(
    "Checking if the input box is visible, neither disabled nor read-only"
  );
  locatorElement().should(($input) => {
    expect($input).to.be.visible;
    expect($input).to.not.have.attr("disabled");
    expect($input).to.not.have.attr("readonly");
  });
}

/**
 * Verifies the titles of list items.
 * @param {function} elementLocatorOfList - Function that returns the locator for the list of elements.
 * @param {array} expTitle - Expected titles of the list items.
 */
export function verifyListItemTitles(elementLocatorOfList, expTitle) {
  cy.log("Verifying the titles of list items");
  elementLocatorOfList().each(($ele, index) => {
    cy.wrap($ele)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).equal(expTitle[index]);
      });
  });
}

/**
 * Verifies the titles and URLs of list items.
 * @param {function} elementLocatorOfList - Function that returns the locator for the list of elements.
 * @param {array} expTitle - Expected titles and URLs of the list items.
 */
export function verifyListItemTitlesWithURL(elementLocatorOfList, expTitle) {
  cy.log("Verifying the titles and URLs of list items");
  elementLocatorOfList().each(($ele, index) => {
    cy.wrap($ele)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).equal(expTitle[index].itemTitle);
        cy.wrap($ele)
          .should("include.text", expTitle[index].itemTitle)
          .and("have.attr", "href", expTitle[index].href);
      });
  });
}

/**
 * Verifies the titles and URLs of list items using separate arrays.
 * @param {function} elementLocatorOfList - Function that returns the locator for the list of elements.
 * @param {array} expTitle - Expected titles of the list items.
 * @param {array} exphrefURL - Expected URLs of the list items.
 */
export function verifyListItemTitlesWithURL_Method2(
  elementLocatorOfList,
  expTitle,
  exphrefURL
) {
  cy.log("Verifying the titles and URLs of list items using separate arrays");
  elementLocatorOfList().each(($ele, index) => {
    cy.wrap($ele)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).equal(expTitle[index]);
      });
    cy.wrap($ele)
      .should("include.text", expTitle[index])
      .and("have.attr", "href", exphrefURL[index]);
  });
}

/**
 * Verifies the titles and URLs of list items, excluding target blank URLs.
 * @param {function} elementLocatorOfList - Function that returns the locator for the list of elements.
 * @param {array} expTitle - Expected titles and URLs of the list items.
 */
export function verifyListItemTitlesWithURLAndExcludedLinkItem(
  elementLocatorOfList,
  expTitle
) {
  cy.log(
    "Verifying the titles and URLs of list items, excluding target blank URLs"
  );
  elementLocatorOfList().each(($ele, index) => {
    if ($ele.attr("target") === "_blank") {
      cy.log("Excluding target blank URL");
      cy.wrap($ele)
        .invoke("text")
        .then((text) => {
          expect(text.trim()).equal(expTitle[index].itemTitle);
          return !true;
        });
    } else {
      cy.wrap($ele)
        .invoke("text")
        .then((text) => {
          expect(text.trim()).equal(expTitle[index].itemTitle);
          cy.wrap($ele)
            .should("include.text", expTitle[index].itemTitle)
            .and("have.attr", "href", expTitle[index].href);
        });
    }
  });
}

/**
 * Verifies the options in a dropdown.
 * @param {string} selector - CSS selector for the dropdown.
 * @param {array} expectedOptions - Expected options in the dropdown.
 */
export function verifyDropdownOptions(selector, expectedOptions) {
  cy.log("Verifying the options in a dropdown");
  cy.get(selector).each(($option) => {
    cy.wrap($option)
      .invoke("text")
      .then((text) => {
        const optionText = text.trim();
        expect(expectedOptions).to.include(optionText);
      });
  });
}

/**
 * Clicks on an element if it exists on the page.
 * @param {string} element - CSS selector for the element.
 */
export function clickIfExist(element) {
  cy.log("Clicking on an element if it exists on the page");
  cy.get("body").then((body) => {
    cy.wait(5000).then(() => {
      if (body.find(element).length > 0) {
        cy.get(element).click();
      }
    });
  });
}

/**
 * Retrieves the URLs from a fixture file.
 * @param {string} fixtureFileName - Name of the fixture file.
 * @returns {array} - Array of URLs from the fixture file.
 */
export function urlTest(fixtureFileName) {
  cy.log("Retrieving URLs from a fixture file");
  return cy.fixture(fixtureFileName).then((data) => {
    return data.urls;
  });
}

const { setBaseUrl } = require("../scripts/setBaseUrl");

setBaseUrl();

/**
 * Visits a URL and asserts the expected behavior.
 * @param {string} url - URL to visit.
 * @param {function} verifyfunction - Function to verify the expected behavior.
 */
export function visitAndAssert(url, verifyfunction) {
  cy.log("Visiting a URL and asserting the expected behavior");
  cy.visit(`/${url}`);
  cy.url().should("include", url);
  verifyfunction();
}

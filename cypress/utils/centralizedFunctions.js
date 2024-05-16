import * as commonUtils from "./commonUtils";
import * as login from "./login";

// Proxy object to lazily load functions from commonUtils modules
const lazyCommonUtils = new Proxy(
  {},
  {
    get(target, prop) {
      // Load the functions from the appropriate commonUtils module when accessed
      switch (prop) {
        case "clickingOnWebElement":
          return commonUtils.clickingOnWebElement;
        case "clickIfVisible":
          return commonUtils.clickIfVisible;
        case "testElementVisibilityWithHaveText":
          return commonUtils.testElementVisibilityWithHaveText;
        case "testElementVisibility":
          return commonUtils.testElementVisibility;
        case "clickLinkAndStayOnPage":
          return commonUtils.clickLinkAndStayOnPage;
        // Add more cases as needed for other functions
        default:
          throw new Error(`Unknown function: ${prop}`);
      }
    },
  }
);

// Proxy object to lazily load functions from SFLogin modules
const lazylogin = new Proxy(
  {},
  {
    get(target, prop) {
      // Load the functions from the appropriate SFLogin module when accessed
      switch (prop) {
        case "login":
          return login.login;
        // Add more cases as needed for other functions
        default:
          throw new Error(`Unknown function: ${prop}`);
      }
    },
  }
);

const centralizedFunctions = {
  commonUtils: lazyCommonUtils,
  login: lazylogin,
};

export default centralizedFunctions;

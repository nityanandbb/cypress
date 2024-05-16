// Define URLs as constants
const STAGE_URL = "yourStageURL";
const PROD_URL = "https://www.qed42.com/";
const DEV_URL = "yourDevURL";
const DEFAULT_URL = "https://www.qed42.com/";

// Function to set base URL based on environment
function setBaseUrl() {
  const environment = Cypress.env("environment") || "default"; // default to Prod if not specified

  switch (environment) {
    case "stage":
      Cypress.config("baseUrl", STAGE_URL);
      break;
    case "prod":
      Cypress.config("baseUrl", PROD_URL);
      break;
    case "dev":
      Cypress.config("baseUrl", DEV_URL);
      break;

    default:
      Cypress.config("baseUrl", DEFAULT_URL);
  }
}

module.exports = { setBaseUrl };

// Define a function to handle uncaught exceptions.
const handleUncaughtExceptions = () => {
  // Handle uncaught exceptions from cross-origin scripts
  Cypress.on("uncaught:exception", (err, runnable) => {
    // Log the error to the console
    console.error("Uncaught exception:", err);

    // Prevent the error from failing the test
    return false;
  });

  // Handle uncaught exceptions from promises
  Cypress.on("window:before:load", () => {
    window.onunhandledrejection = function (err) {
      // Log the error to the console.
      console.error("Unhandled promise rejection:", err);

      // Prevent the error from failing the test
      return false;
    };
  });
};

// Export the function to make it available for use in test files
module.exports = {
  handleUncaughtExceptions,
};

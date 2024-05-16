// Import page object classes
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";

// Define page objects for different sections
const centralizedPageObjects = {
  home: new HomePage(),
  login: new LoginPage(),
  dashboard: new DashboardPage(),
};

// Proxy to handle lazy loading
const lazyCentralizedPageObjects = new Proxy(centralizedPageObjects, {
  get(target, prop) {
    // Load the modules lazily
    switch (prop) {
      case "home":
        return new target.home();
      case "login":
        return new target.login();
      case "dashboard":
        return new target.dashboard();
      default:
        return undefined;
    }
  },
});

// Export the lazy-loaded centralizedPageObjects
export default lazyCentralizedPageObjects;

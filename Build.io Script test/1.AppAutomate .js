let wd = require("wd");
let asserters = wd.asserters;

const appURL =
  "ars://connect/start?data=%7B%22dataServicesUrl%22%3A%20%22https%3A%2F%2Fdevdxfxmobile.ars.com%2Ffsa%22%2C%20%22deviceID%22%3A%20%224c22b325-f811-49b2-b697-d721ae59d4a3%22%2C%20%22language%22%3A%20%22en%22%2C%20%22serviceOrderID%22%3A%207784775%2C%20%22token%22%3A%20%22o02ZAvLw5vMiIjCqJ2szOu%2Fsem7xsmqK%2B9Uz0BWnKQqVmrASEdV6HpuOqK4AlbQ4WHh76Z9uYjDqjFY0MhhRdyspq1y7LjJid0NUTVYb9K3yIYkzikRIl0KJcYSJQv%2BSVHubI1WG3fAASz0QRkfYdrxH%2FrAHILOWWLVQKkANh4w%3D%22%7D";

const desiredCaps = {
  // Set your BrowserStack access credentials
  "browserstack.user": "XXXXXXXXX",
  "browserstack.key": "XXXXXXXXX",
  // Set app_url of the application under test
  app: "XXXXXXXXXX",
  // Specify device and os_version for testing
  device: "Samsung Galaxy Tab S7",
  os_version: "11.0",
  // Set other BrowserStack capabilities
  project: "ARS Digital Sales",
  build: "Simple Happy Path",
  name: "simple_happy_path_v1",
  autoGrantPermissions: "true",
  "browserstack.networkLogs": "true",
  "browserstack.idleTimeout": "300",
};
// Initialize the remote Webdriver using BrowserStack remote URL
// and desired capabilities defined above
const driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");

driver
  .init(desiredCaps)
  .then(() => driver.closeApp())
  .then(() => driver.get(appURL))
  .then(() =>
    driver.waitForElementByAccessibilityId(
      "Start Comfort Analysis Button",
      asserters.isDisplayed && asserters.isEnabled,
      250000
    )
  )
  .then((startAnalysisBtn) => {
    return startAnalysisBtn && startAnalysisBtn.click();
  })
  .then(async () => {
    const element = await driver.waitForElementByAndroidUIAutomator(
      'new UiScrollable(new UiSelector().scrollable(true).instance(1)).scrollIntoView(new UiSelector().textContains("Next Step").instance(0))',
      asserters.isDisplayed && asserters.isEnabled,
      3000
    );
    return element;
  })
  .then((nextBtn) => {
    return nextBtn && nextBtn.click();
  })
  .then(async () => {
    const element = await driver.waitForElementByAndroidUIAutomator(
      'new UiScrollable(new UiSelector().scrollable(true).instance(1)).scrollIntoView(new UiSelector().textContains("Next Step").instance(0))',
      asserters.isDisplayed && asserters.isEnabled,
      3000
    );
    return element;
  })
  .then((nextBtn) => {
    return nextBtn && nextBtn.click();
  })
  .then(async () => {
    const element = await driver.waitForElementByAndroidUIAutomator(
      'new UiScrollable(new UiSelector().scrollable(true).instance(1)).scrollIntoView(new UiSelector().textContains("System Selection").instance(0))',
      asserters.isDisplayed && asserters.isEnabled,
      3000
    );
    return element;
  })
  .then((nextBtn) => {
    return nextBtn && nextBtn.click();
  })
  .fin(function () {
    // Invoke driver.quit() after the test is done to indicate that the test is completed.
    return driver.quit();
  })
  .done();

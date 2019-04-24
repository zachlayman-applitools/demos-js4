require('chromedriver');
const { Builder, By } = require('selenium-webdriver');
const { Eyes, Target, VisualGridRunner, ConsoleLogHandler, MatchLevel, BrowserType, CorsIframeHandle } = require('@applitools/eyes-selenium');

let concurrentSessions = 4;
let eyes = new Eyes(new VisualGridRunner(concurrentSessions));
eyes.setLogHandler(new ConsoleLogHandler(false));
eyes.setMatchLevel(MatchLevel.Strict);
eyes.setCorsIframeHandle(CorsIframeHandle.BLANK);
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

eyes.setHideScrollbars(true);
eyes.setForceFullPageScreenshot(false);
const config = eyes.getConfiguration();
config.addBrowser(1024, 768, BrowserType.CHROME);
config.addBrowser(1024, 768, BrowserType.FIREFOX);
eyes.setConfiguration(config);

(async () => {
  var browser = new Builder()
    .forBrowser('chrome')
    .build();

  await eyes.open(browser, "28481", "28481 Test");
  await browser.get("https://indystar.com/?tangent");

  await eyes.check('before', Target.region(By.className('gnt_m_nls')));

  let q = browser.findElement(By.className('gnt_m_nls_em'));
  q.sendKeys('test@xyz.com');
  await eyes.check('after', Target.region(By.className('gnt_m_nls')));

  await eyes.close();
  await browser.quit();
})();
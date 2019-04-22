'use strict';

require('chromedriver');
const { Builder, Capabilities, By } = require('selenium-webdriver');
const { Eyes, Target } = require('@applitools/eyes-selenium');

it("28481", async (done) => {
    (async () => {
        browser.quit();
        const driver = new Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .withCapabilities(Capabilities.chrome())
            .build();

        const eyes = new Eyes();
        eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

        try {
            await driver.get('https://indystar.com/?tangent');
            let q = driver.findElement(By.className('gnt_m_nls_em'));
            await q.sendKeys('test@xyz.com');
            await eyes.open(driver, 'tangent', 'newsletter signup valid email address');
            await eyes.check('viewport', Target.region(By.className('gnt_m_nls')));

            await eyes.close();
        } finally {
            await driver.quit();
            await eyes.abortIfNotClosed();
        }
    })();
});
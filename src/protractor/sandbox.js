'use strict';

require('chromedriver');
const { Builder, Capabilities, By, Key } = require('selenium-webdriver');
const { Eyes, Target } = require('@applitools/eyes-selenium');

it("Sandbox", async (done) => {
    (async () => {
        browser.quit();
        const driver = new Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .withCapabilities(Capabilities.chrome())
            .build();

        const eyes = new Eyes();
        eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

        try {
            await eyes.open(driver, 'Sandbox Test', 'Google Search');

            await driver.get('http://google.com');
            await eyes.check('Home Page', Target.window());

            let q = driver.findElement(By.name('q'));
            await q.sendKeys('cute puppies');
            await q.sendKeys(Key.RETURN);
            await eyes.check('Search Results', Target.window());
            
            await eyes.close();
        } finally {
            await driver.quit();
            await eyes.abortIfNotClosed();
        }
    })();
});
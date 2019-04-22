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
            await eyes.open(driver, '28481', '28481 Test', { width: 1024, height: 768 });

            await driver.get('https://applitools.com/helloworld');
            await eyes.check('Main Page', Target.window());

            await driver.findElement(By.css('button')).click();
            await eyes.check('Click!', Target.window());

            await eyes.close();
        } finally {
            await driver.quit();
            await eyes.abortIfNotClosed();
        }
    })();
});
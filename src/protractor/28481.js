var SDK = require('@applitools/eyes-selenium');
var swd = require('selenium-webdriver');

var eyes = new SDK.Eyes();
var apiKey = process.env.APPLITOOLS_API_KEY;
eyes.setApiKey(apiKey);

eyes.setSaveNewTests(true);
eyes.setBatch("28249");
eyes.setMatchTimeout(20000);
eyes.setForceFullPageScreenshot(true);
eyes.setHideScrollbars(false);
eyes.setStitchMode(SDK.StitchMode.CSS);
// eyes.setMatchLevel(MatchLevel.Strict);

it("28481", async (done) => {
    try {
        await browser.waitForAngularEnabled(false);
        await browser.get("https://indystar.com/?tangent");
        var q = browser.findElement(By.name('email'));
        await q.sendKeys('test@xyz.com');

        let viewportSize = { width: 1024, height: 768 };
        await eyes.open(browser, "28481", "28481 Test", viewportSize);

        await eyes.checkWindow();

        await eyes.close(false);
    }
    finally {
        await eyes.abortIfNotClosed();
        await browser.close();
    }

    done();

});
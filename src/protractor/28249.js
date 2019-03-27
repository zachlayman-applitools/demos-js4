var SDK = require('@applitools/eyes-selenium');

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

it("Small Biz - Home page Visual Test", async (done) => {
    try {
        let viewportSize = { width: 1366, height: 768 };
        await eyes.open(browser, "Yahoo Small Business!", "Home Page Test", viewportSize);
        await browser.waitForAngularEnabled(false);
        // await browser.driver.manage().window().setSize(800, 600);
        await browser.get("https://www.yahoosmallbusiness.com/stores");
        await browser.sleep(5000);

        const targetConfig = SDK.Target.window().fully();
        await eyes.check("yahoo", targetConfig).catch((err) => {
            console.log("Promise Rejected - eyes.checkWindow :" + err.toString());
        });

        let result = await eyes.close(false);

        console.log("Test Name: [" + result.getName() + "], " +
            "Host Browser: [" + result.getHostApp() + "], " +
            "Host O/S: [" + result.getHostOS() + "], " +
            "Host Display Size: [" + result.getHostDisplaySize() + "]"
        );

        let isNewTest = result.getIsNew();
        console.log("Is a new Test ?:" + isNewTest);

        // if (!isNewTest) {
        //     let testStatus = result.getStatus();

        //     expect(result.getIsDifferent()).toBe(false, "Image not matching with baseline for - " + result.getName());
        //     expect(testStatus).toBe(SDK.TestResultsStatus.Passed, "Test is not Passed. Its " + testStatus);
        // }

    } finally {
        await eyes.abortIfNotClosed();
        await browser.close();
    }

    done();

});
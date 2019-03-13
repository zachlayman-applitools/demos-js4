var Webdriver = require('selenium-webdriver');
const { Eyes } = require('@applitools/eyes-selenium');

async function main() {
    var eyes = new Eyes();
    var apiKey = process.env.APPLITOOLS_API_KEY;
    eyes.setApiKey(apiKey);
    var innerDriver = new Webdriver.Builder()
        .withCapabilities(Webdriver.Capabilities.chrome())
        .build();

    var viewportSize = { width: 1024, height: 768 };
    driver = await eyes.open(innerDriver,
        'Zach\'s JS 4 Demo', 'Actaul JS4 4.7 to 4.8', viewportSize);
    //.then(function (driver){ afterOpen(eyes, driver)});
    try {
        var website = "https://applitools.com/helloworld";
        driver.get(website);
        await eyes.checkWindow('initial screen');
        let testResults = await eyes.close(false);
    } finally {
        eyes.abortIfNotClosed();
    }
    innerDriver.quit();                               
}
main();

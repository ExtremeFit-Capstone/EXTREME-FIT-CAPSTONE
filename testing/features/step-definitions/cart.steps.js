const { When } = require('@wdio/cucumber-framework');

When(/^I press Pay Now$/, async () => {
    const payNow = await $('//*[@text="Pay Now"]');
    await payNow.waitForDisplayed({ timeout: 10000 });
    await payNow.click();
    console.log("✅ Pressed Pay Now");
});

// NEW FIXED STEP
When(/^I tap View Order$/, async () => {
    console.log("⏳ Waiting for View Order button...");

    // Give time for backend processing + animation
    await driver.pause(5000);

    // Try 3 possible selectors – React Native sometimes changes them
    const selectors = [
        '//*[@text="View Order"]',
        'android=new UiSelector().textContains("View Order")',
        '//android.widget.Button[contains(@text,"View Order")]'
    ];

    let button = null;

    for (const sel of selectors) {
        try {
            const el = await $(sel);
            if (await el.isDisplayed()) {
                button = el;
                break;
            }
        } catch (_) {}
    }

    if (!button) {
        throw new Error("❌ Could not find the View Order button");
    }

    await button.click();
    console.log("✅ View Order tapped");
});

const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals');

//--------------------------------------------------------
// Home Screen Steps - ULTRA FAST
//--------------------------------------------------------

When(/^I select the unisex gender option$/, async () => {
    const unisexButton = await $('android=new UiSelector().textContains("unisex")');
    await unisexButton.waitForDisplayed({ timeout: 5000 });
    await unisexButton.click();
});

Then(/^I should see the unisex categories$/, async () => {
    const categorySection = await $('//*[@text="Shop by Category"]');
    await categorySection.waitForDisplayed({ timeout: 5000 });
});

Then(/^I should see category options$/, async () => {
    const categoryCard = await $('//*[contains(@text, "items")]');
    await categoryCard.waitForDisplayed({ timeout: 5000 });
});

When(/^I select the "([^"]*)" category$/, async (categoryName) => {
    const category = await $(`android=new UiSelector().textContains("${categoryName.toLowerCase()}")`);
    await category.waitForDisplayed({ timeout: 5000 });
    await category.click();
});

Then(/^I should see the "([^"]*)" products screen$/, async (categoryName) => {
    const productsScreen = await $('//*[contains(@text, "$")]');
    await productsScreen.waitForDisplayed({ timeout: 5000 });
});

When(/^I select the first product$/, async () => {
    const firstProduct = await $('//*[contains(@text, "$")]');
    await firstProduct.waitForDisplayed({ timeout: 5000 });
    await firstProduct.click();
});

Then(/^I should see the product details screen$/, async () => {
    const productDetails = await $('//*[contains(@text, "$")]');
    await productDetails.waitForDisplayed({ timeout: 5000 });
});

When(/^I tap the wishlist heart icon$/, async () => {
    const icons = await $$('//android.view.ViewGroup[@clickable="true"]');
    await icons[1].click(); // No waiting, just click
});

Then(/^the product should be added to my wishlist$/, async () => {
    // Click OK immediately when it appears

    await driver.pause(2000); // 2 seconds should be enough for the API round-trip
    const okButton = await $('//*[@text="OK"]');
    await okButton.waitForDisplayed({ timeout: 3000 });
    await okButton.click();
});

When(/^I navigate back$/, async () => {
    await driver.pause(2000); // 2 seconds should be enough for the API round-trip
    await driver.back();
    await browser.pause(2000); // Minimal pause for navigation
});
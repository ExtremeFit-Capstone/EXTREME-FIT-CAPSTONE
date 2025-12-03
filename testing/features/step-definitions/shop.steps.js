const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');

Given("the product list is displayed", async () => {
    const productListItem = await $('//android.widget.TextView');
    await productListItem.waitForDisplayed({ timeout: 10000 });
});

When('I select the product named {string}', async (productName) => {
    const productCard = await $(`android=new UiSelector().textContains("${productName}")`);
    await productCard.waitForDisplayed({ timeout: 10000 });
    await productCard.click();
    console.log(`✅ Opened ${productName} product details`);
    await driver.pause(3000);
});

Then('I should see the product details screen for {string}', async (productName) => {
    const productDetails = await $(`android=new UiSelector().textContains("${productName}")`);
    await productDetails.waitForDisplayed({ timeout: 5000 });
    expect(await productDetails.isDisplayed()).to.be.true;
    console.log(`✅ Product details screen displayed for ${productName}`);
    await driver.pause(1000);
});

When(/^I tap the heart icon$/, async () => {
    const icons = await $$('//android.view.ViewGroup[@clickable="true"]');
    await icons[1].click(); // No waiting, just click

});


Then('the item should be added to my wishlist', async () => {
    // Wait for the confirmation dialog and click OK
    await driver.pause(2000);
    const okButton = await $('//*[@text="OK"]');
    await okButton.waitForDisplayed({ timeout: 5000 });
    await okButton.click();
    console.log('✅ Product added to wishlist confirmed');
});

When('navigate back', async () => {
    await driver.pause(1000);
    await driver.back();
    await driver.pause(1000);
    console.log('🔙 Navigated back to product list');
});

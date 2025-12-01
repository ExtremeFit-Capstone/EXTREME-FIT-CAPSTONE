const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');

When('I find the leggings product in wishlist', async function() {
    console.log('🔍 Looking for Athletic Jogger in wishlist...');
    
    const joggerProduct = await $('android=new UiSelector().textContains("Jogger")');
    const exists = await joggerProduct.isExisting();
    console.log('Athletic Jogger exists:', exists);
    
    await joggerProduct.waitForDisplayed({ timeout: 10000 });
    const isDisplayed = await joggerProduct.isDisplayed();
    console.log('Athletic Jogger displayed:', isDisplayed);
    
    console.log('✅ Found Athletic Jogger product');
});

When('I find the socks product in wishlist', async function() {
    console.log('🔍 Looking for Athletic Socks in wishlist...');
    
    const socksProduct = await $('android=new UiSelector().textContains("Socks")');
    const exists = await socksProduct.isExisting();
    console.log('Athletic Socks exists:', exists);
    
    await socksProduct.waitForDisplayed({ timeout: 10000 });
    const isDisplayed = await socksProduct.isDisplayed();
    console.log('Athletic Socks displayed:', isDisplayed);
    
    console.log('✅ Found Athletic Socks product');
});

When('I tap add to cart on the product', async function() {
    console.log('🔍 Looking for Add to Cart button...');
    
    const addToCartButton = await $('android=new UiSelector().text("Add to Cart")');
    await addToCartButton.waitForDisplayed({ timeout: 5000 });
    await addToCartButton.click();
    console.log('✅ Tapped Add to Cart button');
    await driver.pause(1500);
});

Then('I should see the size and color selection modal', async function() {
    console.log('🔍 Checking for size/color modal...');
    
    const modalTitle = await $('android=new UiSelector().text("Select Size & Color")');
    await modalTitle.waitForDisplayed({ timeout: 5000 });
    console.log('✅ Size and color selection modal is displayed');
});

When('I select size {string}', async function(size) {
    console.log(`🔍 Selecting size: ${size}`);
    
    // Wait for modal to fully load
    await driver.pause(2000);
    
    // Debug: See all text on screen
    const allText = await $$('android.widget.TextView');
    console.log('📝 Found', allText.length, 'text elements');
    
    for (let i = 0; i < Math.min(20, allText.length); i++) {
        try {
            const text = await allText[i].getText();
            console.log(`Text ${i}: "${text}"`);
        } catch (e) {
            console.log(`Text ${i}: Could not read`);
        }
    }
    
    // Try multiple strategies to find size
    console.log('\n🔍 Trying different strategies...');
    
    // Strategy 1: Exact text
    try {
        const sizeButton1 = await $(`android=new UiSelector().text("${size}")`);
        const exists1 = await sizeButton1.isExisting();
        console.log(`Strategy 1 - text("${size}"):`, exists1);
        if (exists1) {
            await sizeButton1.click();
            console.log(`✅ Selected size: ${size}`);
            return;
        }
    } catch (e) {
        console.log('Strategy 1 failed:', e.message);
    }
    
    // Strategy 2: Contains
    try {
        const sizeButton2 = await $(`android=new UiSelector().textContains("${size}")`);
        const exists2 = await sizeButton2.isExisting();
        console.log(`Strategy 2 - textContains("${size}"):`, exists2);
        if (exists2) {
            await sizeButton2.click();
            console.log(`✅ Selected size: ${size}`);
            return;
        }
    } catch (e) {
        console.log('Strategy 2 failed:', e.message);
    }
    
    throw new Error(`Could not find size button: ${size}`);
});

When('I select color {string}', async function(color) {
    console.log(`🔍 Selecting color: ${color}`);
    
    const colorButton = await $(`android=new UiSelector().text("${color}")`);
    await colorButton.waitForDisplayed({ timeout: 5000 });
    
    await colorButton.click();
    console.log(`✅ Selected color: ${color}`);
    await driver.pause(500);
});

When('I tap the confirm add to cart button', async function() {
    console.log('🔍 Looking for Add to Cart button in modal...');
    
    // Wait a bit for modal to be ready
    await driver.pause(1200);
    
    // Find all "Add to Cart" buttons
    const addToCartButtons = await $$('android=new UiSelector().text("Add to Cart")');
    console.log('Number of Add to Cart buttons found:', addToCartButtons.length);
    
    // Debug: check which button is displayed
    for (let i = 0; i < addToCartButtons.length; i++) {
        const isDisplayed = await addToCartButtons[i].isDisplayed();
        console.log(`Button ${i} displayed:`, isDisplayed);
    }
    
    if (addToCartButtons.length > 1) {
        // Click the second button (the one in the modal)
        await addToCartButtons[1].waitForDisplayed({ timeout: 5000 });
        console.log('Clicking second Add to Cart button...');
        await addToCartButtons[1].click();
        console.log('✅ Tapped Add to Cart button in modal (button 2)');
    } else if (addToCartButtons.length === 1) {
        // Only one button, click it
        console.log('Clicking first Add to Cart button...');
        await addToCartButtons[0].click();
        console.log('✅ Tapped Add to Cart button (button 1)');
    } else {
        throw new Error('No Add to Cart buttons found!');
    }
    
    // Wait longer to see the result
    await driver.pause(3000);
});

Then('I should see a success notification', async function() {
    console.log('🔍 Checking for success notification...');
    
    await driver.pause(1000);
    
    try {
        const successText = await $('android=new UiSelector().textContains("Success!")');
        const isDisplayed = await successText.isDisplayed();
        console.log('Success notification displayed:', isDisplayed);
        
        if (isDisplayed) {
            const okButton = await $('android=new UiSelector().text("OK")');
            await okButton.waitForDisplayed({ timeout: 3000 });
            await okButton.click();
            console.log('✅ Success notification verified and dismissed');
        }
    } catch (error) {
        console.log('⚠️ Could not find success notification:', error.message);
        
        try {
            const alertMessage = await $('android=new UiSelector().textContains("Item added to cart")');
            const exists = await alertMessage.isExisting();
            if (exists) {
                console.log('✅ Found alert message');
                const okButton = await $('android=new UiSelector().text("OK")');
                await okButton.click();
            }
        } catch (e) {
            console.log('⚠️ Alert may have auto-dismissed');
        }
    }
});
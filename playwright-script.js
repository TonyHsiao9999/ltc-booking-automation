const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.ntpc.ltc-car.org/', { timeout: 60000 });

    await page.fill('input#IDNumber', 'A102574899');
    await page.fill('input#password', 'visi319VISI');
    await page.click('a.button-fill:nth-child(2)');
    await page.click('span.dialog-button');

    await page.click('a.link:nth-child(2)');

    await page.selectOption('select#pickUp_location', { index: 2 });
    await page.fill('input#pickUp_address_text', '亞東紀念醫院');
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    await page.click('.location:nth-child(1) > label');

    await page.selectOption('select#getOff_location', { value: '0' });
    await page.selectOption('select#getOff_address', { value: '新北市板橋區中正路1巷18號' });

    await page.selectOption('select#appointment_date', { index: 12 });
    await page.selectOption('select#appointment_hour', '16');
    await page.selectOption('select#appointment_minutes', '40');

    await page.click('.form_item:nth-child(6) .cus_checkbox_type1:nth-child(2) > div');
    await page.selectOption('#accompany_label', '1');
    await page.click('.form_item:nth-child(10) .cus_checkbox_type1:nth-child(2) > div');
    await page.click('.form_item:nth-child(11) .cus_checkbox_type1:nth-child(1) > div');
    await page.click('.form_item:nth-child(12) .cus_checkbox_type1:nth-child(2) > div');

    await page.click('.page_bottom > .button');
    await page.click('button.button-fill:nth-child(2)');

    console.log('✅ 預約完成');
  } catch (err) {
    console.error('❌ 發生錯誤：', err);
  } finally {
    await browser.close();
  }
})();
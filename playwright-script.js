const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    timezoneId: 'Asia/Taipei'
  });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.ntpc.ltc-car.org/', { timeout: 60000 });

    // 處理「我知道了」彈窗
    await page.click('span.dialog-button', { timeout: 3000 });

    // 登入
    await page.fill('input#IDNumber', 'A102574899');
    await page.fill('input#password', 'visi319VISI');
    await page.click('a.button-fill:nth-child(2)');
    await page.click('span.dialog-button');

    // 進入預約頁面
    await page.click('a.link:nth-child(2)');

    // 上車地點與地址
    await page.selectOption('select#pickUp_location', { index: 2 });
    await page.fill('input#pickUp_address_text', '亞東紀念醫院');
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    await page.click('.location:nth-child(1) > label');

    // 下車地點與地址
    await page.selectOption('select#getOff_location', { value: '0' });
    await page.selectOption('select#getOff_address', { value: '新北市板橋區中正路1巷18號' });

    // 選擇時間（例如星期一下午）
    await page.selectOption('select#appointment_date', { index: 12 }); // 請根據需要修改 index
    await page.selectOption('select#appointment_hour', '16');
    await page.selectOption('select#appointment_minutes', '40');

    // 其他選項勾選
    await page.click('.form_item:nth-child(6) .cus_checkbox_type1:nth-child(2) > div'); // 不同意30分鐘前通知
    await page.selectOption('.inner > #accompany_label', { index: 1 }); // 陪同人數 1
    await page.click('.form_item:nth-child(10) .cus_checkbox_type1:nth-child(2) > div'); // 共乘 否
    await page.click('.form_item:nth-child(11) .cus_checkbox_type1:nth-child(1) > div'); // 搭輪椅上車 是
    await page.click('.form_item:nth-child(12) .cus_checkbox_type1:nth-child(2) > div'); // 大型輪椅 否

    // 確認與送出
    await page.click('.page_bottom > .button'); // 確認
    await page.click('button.button-fill:nth-child(2)'); // 送出

    console.log('✅ 預約完成');
  } catch (err) {
    console.error('❌ 發生錯誤:', err);
  } finally {
    await browser.close();
  }
})();

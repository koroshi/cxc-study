const puppeteer = require('puppeteer');

// let phone = {
//      'name': 'Galaxy S5', //设备名
//      'userAgent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/%s Mobile Safari/537.36', //UA
//      'viewport': {
//          'width': 360, //屏幕宽度
//          'height': 640, //屏幕高度
//          'deviceScaleFactor': 3, //缩放比例
//          'isMobile': true, //是否是移动设备
//          'hasTouch': true, //是否支持touch事件
//          'isLandscape': false //是否横屏
//      }
//  };
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices[0];


(async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto('https://y.qq.com');
    await page.screenshot({
        path: 'yqq.png'
    });
    browser.close();
})();
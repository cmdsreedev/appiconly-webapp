import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';
import unzipper from 'unzipper';
async function runTest() {
  const expectedFiles = [
    'downloads/unzipped/android/app/src/main/res/mipmap-hdpi/ic_launcher.png',
    'downloads/unzipped/android/app/src/main/res/mipmap-mdpi/ic_launcher.png',
    'downloads/unzipped/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png',
    'downloads/unzipped/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png',
    'downloads/unzipped/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
    'downloads/unzipped/android/playstore-icon.png',
    'downloads/unzipped/ios/App/Assets.xcassets/AppIcon.appiconset/Icon-App-1024x1024@1x.png',
    'downloads/unzipped/ios/App/Assets.xcassets/AppIcon.appiconset/Icon-App-20x20@1x.png',
    'downloads/unzipped/ios/App/Assets.xcassets/AppIcon.appiconset/Icon-App-20x20@2x.png',
    'downloads/unzipped/ios/App/Assets.xcassets/AppIcon.appiconset/Icon-App-20x20@3x.png',
    'downloads/unzipped/ios/App/Assets.xcassets/AppIcon.appiconset/Icon-App-60x60@2x.png',
    'downloads/unzipped/ios/App/Assets.xcassets/AppIcon.appiconset/Icon-App-60x60@3x.png',
    'downloads/unzipped/ios/App/Assets.xcassets/AppIcon.appiconset/Icon-App-76x76@1x.png',
    'downloads/unzipped/ios/App/Assets.xcassets/AppIcon.appiconset/Icon-App-76x76@2x.png',
    'downloads/unzipped/ios/App/Assets.xcassets/AppIcon.appiconset/Icon-App-83.5x83.5@2x.png',
  ];
  // // Start the Vite preview server and detect the running port
  // const proc = Bun.spawn(['node_modules/.bin/vite', 'preview'], {
  //   stdout: 'pipe',
  //   stderr: 'pipe',
  // });

  // let ready = false;
  // let viteUrl = null;
  // const reader = proc.stdout.getReader();
  // const decoder = new TextDecoder();
  // let loopCount = 0;
  // const maxLoops = 60; // e.g. 30 seconds

  // while (!ready && loopCount < maxLoops) {
  //   const { value, done } = await reader.read();
  //   if (done) break;
  //   const text = decoder.decode(value);
  //   logger(text);
  //   const match = text.match(/http:\/\/localhost:(\d+)/);
  //   if (match) {
  //     viteUrl = `http://localhost:${match[1]}/appiconly-webapp`;
  //     ready = true;
  //   }
  //   loopCount++;
  // }
  // if (!viteUrl) throw new Error('Could not detect Vite preview server port');
  // logger('Detected Vite preview server at:', viteUrl);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  // Set up download directory
  const downloadPath = path.resolve('./downloads');
  await fs.mkdir(downloadPath, { recursive: true });
  // This is a private API but works for Chromium-based Puppeteer
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath,
  });

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 1317,
      height: 1319,
    });
  }
  {
    const targetPage = page;
    await targetPage.goto('http://localhost:4173/appiconly-webapp');
  }
  {
    const targetPage = page;
    // Try multiple selectors for the file input, as the DOM may change or the selector may be different
    const fileInput = await targetPage.waitForSelector("input[data-testid='file-input']", {
      visible: false,
      timeout,
    });
    await fileInput.uploadFile('mock.png');
  }
  {
    const targetPage = page;
    // Click the App Store icon using robust selector logic
    const selectors = [
      '#App\\ Store',
      '[id="App Store"]',
      '[aria-label="App Store (1024x1024)"]',
      '[data-testid="app-store-icon"]',
      'button:has-text("App Store")',
    ];
    let appStoreButton = null;
    for (const selector of selectors) {
      try {
        appStoreButton = await targetPage.waitForSelector(selector, { visible: true, timeout });
        if (appStoreButton) break;
      } catch (e) {}
    }
    if (!appStoreButton) throw new Error('App Store icon not found');
    await appStoreButton.click({ offset: { x: 11.5, y: 0.046875 } });
  }
  {
    const targetPage = page;
    // Click the iPhone Notification 2x icon using robust selector logic
    const selectors = [
      '#iPhone\\ Notification\\ 2x',
      '[id="iPhone Notification 2x"]',
      '[aria-label="iPhone Notification 2x (40x40)"]',
      '[data-testid="iphone-notification-2x-icon"]',
      'button:has-text("iPhone Notification 2x")',
    ];
    let notification2xButton = null;
    for (const selector of selectors) {
      try {
        notification2xButton = await targetPage.waitForSelector(selector, {
          visible: true,
          timeout,
        });
        if (notification2xButton) break;
      } catch (e) {}
    }
    if (!notification2xButton) throw new Error('iPhone Notification 2x icon not found');
    await notification2xButton.click({ offset: { x: 13.5, y: 9.046875 } });
  }
  {
    const targetPage = page;
    // Click the iPhone Notification 3x icon using robust selector logic
    const selectors = [
      '#iPhone\\ Notification\\ 3x',
      '[id="iPhone Notification 3x"]',
      '[aria-label="iPhone Notification 3x (60x60)"]',
      '[data-testid="iphone-notification-3x-icon"]',
      'button:has-text("iPhone Notification 3x")',
    ];
    let notification3xButton = null;
    for (const selector of selectors) {
      try {
        notification3xButton = await targetPage.waitForSelector(selector, {
          visible: true,
          timeout,
        });
        if (notification3xButton) break;
      } catch (e) {}
    }
    if (!notification3xButton) throw new Error('iPhone Notification 3x icon not found');
    await notification3xButton.click({ offset: { x: 10.5, y: 13.046875 } });
  }
  {
    const targetPage = page;
    // Click the iPhone App 2x icon using robust selector logic
    const selectors = [
      '#iPhone\\ App\\ 2x',
      '[id="iPhone App 2x"]',
      '[aria-label="iPhone App 2x (120x120)"]',
      '[data-testid="iphone-app-2x-icon"]',
      'button:has-text("iPhone App 2x")',
    ];
    let app2xButton = null;
    for (const selector of selectors) {
      try {
        app2xButton = await targetPage.waitForSelector(selector, { visible: true, timeout });
        if (app2xButton) break;
      } catch (e) {}
    }
    if (!app2xButton) throw new Error('iPhone App 2x icon not found');
    await app2xButton.click({ offset: { x: 9.5, y: 7.046875 } });
  }
  {
    const targetPage = page;
    // Click the iPhone App 3x icon using robust selector logic
    const selectors = [
      '#iPhone\\ App\\ 3x',
      '[id="iPhone App 3x"]',
      '[aria-label="iPhone App 3x (180x180)"]',
      '[data-testid="iphone-app-3x-icon"]',
      'button:has-text("iPhone App 3x")',
    ];
    let app3xButton = null;
    for (const selector of selectors) {
      try {
        app3xButton = await targetPage.waitForSelector(selector, { visible: true, timeout });
        if (app3xButton) break;
      } catch (e) {}
    }
    if (!app3xButton) throw new Error('iPhone App 3x icon not found');
    await app3xButton.click({ offset: { x: 6.5, y: 11.046875 } });
  }
  {
    const targetPage = page;
    // Click the iPad Notification icon using robust selector logic
    const selectors = [
      '#iPad\\ Notification',
      '[id="iPad Notification"]',
      '[aria-label="iPad Notification (20x20)"]',
      '[data-testid="ipad-notification-icon"]',
      'button:has-text("iPad Notification")',
    ];
    let ipadNotificationButton = null;
    for (const selector of selectors) {
      try {
        ipadNotificationButton = await targetPage.waitForSelector(selector, {
          visible: true,
          timeout,
        });
        if (ipadNotificationButton) break;
      } catch (e) {}
    }
    if (!ipadNotificationButton) throw new Error('iPad Notification icon not found');
    await ipadNotificationButton.click({ offset: { x: 7.5, y: 7.046875 } });
  }
  {
    const targetPage = page;
    // Click the iPad App 1x icon using robust selector logic
    const selectors = [
      '#iPad\\ App\\ 1x',
      '[id="iPad App 1x"]',
      '[aria-label="iPad App 1x (76x76)"]',
      '[data-testid="ipad-app-1x-icon"]',
      'button:has-text("iPad App 1x")',
    ];
    let ipadApp1xButton = null;
    for (const selector of selectors) {
      try {
        ipadApp1xButton = await targetPage.waitForSelector(selector, { visible: true, timeout });
        if (ipadApp1xButton) break;
      } catch (e) {}
    }
    if (!ipadApp1xButton) throw new Error('iPad App 1x icon not found');
    await ipadApp1xButton.click({ offset: { x: 14.5, y: 3.046875 } });
  }
  {
    const targetPage = page;
    // Click the iPad App 2x icon using robust selector logic
    const selectors = [
      '#iPad\\ App\\ 2x',
      '[id="iPad App 2x"]',
      '[aria-label="iPad App 2x (152x152)"]',
      '[data-testid="ipad-app-2x-icon"]',
      'button:has-text("iPad App 2x")',
    ];
    let ipadApp2xButton = null;
    for (const selector of selectors) {
      try {
        ipadApp2xButton = await targetPage.waitForSelector(selector, { visible: true, timeout });
        if (ipadApp2xButton) break;
      } catch (e) {}
    }
    if (!ipadApp2xButton) throw new Error('iPad App 2x icon not found');
    await ipadApp2xButton.click({ offset: { x: 10.5, y: 11.046875 } });
  }
  {
    const targetPage = page;
    // Click the iPad Pro App icon using robust selector logic
    const selectors = [
      '#iPad\\ Pro\\ App',
      '[id="iPad Pro App"]',
      '[aria-label="iPad Pro App (167x167)"]',
      '[data-testid="ipad-pro-app-icon"]',
      'button:has-text("iPad Pro App")',
    ];
    let ipadProAppButton = null;
    for (const selector of selectors) {
      try {
        ipadProAppButton = await targetPage.waitForSelector(selector, { visible: true, timeout });
        if (ipadProAppButton) break;
      } catch (e) {}
    }
    if (!ipadProAppButton) throw new Error('iPad Pro App icon not found');
    await ipadProAppButton.click({ offset: { x: 11.5, y: 10.046875 } });
  }
  {
    const targetPage = page;
    // Click the MDPI icon using robust selector logic
    const selectors = [
      '#MDPI',
      '[id="MDPI"]',
      '[aria-label="MDPI (48x48)"]',
      '[data-testid="mdpi-icon"]',
      'button:has-text("MDPI")',
    ];
    let mdpiButton = null;
    for (const selector of selectors) {
      try {
        mdpiButton = await targetPage.waitForSelector(selector, { visible: true, timeout });
        if (mdpiButton) break;
      } catch (e) {}
    }
    if (!mdpiButton) throw new Error('MDPI icon not found');
    await mdpiButton.click({ offset: { x: 6.5, y: 9.046875 } });
  }
  {
    const targetPage = page;
    // Click the HDPI icon using robust selector logic
    const selectors = [
      '#HDPI',
      '[id="HDPI"]',
      '[aria-label="HDPI (72x72)"]',
      '[data-testid="hdpi-icon"]',
      'button:has-text("HDPI")',
    ];
    let hdpiButton = null;
    for (const selector of selectors) {
      try {
        hdpiButton = await targetPage.waitForSelector(selector, { visible: true, timeout });
        if (hdpiButton) break;
      } catch (e) {}
    }
    if (!hdpiButton) throw new Error('HDPI icon not found');
    await hdpiButton.click({ offset: { x: 11.5, y: 17.046875 } });
  }
  {
    const targetPage = page;
    // Click the XHDPI icon using robust selector logic
    const selectors = [
      '#XHDPI',
      '[id="XHDPI"]',
      '[aria-label="XHDPI (96x96)"]',
      '[data-testid="xhdpi-icon"]',
      'button:has-text("XHDPI")',
    ];
    let xhdpiButton = null;
    for (const selector of selectors) {
      try {
        xhdpiButton = await targetPage.waitForSelector(selector, { visible: true, timeout });
        if (xhdpiButton) break;
      } catch (e) {}
    }
    if (!xhdpiButton) throw new Error('XHDPI icon not found');
    await xhdpiButton.click({ offset: { x: 14.5, y: 12.046875 } });
  }
  {
    const targetPage = page;
    // Click the XXHDPI icon using robust selector logic
    const selectors = [
      '#XXHDPI',
      '[id="XXHDPI"]',
      '[aria-label="XXHDPI (144x144)"]',
      '[data-testid="xxhdpi-icon"]',
      'button:has-text("XXHDPI")',
    ];
    let xxhdpiButton = null;
    for (const selector of selectors) {
      try {
        xxhdpiButton = await targetPage.waitForSelector(selector, { visible: true, timeout });
        if (xxhdpiButton) break;
      } catch (e) {}
    }
    if (!xxhdpiButton) throw new Error('XXHDPI icon not found');
    await xxhdpiButton.click({ offset: { x: 9.5, y: 10.046875 } });
  }
  {
    const targetPage = page;
    // Click the XXXHDPI icon using robust selector logic
    const selectors = [
      '#XXXHDPI',
      '[id="XXXHDPI"]',
      '[aria-label="XXXHDPI (192x192)"]',
      '[data-testid="xxxhdpi-icon"]',
      'button:has-text("XXXHDPI")',
    ];
    let xxxhdpiButton = null;
    for (const selector of selectors) {
      try {
        xxxhdpiButton = await targetPage.waitForSelector(selector, { visible: true, timeout });
        if (xxxhdpiButton) break;
      } catch (e) {}
    }
    if (!xxxhdpiButton) throw new Error('XXXHDPI icon not found');
    await xxxhdpiButton.click({ offset: { x: 10.5, y: 11.046875 } });
  }
  {
    const targetPage = page;
    // Click the Google Play Store icon using robust selector logic
    const selectors = [
      '#Google\\ Play\\ Store',
      '[id="Google Play Store"]',
      '[aria-label="Google Play Store (512x512)"]',
      '[data-testid="google-play-store-icon"]',
      'button:has-text("Google Play Store")',
    ];
    let googlePlayStoreButton = null;
    for (const selector of selectors) {
      try {
        googlePlayStoreButton = await targetPage.waitForSelector(selector, {
          visible: true,
          timeout,
        });
        if (googlePlayStoreButton) break;
      } catch (e) {}
    }
    if (!googlePlayStoreButton) throw new Error('Google Play Store icon not found');
    await googlePlayStoreButton.click({ offset: { x: 10.5, y: 4.046875 } });
  }

  // --- Download handling ---
  // Wait for the download link/button and click it, then handle the download event
  // Try more robust selectors for the download link/button
  logger('Waiting for download button...');
  const downloadLink = await page.waitForSelector('[data-testid="generate-icons"]', {
    visible: true,
    timeout: 5000,
  });
  logger('Clicking download button...');
  await downloadLink.click();

  logger('Waiting for zip file to appear in:', downloadPath);
  let zipFile;
  for (let i = 0; i < 20; i++) {
    // wait up to 10 seconds
    const files = await fs.readdir(downloadPath);
    zipFile = files.find((f) => f.endsWith('.zip'));
    if (zipFile) break;
    await new Promise((res) => setTimeout(res, 500));
    logger('Still waiting for zip file...');
  }
  if (!zipFile) throw new Error('Downloaded zip file not found in downloads directory');
  const zipPath = path.join(downloadPath, zipFile);

  logger('Unzipping:', zipPath);
  const extractPath = path.join(downloadPath, 'unzipped');
  await fs.mkdir(extractPath, { recursive: true });
  await unzipper.Open.file(zipPath).then((d) => d.extract({ path: extractPath, concurrency: 5 }));

  // Recursively walk all files in the unzipped directory
  async function walk(dir) {
    let files = [];
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(await walk(fullPath));
      } else {
        files.push(fullPath);
      }
    }
    return files;
  }

  const allFiles = await walk(extractPath);
  logger('All files in unzipped directory:');
  allFiles.forEach((f) => logger(path.relative(process.cwd(), f)));

  const missingFiles = expectedFiles.filter(
    (f) => !allFiles.map((x) => path.relative(process.cwd(), x)).includes(f)
  );

  if (missingFiles.length === 0) {
    console.log('✅ All expected files are present.');
  } else {
    console.log('❌ Missing files:');
    missingFiles.forEach((f) => logger(f));
  }

  await browser.close();
}

runTest()
  .then(() => {
    {
      console.log('✅ Test completed successfully.');
      process.exit(0);
    }
  })
  .catch((err) => {
    console.error('❌ Test failed:', err);
    process.exit(1);
  });

// Custom logger that checks DEBUG env variable
function logger(...args) {
  if (process.env.DEBUG === 'true') {
    console.log(...args);
  }
}

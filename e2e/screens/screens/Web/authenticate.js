const { spawn } = require('child_process');
const { webkit } = require('playwright');

async function getWebSocketEndpoint() {
  return new Promise((resolve, reject) => {
    const safariProcess = spawn('/Applications/Safari.app/Contents/MacOS/Safari', ['-P', '-d']);

    safariProcess.stdout.on('data', (data) => {
      const output = data.toString();
      const match = output.match(/ws:\/\/[^\s]+\/devtools\/browser\/[^\s]+/);
      if (match) {
        resolve(match[0]);
      }
    });

    safariProcess.stderr.on('data', (data) => {
      reject(`Error: ${data}`);
    });

    safariProcess.on('close', (code) => {
      if (code !== 0) {
        reject(`Safari process exited with code ${code}`);
      }
    });
  });
}

(async () => {
  try {
    // Get the WebSocket endpoint dynamically
    const wsEndpoint = await getWebSocketEndpoint();

    if (wsEndpoint) {
      // Connect to an existing Safari browser instance
      const browser = await webkit.connect({ wsEndpoint });

      // Create a new page
      const pages = await browser.pages();

      if (pages.length > 0) {
        const page = pages[0];

        // Wait for the element to be present (replace 'your_element_selector' accordingly)
        await page.waitForSelector('button:has-text("Submit")', { timeout: 10000 });

        // Click on the element
        await page.click('button:has-text("Submit")');

        // Additional Playwright actions as needed

      } else {
        console.error('No pages available in the connected browser.');
      }

      // Do not close the browser, as it was connected to an existing instance
    } else {
      console.error('Failed to obtain the WebSocket endpoint.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();

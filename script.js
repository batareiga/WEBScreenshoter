const form = document.getElementById('screenshot-form');
const urlInput = document.getElementById('url');
const backgroundColorInput = document.getElementById('background-color');
const textColorInput = document.getElementById('text-color');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get the URL from the input field
  const url = urlInput.value;
  
  // Create a new tab and navigate to the URL
  chrome.tabs.create({ url }, function(tab) {
    // Wait for the tab to finish loading
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if (changeInfo.status === 'complete') {
        // Take a screenshot of the tab
        chrome.tabs.captureVisibleTab(null, {format: "png"}, function(dataUrl) {
          
          // Create a new canvas element with the same dimensions as the tab
          const canvas = document.createElement('canvas');
          canvas.width = tab.window.outerWidth;
          canvas.height = tab.window.outerHeight;
          
          // Get the 2D drawing context of the canvas
          const ctx = canvas.getContext('2d');
          
          // Draw the tab onto the canvas
          ctx.drawImage(dataUrl, 0, 0, canvas.width, canvas.height);
          
          // Get the background color selected by the user
          const backgroundColor = backgroundColorInput.value;
          
          // Set the background color of the canvas
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Get the text color selected by the user
          const textColor = textColorInput.value;
          
          // Add a text label to the screenshot
          const textLabel = 'Screenshot taken at ' + Date.now();
          ctx.font = '18px Arial';
          ctx.fillText(textLabel, 10, 30);
          
          // Convert the canvas to an image and download it
          const imageData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = 'screenshot.png';
          link.href = imageData;
          link.click();
        });
      }
    });
  });
});

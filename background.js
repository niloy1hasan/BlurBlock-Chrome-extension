chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["inject.js"]
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "add-blur-mask") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["inject.js"]
        });
      }
    });
  }
});
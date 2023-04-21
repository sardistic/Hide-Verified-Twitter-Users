chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "toggleHiding") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          files: ["content.js"],
        },
        () => {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: "toggleHiding",
            isHiding: request.isHiding,
          });
        }
      );
    });
  }
});
registerTab();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "toggleHiding") {
    toggleHidingVerifiedPosts(request.isHiding);
  }
  return true;
});

chrome.storage.sync.get("isHiding", (storage) => {
  if (storage.isHiding) {
    toggleHidingVerifiedPosts(storage.isHiding);
  }
});

function registerTab() {
  chrome.runtime.sendMessage({ type: "registerTab" });
}

function updateBlockedCount(count) {
  chrome.runtime.sendMessage({ type: "updateBlockedCount", count });
}

function toggleHidingVerifiedPosts(isHiding) {
  const hideClass = "hidden-verified-user";
  const verifiedBadgeSelector = 'svg[data-testid="icon-verified"]';
  const tweetContainerSelector = "article";

  const verifiedBadges = document.querySelectorAll(verifiedBadgeSelector);

  let blockedCount = 0;

  verifiedBadges.forEach((badge) => {
    let tweetContainer = badge.closest(tweetContainerSelector);
    if (tweetContainer) {
      if (isHiding) {
        tweetContainer.classList.add(hideClass);
        blockedCount++;
      } else {
        tweetContainer.classList.remove(hideClass);
      }
    }
  });

  updateBlockedCount(blockedCount);
}

// Use setInterval to periodically check for changes on the page
setInterval(() => {
  chrome.storage.sync.get("isHiding", (storage) => {
    if (storage.isHiding) {
      toggleHidingVerifiedPosts(storage.isHiding);
    }
  });
}, 1000);

// Add the CSS rule for hiding tweets
const hideStyle = document.createElement("style");
hideStyle.innerHTML = ".hidden-verified-user { display: none !important; }";
document.head.appendChild(hideStyle);
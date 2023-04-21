## Chrome Extension: Hide Verified Posts

This Chrome extension allows you to toggle hiding verified posts on Twitter. When the extension is active, it will hide all tweets from verified users.

<div style="width:100%;height:0px;position:relative;padding-bottom:143.600%;"><iframe src="https://streamable.com/e/aawiqe" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>

### How to use

1. Install the extension in your Chrome browser.
2. Click on the extension icon in the toolbar to toggle between hiding and showing verified posts.
3. The extension will automatically update the display of tweets on the current page according to your preference (hide/show verified posts).

### Code Explanation

- `registerTab()` function sends a message to the background script to register the current tab.
- `updateBlockedCount(count)` function sends a message to the background script to update the count of blocked tweets.
- `toggleHidingVerifiedPosts(isHiding)` function hides or shows verified posts based on the `isHiding` parameter. It also updates the blocked count.
- The `chrome.runtime.onMessage` listener listens for messages from the background script to toggle hiding verified posts.
- The `chrome.storage.sync.get` function gets the current hiding preference from the storage and applies it to the page.
- `setInterval` function is used to periodically check for changes on the page and apply the hiding preference accordingly.
- The `hideStyle` CSS rule is added to the page to enable hiding tweets by adding the `hidden-verified-user` class to the tweet container.

### Additional Notes

- The extension targets verified badges on Twitter using the `verifiedBadgeSelector`.
- It finds the corresponding tweet container using the `tweetContainerSelector`.
- The extension works by adding or removing the `hideClass` ("hidden-verified-user") to the tweet container.
- The hiding preference is stored in `chrome.storage.sync`, allowing the preference to sync across devices.
- The `setInterval` function is used to periodically re-check and apply the hiding preference to ensure it works with the dynamic loading of tweets on Twitter.

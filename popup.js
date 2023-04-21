const toggleSwitch = document.getElementById("toggleSwitch");

toggleSwitch.addEventListener("change", () => {
  chrome.storage.sync.set({ isHiding: toggleSwitch.checked }, () => {
    chrome.runtime.sendMessage({
      type: "toggleHiding",
      isHiding: toggleSwitch.checked,
    });
  });
});

chrome.storage.sync.get("isHiding", (storage) => {
  toggleSwitch.checked = storage.isHiding;
});
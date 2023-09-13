// Function to get the URL of the active tab
function getActiveTabUrl() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (tabs.length > 0) {
			var activeTab = tabs[0];
			if (activeTab.url === undefined) {
				console.log("Active tab URL is undefined");
			} else if (activeTab.url === "chrome://newtab/") {
				console.log("Active tab URL is chrome://newtab/");
			} else {
				var url = new URL(activeTab.url);
				var hostname = url.hostname;
				var path = url.pathname;
				console.log("New tab URL: " + activeTab.url);
				chrome.storage.local.get(['urlList'], function (result) {
					var urlList = result.urlList;
					if (urlList === undefined) {
						urlList = [];
					}
					var index = urlList.findIndex(function (e) { return e.hostname == hostname; });
					if (index === -1) { // -1 means  not found
						console.log("Saving new url");
						urlList.push({
							url: url,
							hostname: hostname,
							path: path,
							timestamp: Date.now(),
						});
						chrome.storage.local.set({ 'urlList': urlList }, function () {
						});
					}
				});
			}
		}
	});
}

// Event listener for when a tab is updated (e.g., when it's refreshed)
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status === "complete") {
		// Tab has finished loading (including refresh)
		getActiveTabUrl();
	}
});

// Event listener for when the extension icon is clicked
// chrome.browserAction.onClicked.addListener(function (tab) {
// 	// Capture the URL of the current active tab when the icon is clicked
// 	getActiveTabUrl();
// });

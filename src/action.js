document.addEventListener('DOMContentLoaded', function () {
	var history = document.getElementById('urlList');
	chrome.storage.local.get(['urlList'], function (result) {
		var urlList = result.urlList;
		if (urlList === undefined) {
			urlList = [];
		}
		if (urlList.length == 0) {
			var li = document.createElement('li');
			li.appendChild(document.createTextNode('No history'));
			history.appendChild(li);
		} else {
			// sort by timestamp
			var sortedUrlList = urlList.sort(function (a, b) {
				return b.timestamp - a.timestamp;
			});
			sortedUrlList.forEach(function (url) {
				var hostname = url.hostname;
				var li = document.createElement('li');
				var span = document.createElement('span');
				var btn = document.createElement('button');
				span.innerHTML = hostname;
				span.classList.add('url');
				span.addEventListener('click', function (e) {
					e.preventDefault();
					console.log(hostname);
					chrome.tabs.create({ url: hostname });
				});
				btn.appendChild(document.createTextNode('Delete'));
				btn.addEventListener('click', function (e) {
					e.preventDefault();
					var index = urlList.findIndex(function (e) { return e.hostname == url.hostname; });
					if (index !== -1) {
						urlList.splice(index, 1);

						chrome.storage.local.set({ 'urlList': urlList }, function () {
							li.remove();
						});
					}
				});
				li.classList.add('urlItem');
				li.appendChild(span);
				li.appendChild(btn);
				history.appendChild(li);
			});
		}
		// chrome.storage.local.get(['is_active'], function (result) {
		// 	console.log('Value currently is ' + result.is_active);
		// 	var statusViewer = document.getElementById('status');
		// 	if (result.is_active) {

		// 	} else {
		// 		statusViewer.innerHTML = 'Not Active';
		// 	}
		// });
	});
});

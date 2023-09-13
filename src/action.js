document.addEventListener('DOMContentLoaded', function () {
	var history = document.getElementById('urlList');
	var clearBtn = document.getElementById('clearBtn');
	var exportTxtBtn = document.getElementById('exportTxtBtn');
	var exportCsvBtn = document.getElementById('exportCsvBtn');

	chrome.storage.local.get(['urlList'], function (result) {
		var urlList = result.urlList;
		if (urlList === undefined) {
			urlList = [];
		}
		if (urlList.length == 0) {
			var span = document.createElement('span');
			span.style.color = 'red';
			span.style.fontWeight = 'bold';
			span.style.fontSize = '20px';
			span.style.textAlign = 'center';
			span.appendChild(document.createTextNode('No history'));
			history.appendChild(span);
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
				span.innerHTML = hostname + ' -- ' + new Date(url.timestamp).toLocaleString();
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

	clearBtn.addEventListener('click', function (e) {
		e.preventDefault();
		chrome.storage.local.set({ 'urlList': [] }, function () {
			history.innerHTML = '';
			var span = document.createElement('span');
			span.appendChild(document.createTextNode('No history'));
			history.appendChild(span);
		});
	});

	exportTxtBtn.addEventListener('click', function (e) {
		e.preventDefault();
		chrome.storage.local.get(['urlList'], function (result) {
			var urlList = result.urlList;
			if (urlList === undefined) {
				urlList = [];
			}
			var text = '';
			urlList.forEach(function (url) {
				text += url.hostname + ',' + url.timestamp + ',' + url.path + '\n';
			});
			var blob = new Blob([text], { type: 'text/plain' });
			var blobURL = URL.createObjectURL(blob);

			// Create an anchor element to trigger the download
			const anchor = document.createElement('a');
			anchor.href = blobURL;
			anchor.download = 'history.txt'; // Set the desired file name

			// Programmatically click the anchor element to initiate the download
			anchor.click();

			// Clean up by revoking the object URL
			URL.revokeObjectURL(blobURL);
		});
	});

	exportCsvBtn.addEventListener('click', function (e) {
		e.preventDefault();
		chrome.storage.local.get(['urlList'], function (result) {
			var urlList = result.urlList;
			if (urlList === undefined) {
				urlList = [];
			}
			var text = '';
			urlList.forEach(function (url) {
				text += url.hostname + ',' + url.timestamp + ',' + url.path + '\n';
			});
			var blob = new Blob([text], { type: 'text/csv' });
			var blobURL = URL.createObjectURL(blob);
			// chrome.downloads.download({
			// 	url: url,
			// 	filename: 'history.csv'
			// });

			// Create an anchor element to trigger the download
			const anchor = document.createElement('a');
			anchor.href = blobURL;
			anchor.download = 'history.csv'; // Set the desired file name

			// Programmatically click the anchor element to initiate the download
			anchor.click();

			// Clean up by revoking the object URL
			URL.revokeObjectURL(blobURL);
		});
	});
});

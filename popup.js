const settings = document.getElementById('settingsLink');
settings.addEventListener('click', function() {
  chrome.tabs.create({ url: 'chrome://extensions/?options=' + chrome.runtime.id });
});

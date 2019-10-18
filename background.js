chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: '#3aa757' }, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.youtube.com' }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // initialize home variables
  chrome.tabs.executeScript(tab.id, {
    file: 'home/initialize.js'
  });
  // initialize video variables
  chrome.tabs.executeScript(tab.id, {
    file: 'video/initialize.js'
  });
  if (tab.status == 'complete') {
    console.log(tab);
    if (tab.url == 'https://www.youtube.com/') {
      // attach ehome mutation listener
      chrome.tabs.executeScript(tab.id, {
        file: 'home/observeHome.js'
      });
    } else if (tab.url.includes('https://www.youtube.com/watch')) {
      // attach related mutation listener
      chrome.tabs.executeScript(tab.id, {
        file: 'video/observeRelated.js'
      });
      // attach comments mutation listener
      chrome.tabs.executeScript(tab.id, {
        file: 'video/observeComments.js'
      });
      // attach endscreen mutation listemer
      chrome.tabs.executeScript(tab.id, {
        file: 'video/observeEndscreen.js'
      });
    }
  }
});

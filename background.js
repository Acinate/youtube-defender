chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({ color: '#3aa757' }, function() {
  //   console.log('The color is green.');
  // });
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

let blockHome = null;
let blockRecommended = null;
let blockComments = null;
let blockRelated = null;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // load settings
  chrome.storage.sync.get('blockHome', function(data) {
    blockHome = data.blockHome;
  });
  chrome.storage.sync.get('blockRecommended', function(data) {
    blockRecommended = data.blockRecommended;
  });
  chrome.storage.sync.get('blockComments', function(data) {
    blockComments = data.blockComments;
  });
  chrome.storage.sync.get('blockRelated', function(data) {
    blockRelated = data.blockRelated;
  });

  // initialize home variables
  chrome.tabs.executeScript(tab.id, {
    file: 'home/initialize.js'
  });
  // initialize video variables
  chrome.tabs.executeScript(tab.id, {
    file: 'video/initialize.js'
  });
  if (tab.status == 'complete') {
    if (tab.url == 'https://www.youtube.com/') {
      if (blockHome) {
        // attach home mutation listener
        chrome.tabs.executeScript(tab.id, {
          file: 'home/observeHome.js'
        });
      }
    } else if (tab.url.includes('https://www.youtube.com/watch')) {
      if (blockRelated) {
        // attach related mutation listener
        chrome.tabs.executeScript(tab.id, {
          file: 'video/observeRelated.js'
        });
      }
      if (blockComments) {
        // attach comments mutation listener
        chrome.tabs.executeScript(tab.id, {
          file: 'video/observeComments.js'
        });
      }
      if (blockRecommended) {
        // attach endscreen mutation listemer
        chrome.tabs.executeScript(tab.id, {
          file: 'video/observeEndscreen.js'
        });
      }
    }
  }
});

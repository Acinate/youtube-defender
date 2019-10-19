ytdBrowse = document.getElementsByTagName('ytd-browse');

dashboard = null;

for (let e of ytdBrowse) {
  const a = 'page-subtype';
  if (e.hasAttribute(a) && e.getAttribute(a) == 'home') {
    dashboard = e;
  }
}

if (dashboard != null && !attached) {
  // console.log('Attaching Mutation Observer to Dashboard');
  config = { attributes: true, childList: true, subtree: true };

  callback = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // console.log('A child node has been added or removed.');
        if (dashboard.innerHTML != '') {
          dashboard.innerHTML = '';
        }
      }
    }
  };

  observer = new MutationObserver(callback);
  observer.observe(dashboard, config);
  attached = true;
}

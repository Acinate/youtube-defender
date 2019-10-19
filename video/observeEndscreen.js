endscreen = document.getElementsByClassName('ytp-endscreen-content')[0];

if (endscreen != null && !attachedEndscreen) {
  // console.log('Attaching Mutation Observer to Endscreen');
  configEndscreen = { attributes: true, childList: true, subtree: true };

  callbackEndscreen = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // console.log('A child node has been added or removed.');
        if (endscreen.innerHTML != '') {
          endscreen.innerHTML = '';
        }
      }
    }
  };

  observerEndscreen = new MutationObserver(callbackEndscreen);
  observerEndscreen.observe(endscreen, configEndscreen);
  attachedEndscreen = true;
}

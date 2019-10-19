related = document.getElementById('related');

if (related != null && !attachedRelated) {
  // console.log('Attaching Mutation Observer to Related');
  configRelated = { attributes: true, childList: true, subtree: true };

  callbackRelated = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // console.log('A child node has been added or removed.');
        if (related.innerHTML != '') {
          related.innerHTML = '';
        }
      }
    }
  };

  observerRelated = new MutationObserver(callbackRelated);
  observerRelated.observe(related, configRelated);
  attachedRelated = true;
}

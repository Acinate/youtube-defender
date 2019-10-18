comments = document.getElementById('comments');

if (comments != null && !attachedComments) {
  console.log('Attaching Mutation Observer to Comments');
  configComments = { attributes: true, childList: true, subtree: true };

  callbackComments = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // console.log('A child node has been added or removed.');
        if (comments.innerHTML != '') {
          comments.innerHTML = '';
        }
      }
    }
  };

  observerComments = new MutationObserver(callbackComments);
  observerComments.observe(comments, configComments);
  attachedComments = true;
}

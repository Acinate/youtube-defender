function initializeSettings() {
  const blockHomeCheckbox = document.getElementById('blockHomeVideos');
  chrome.storage.sync.get('blockHome', function(data) {
    blockHomeCheckbox.checked = data.blockHome;
  });
  blockHomeCheckbox.addEventListener('click', function() {
    const checked = blockHomeCheckbox.checked;
    chrome.storage.sync.set({ blockHome: checked }, function() {
      // console.log(`Check box box is checked: ${checked}`);
    });
  });

  const blockRelatedCheckbox = document.getElementById('blockRelated');
  chrome.storage.sync.get('blockRelated', function(data) {
    blockRelatedCheckbox.checked = data.blockRelated;
  });
  blockRelatedCheckbox.addEventListener('click', function() {
    const checked = blockRelatedCheckbox.checked;
    chrome.storage.sync.set({ blockRelated: checked }, function() {
      // console.log(`Check box is checked: ${checked}`);
    });
  });

  const blockCommentsCheckbox = document.getElementById('blockComments');
  chrome.storage.sync.get('blockComments', function(data) {
    blockCommentsCheckbox.checked = data.blockComments;
  });
  blockCommentsCheckbox.addEventListener('click', function() {
    const checked = blockCommentsCheckbox.checked;
    chrome.storage.sync.set({ blockComments: checked }, function() {
      // console.log(`Check box is checked: ${checked}`);
    });
  });

  const blockRecommendedCheckbox = document.getElementById('blockRecommended');
  chrome.storage.sync.get('blockRecommended', function(data) {
    blockRecommendedCheckbox.checked = data.blockRecommended;
  });
  blockRecommendedCheckbox.addEventListener('click', function() {
    const checked = blockRecommendedCheckbox.checked;
    chrome.storage.sync.set({ blockRecommended: checked }, function() {
      // console.log(`Check box is checked: ${checked}`);
    });
  });
}
initializeSettings();

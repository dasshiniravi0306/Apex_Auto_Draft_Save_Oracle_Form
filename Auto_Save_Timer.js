-- a Dynamic Action: Event → Page Load

var pageItems = [
  'P29_FULL_NAME', 'P29_EMAIL',
  'P29_PHONE_NUMBER', 'P29_DEPARTMENT', 'P29_NOTES'
];

function collectDraftData() {
  var draft = {};
  pageItems.forEach(function(id) {
    draft[id] = apex.item(id).getValue();
  });
  return JSON.stringify(draft);
}

function saveDraft() {
  apex.server.process('SAVE_DRAFT', { x01: collectDraftData() }, {
    dataType: 'json',
    success: function(data) {
      if (data.status === 'saved') {
        apex.item('P29_LAST_SAVED').setValue('Draft auto-saved at ' + data.savedAt);
      }
    },
    error: function() {
      console.warn('Auto-save failed. Will retry next interval.');
    }
  });
}

// Save every 30 seconds
window._autoSaveInterval = setInterval(saveDraft, 30000);

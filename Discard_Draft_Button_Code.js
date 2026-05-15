--Action → Defined by Dynamic Action,

apex.confirm('Discard your saved draft? This cannot be undone.', {
  title: 'Discard Draft',
  okLabel: 'Yes, Discard',
  cancelLabel: 'Cancel',
  callback: function(confirmed) {
    if (confirmed) {
      apex.server.process('CLEAR_DRAFT', {}, {
        dataType: 'json',
        success: function() {
          ['P29_FULL_NAME','P29_EMAIL','P29_PHONE_NUMBER',
           'P29_DEPARTMENT','P29_NOTES','P29_LAST_SAVED']
            .forEach(function(id) { apex.item(id).setValue(''); });
          apex.message.showPageSuccess('Draft discarded.');
          clearInterval(window._autoSaveInterval);
        }
      });
    }
  }
});

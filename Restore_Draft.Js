--Dynamic Action on Page Load

apex.server.process('LOAD_DRAFT', {}, {
  dataType: 'json',
  success: function(data) {
    if (!data.hasDraft || !data.data) { return; }

    var draft = JSON.parse(data.data);
    var restored = false;

    Object.keys(draft).forEach(function(id) {
      if (apex.item(id) && draft[id] !== '' && draft[id] !== null) {
        apex.item(id).setValue(draft[id]);
        restored = true;
      }
    });

    // Only show the message if at least one field had actual data
    if (restored) {
      apex.message.showPageSuccess('Your previous draft has been restored.');
    }
  }
});

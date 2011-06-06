$(function() {
    return ($('header')).miniNotification({
      'message': 'Hello World',
      'callback': function(e, message) {
        $(e).append(message);
      }
    });
  });

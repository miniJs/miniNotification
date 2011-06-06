(function() {
  $(function() {
    $.miniNotification = function(element, options) {
      var $element, defaults, foo_private_method, miniNotification;
      defaults = {
        notificationId: 'mini-notification',
        position: 'top',
        show: true,
        time: 2000,
        effect: 'slide',
        showHideButton: false,
        hideOnClick: true,
        showSpeed: 300,
        hideSpeed: 250,
        showAnimationEasing: '',
        hideAnimationEasing: '',
        onLoad: function() {},
        onShow: function() {},
        onHide: function() {}
      };
      miniNotification = this;
      miniNotification.settings = {};
      $element = $(element);
      miniNotification.init = function() {
        miniNotification.settings = $.extend({}, defaults, options);
        return miniNotification.settings.callback(element, miniNotification.settings.message);
      };
      miniNotification.show = function() {};
      foo_private_method = function() {};
      return miniNotification.init();
    };
    return $.fn.miniNotification = function(options) {
      return this.each(function() {
        var miniNotification;
        if (void 0 === ($(this)).data('miniNotification')) {
          miniNotification = new $.miniNotification(this, options);
          return ($(this)).data('miniNotification', miniNotification);
        }
      });
    };
  });
}).call(this);

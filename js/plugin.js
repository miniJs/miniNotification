(function() {
  $(function() {
    $.miniNotification = function(element, options) {
      var miniNotification, setState, state;
      this.defaults = {
        position: 'top',
        show: true,
        effect: 'slide',
        showHideButton: false,
        hideOnClick: true,
        time: 2000,
        showSpeed: 600,
        hideSpeed: 450,
        showEasing: '',
        hideEasing: '',
        onLoad: function() {},
        onShow: function() {},
        onHide: function() {}
      };
      miniNotification = this;
      state = '';
      this.settings = {};
      this.$element = $(element);
      setState = function(_state) {
        state = _state;
        return console.log(state);
      };
      this.getState = function() {
        return state;
      };
      this.getSetting = function(settingKey) {
        return this.settings[settingKey];
      };
      this.getHiddenCssProps = function() {
        var position;
        position = (this.getSetting('effect')) === 'slide' ? 0 - this.$element.height() : 0;
        return {
          'position': 'absolute',
          'display': 'block',
          'top': (this.getSetting('position')) !== 'bottom' ? position : void 0,
          'bottom': (this.getSetting('position')) === 'bottom' ? position : void 0,
          'opacity': (this.getSetting('effect')) === 'fade' ? 0 : void 0
        };
      };
      this.getVisibleCssProps = function() {
        return {
          'opacity': 1,
          'top': (this.getSetting('position')) !== 'bottom' ? 0 : void 0,
          'bottom': (this.getSetting('position')) === 'bottom' ? 0 : void 0
        };
      };
      this.init = function() {
        setState('hidden');
        this.settings = $.extend({}, this.defaults, options);
        if (this.$element.length) {
          this.$element.css(this.getHiddenCssProps());
          if (this.settings.show) {
            return miniNotification.show();
          }
        }
      };
      this.show = function() {
        setState('showing');
        return this.$element.animate(this.getVisibleCssProps(), this.getSetting('showSpeed'), this.getSetting('showEasing'), function() {
          setState('visible');
          return setTimeout((function() {
            return miniNotification.hide();
          }), miniNotification.settings.time);
        });
      };
      this.hide = function() {
        setState('hiding');
        return this.$element.animate(this.getHiddenCssProps(), this.getSetting('hideSpeed'), this.getSetting('hideEasing'), function() {
          return setState('hidden');
        });
      };
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

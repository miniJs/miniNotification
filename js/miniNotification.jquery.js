(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $(function() {
    $.miniNotification = function(element, options) {
      var getHiddenCssProps, getVisibleCssProps, miniNotification, setState, state;
      this.defaults = {
        position: 'top',
        show: true,
        effect: 'slide',
        opacity: 0.95,
        time: 2000,
        showSpeed: 600,
        hideSpeed: 450,
        showEasing: '',
        hideEasing: '',
        onLoad: function() {},
        onVisible: function() {},
        onHide: function() {},
        onHidden: function() {}
      };
      miniNotification = this;
      state = '';
      this.settings = {};
      this.$element = $(element);
      setState = function(_state) {
        return state = _state;
      };
      getHiddenCssProps = __bind(function() {
        var position;
        position = (this.getSetting('effect')) === 'slide' ? 0 - this.$element.outerHeight() : 0;
        return {
          'position': 'fixed',
          'display': 'block',
          'z-index': 9999999,
          'top': (this.getSetting('position')) !== 'bottom' ? position : void 0,
          'bottom': (this.getSetting('position')) === 'bottom' ? position : void 0,
          'opacity': (this.getSetting('effect')) === 'fade' ? 0 : void 0
        };
      }, this);
      getVisibleCssProps = __bind(function() {
        return {
          'opacity': this.getSetting('opacity'),
          'top': (this.getSetting('position')) !== 'bottom' ? 0 : void 0,
          'bottom': (this.getSetting('position')) === 'bottom' ? 0 : void 0
        };
      }, this);
      this.getState = function() {
        return state;
      };
      this.getSetting = function(settingKey) {
        return this.settings[settingKey];
      };
      this.callSettingFunction = function(functionName) {
        return this.settings[functionName]();
      };
      this.init = function() {
        setState('hidden');
        this.settings = $.extend({}, this.defaults, options);
        if (this.$element.length) {
          this.$element.css(getHiddenCssProps());
          if (this.settings.show) {
            return this.show();
          }
        }
      };
      this.show = function() {
        setState('showing');
        this.callSettingFunction('onLoad');
        return this.$element.animate(getVisibleCssProps(), this.getSetting('showSpeed'), this.getSetting('showEasing'), __bind(function() {
          setState('visible');
          this.callSettingFunction('onVisible');
          return setTimeout((__bind(function() {
            return this.hide();
          }, this)), this.settings.time);
        }, this));
      };
      this.hide = function() {
        setState('hiding');
        this.callSettingFunction('onHide');
        return this.$element.animate(getHiddenCssProps(), this.getSetting('hideSpeed'), this.getSetting('hideEasing'), __bind(function() {
          setState('hidden');
          return this.callSettingFunction('onHidden');
        }, this));
      };
      return this.init();
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

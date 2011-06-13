(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $(function() {
    $.miniNotification = function(element, options) {
      var appendCloseButton, getHiddenCssProps, getVisibleCssProps, setState, state, wrapInnerElement;
      this.defaults = {
        position: 'top',
        show: true,
        effect: 'slide',
        opacity: 0.95,
        time: 4000,
        showSpeed: 600,
        hideSpeed: 450,
        showEasing: '',
        hideEasing: '',
        innerDivClass: 'inner',
        closeButton: false,
        closeButtonText: 'close',
        closeButtonClass: 'close',
        hideOnClick: true,
        onLoad: function() {},
        onVisible: function() {},
        onHide: function() {},
        onHidden: function() {}
      };
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
      wrapInnerElement = __bind(function() {
        this.$elementInner = $('<div />', {
          'class': this.getSetting('innerDivClass')
        });
        return this.$element.wrapInner(this.$elementInner);
      }, this);
      appendCloseButton = __bind(function() {
        var $closeButton;
        $closeButton = $('<a />', {
          'class': this.getSetting('closeButtonClass'),
          'html': this.getSetting('closeButtonText')
        });
        this.$element.children().append($closeButton);
        return $closeButton.bind('click', __bind(function() {
          return this.hide();
        }, this));
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
          wrapInnerElement();
          if (this.getSetting('closeButton')) {
            appendCloseButton();
          }
          this.$element.css(getHiddenCssProps());
          if (this.getSetting('show')) {
            this.show();
          }
          if (this.getSetting('hideOnClick')) {
            return this.$element.bind('click', __bind(function() {
              if (this.getState() !== 'hiding') {
                return this.hide();
              }
            }, this));
          }
        }
      };
      this.show = function() {
        if (this.getState !== 'showing' && this.getStage !== 'visible') {
          setState('showing');
          this.callSettingFunction('onLoad');
          return this.$element.animate(getVisibleCssProps(), this.getSetting('showSpeed'), this.getSetting('showEasing'), __bind(function() {
            setState('visible');
            this.callSettingFunction('onVisible');
            return setTimeout((__bind(function() {
              return this.hide();
            }, this)), this.settings.time);
          }, this));
        }
      };
      this.hide = function() {
        if (this.getState !== 'hiding' && this.getStage !== 'hidden') {
          setState('hiding');
          this.callSettingFunction('onHide');
          return this.$element.animate(getHiddenCssProps(), this.getSetting('hideSpeed'), this.getSetting('hideEasing'), __bind(function() {
            setState('hidden');
            return this.callSettingFunction('onHidden');
          }, this));
        }
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

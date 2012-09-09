
describe('miniNotification', function() {
  var fixtures, options;
  options = {
    position: 'bottom',
    show: false
  };
  fixtures = "<div id='fixtures'>                <div id='notification'>                  <p>The notification has been successfully displayed</p>                </div>              </div>";
  beforeEach(function() {
    setFixtures(fixtures);
    return this.$element = $('#fixtures #notification');
  });
  it('should be available on the jQuery object', function() {
    return expect($.fn.miniNotification).toBeDefined();
  });
  it('should be chainable', function() {
    return expect(this.$element.miniNotification(options)).toBe(this.$element);
  });
  it('should offer default values', function() {
    var plugin;
    plugin = new $.miniNotification(this.$element[0], options);
    return expect(plugin.defaults).toBeDefined();
  });
  it('should overwrites the settings', function() {
    var plugin;
    plugin = new $.miniNotification(this.$element[0], options);
    expect(plugin.settings.position).toBe(options.position);
    return expect(plugin.settings.show).toBe(options.show);
  });
  describe('init', function() {
    it('should wrap the inner element in the div with initDivClass', function() {
      var $innerElement, plugin;
      plugin = new $.miniNotification(this.$element);
      $innerElement = plugin.$element.children().first();
      return expect($innerElement.hasClass(plugin.settings.innerDivClass)).toBeTruthy();
    });
    it('should show the notification by default', function() {
      var plugin;
      plugin = new $.miniNotification(this.$element);
      spyOn(plugin, 'show');
      plugin.init();
      return expect(plugin.show).toHaveBeenCalled();
    });
    it('should not show the notification if show is false', function() {
      var plugin;
      plugin = new $.miniNotification(this.$element, {
        show: false
      });
      spyOn(plugin, 'show');
      plugin.init();
      return expect(plugin.show).not.toHaveBeenCalled();
    });
    it('should add a close button if specified', function() {
      var $innerElement, plugin;
      plugin = new $.miniNotification(this.$element, {
        closeButton: true
      });
      $innerElement = plugin.$element.children().first();
      return expect($innerElement.hasClass(plugin.settings.innerDivClass)).toBeTruthy();
    });
    return it('should not add a close button by default', function() {
      var $innerElement, plugin;
      plugin = new $.miniNotification(this.$element);
      $innerElement = plugin.$element.children().first();
      return expect($innerElement.hasClass(plugin.settings.innerDivClass)).toBeTruthy();
    });
  });
  describe('#show', function() {
    var spyOnShowAnimatewWithOptions;
    spyOnShowAnimatewWithOptions = function(options) {
      var plugin;
      if (options == null) {
        options = {};
      }
      options = $.extend({
        show: false
      }, options);
      plugin = new $.miniNotification(this.$element, options);
      spyOn(plugin.$element, 'animate');
      plugin.show();
      return plugin;
    };
    describe('opacity', function() {
      it('should animate the element to the default opacity if not specified', function() {
        var plugin;
        plugin = spyOnShowAnimatewWithOptions();
        return expect(plugin.$element.animate).toHaveBeenCalledWith({
          opacity: plugin.settings.opacity,
          top: jasmine.any(Number)
        }, jasmine.any(Number), jasmine.any(String), jasmine.any(Function));
      });
      return it('should animate the element to the opacity specified', function() {
        var plugin;
        plugin = spyOnShowAnimatewWithOptions({
          opacity: 0.5
        });
        return expect(plugin.$element.animate).toHaveBeenCalledWith({
          opacity: 0.5,
          top: jasmine.any(Number)
        }, jasmine.any(Number), jasmine.any(String), jasmine.any(Function));
      });
    });
    describe('speed', function() {
      it('should animate the element notification with default show speed', function() {
        var plugin;
        plugin = spyOnShowAnimatewWithOptions();
        return expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), plugin.settings.showSpeed, jasmine.any(String), jasmine.any(Function));
      });
      return it('should animate the element notification with specified show speed', function() {
        var plugin;
        plugin = spyOnShowAnimatewWithOptions({
          showSpeed: 2000
        });
        return expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), 2000, jasmine.any(String), jasmine.any(Function));
      });
    });
    describe('easing', function() {
      it('should animate the element notification with no easing equation by default', function() {
        var plugin;
        plugin = spyOnShowAnimatewWithOptions();
        return expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Number), '', jasmine.any(Function));
      });
      return it('should animate the element notification with specified easing equation', function() {
        var plugin;
        plugin = spyOnShowAnimatewWithOptions({
          showEasing: 'swing'
        });
        return expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Number), 'swing', jasmine.any(Function));
      });
    });
    return describe('time', function() {
      it('should show the notification for how long the time is set in the defaults', function() {
        var plugin;
        spyOn(window, 'setTimeout');
        plugin = new $.miniNotification(this.$element, {
          showSpeed: 0
        });
        return expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), plugin.defaults.time);
      });
      return it('should show the notification for how long the time is manually set', function() {
        spyOn(window, 'setTimeout');
        new $.miniNotification(this.$element, {
          showSpeed: 0,
          time: 1000
        });
        return expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 1000);
      });
    });
  });
  return describe('#show', function() {
    var spyOnHideAnimatewWithOptions;
    spyOnHideAnimatewWithOptions = function(options) {
      var plugin;
      if (options == null) {
        options = {};
      }
      plugin = new $.miniNotification(this.$element, options, {
        show: false
      });
      spyOn(plugin.$element, 'animate');
      spyOn(plugin, 'getState').andReturn('visible');
      plugin.hide();
      return plugin;
    };
    describe('speed', function() {
      it('should animate the element notification with default show speed', function() {
        var plugin;
        plugin = spyOnHideAnimatewWithOptions();
        return expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), plugin.settings.hideSpeed, jasmine.any(String), jasmine.any(Function));
      });
      return it('should animate the element notification with specified hideSpeed speed', function() {
        var plugin;
        plugin = spyOnHideAnimatewWithOptions({
          hideSpeed: 2000
        });
        return expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), 2000, jasmine.any(String), jasmine.any(Function));
      });
    });
    describe('easing', function() {
      it('should animate the element notification with no easing equation by default', function() {
        var plugin;
        plugin = spyOnHideAnimatewWithOptions();
        return expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Number), '', jasmine.any(Function));
      });
      return it('should animate the element notification with specified easing equation', function() {
        var plugin;
        plugin = spyOnHideAnimatewWithOptions({
          hideEasing: 'swing'
        });
        return expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Number), 'swing', jasmine.any(Function));
      });
    });
    return describe('close button', function() {
      it('should not append a close button by default', function() {
        var plugin;
        plugin = new $.miniNotification(this.$element);
        return expect(plugin.$element.find('a.close')).not.toExist();
      });
      describe('set to true', function() {
        describe('with default options', function() {
          beforeEach(function() {
            return this.plugin = new $.miniNotification(this.$element, {
              closeButton: true
            });
          });
          it("should append a close button with css class 'close'", function() {
            return expect(this.plugin.$element.find('a.close')).toExist();
          });
          it("should append a close button with content 'close'", function() {
            return expect(this.plugin.$element.find('a.close')).toHaveHtml(this.plugin.settings.closeButtonText);
          });
          return it("should hide the notification on click", function() {
            spyOn(this.plugin, 'hide');
            this.plugin.$element.click();
            return expect(this.plugin.hide).toHaveBeenCalled();
          });
        });
        return describe('with custom options', function() {
          beforeEach(function() {
            return this.plugin = new $.miniNotification(this.$element, {
              closeButton: true,
              closeButtonClass: 'custom-css-class',
              closeButtonText: 'custom text',
              hideOnClick: false
            });
          });
          it('should append a close button witch custom css class', function() {
            return expect(this.plugin.$element.find('a.custom-css-class')).toExist();
          });
          it("should append a close button with custom text", function() {
            return expect(this.plugin.$element.find('a.custom-css-class')).toHaveHtml('custom text');
          });
          return it("should not hide the notification on click", function() {
            spyOn(this.plugin, 'hide');
            this.plugin.$element.click();
            return expect(this.plugin.hide).not.toHaveBeenCalled();
          });
        });
      });
      return describe('callbacks', function() {
        beforeEach(function() {
          return this.foo = jasmine.createSpy('foo');
        });
        it('should call onLoad callback function when the plugin has beein initialiazed', function() {
          var plugin;
          plugin = new $.miniNotification(this.$element, {
            onLoad: this.foo,
            show: false
          });
          expect(this.foo).not.toHaveBeenCalled();
          plugin.show();
          expect(this.foo).toHaveBeenCalled();
          return expect(this.foo.mostRecentCall.args[0]).toBe(this.$element);
        });
        it('should call onLoad callback function when the plugin has beein initialiazed', function() {
          var plugin;
          plugin = new $.miniNotification(this.$element, {
            onVisible: this.foo,
            show: false,
            showSpeed: 0
          });
          expect(this.foo).not.toHaveBeenCalled();
          plugin.show();
          expect(this.foo).toHaveBeenCalled();
          return expect(this.foo.mostRecentCall.args[0]).toBe(this.$element);
        });
        it('should call onLoad callback function when the plugin has beein initialiazed', function() {
          var plugin;
          plugin = new $.miniNotification(this.$element, {
            onHide: this.foo,
            show: false,
            showSpeed: 0
          });
          expect(this.foo).not.toHaveBeenCalled();
          plugin.show();
          expect(this.foo).not.toHaveBeenCalled();
          plugin.hide();
          expect(this.foo).toHaveBeenCalled();
          return expect(this.foo.mostRecentCall.args[0]).toBe(this.$element);
        });
        return it('should call onLoad callback function when the plugin has beein initialiazed', function() {
          var plugin;
          plugin = new $.miniNotification(this.$element, {
            onHidden: this.foo,
            show: false,
            showSpeed: 0,
            hideSpeed: 0
          });
          expect(this.foo).not.toHaveBeenCalled();
          plugin.show();
          expect(this.foo).not.toHaveBeenCalled();
          plugin.hide();
          expect(this.foo).toHaveBeenCalled();
          return expect(this.foo.mostRecentCall.args[0]).toBe(this.$element);
        });
      });
    });
  });
});

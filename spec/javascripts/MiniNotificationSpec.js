(function() {

  describe('miniNotification', function() {
    var options;
    options = {
      position: 'bottom',
      show: false
    };
    beforeEach(function() {
      loadFixtures('fragment.html');
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
    return describe('show', function() {
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
      describe('position', function() {
        it('should position the notification at the top of the page by default', function() {
          var plugin;
          plugin = spyOnShowAnimatewWithOptions();
          return expect(plugin.$element.animate).toHaveBeenCalledWith({
            top: 0,
            opacity: plugin.settings.opacity
          }, jasmine.any(Number), jasmine.any(String), jasmine.any(Function));
        });
        it('should position the notification at the bottom of the page if specified in the options', function() {
          var plugin;
          plugin = spyOnShowAnimatewWithOptions({
            position: 'bottom'
          });
          return expect(plugin.$element.animate).toHaveBeenCalledWith({
            bottom: 0,
            opacity: plugin.settings.opacity
          }, jasmine.any(Number), jasmine.any(String), jasmine.any(Function));
        });
        it('should position the notification at the top of the page if specified in the options', function() {
          var plugin;
          plugin = spyOnShowAnimatewWithOptions({
            position: 'top'
          });
          return expect(plugin.$element.animate).toHaveBeenCalledWith({
            top: 0,
            opacity: jasmine.any(Number)
          }, jasmine.any(Number), jasmine.any(String), jasmine.any(Function));
        });
        return it('should position the notification at the top of the page if option is invalid', function() {
          var plugin;
          plugin = spyOnShowAnimatewWithOptions({
            position: 'invalid'
          });
          return expect(plugin.$element.animate).toHaveBeenCalledWith({
            top: 0,
            opacity: jasmine.any(Number)
          }, jasmine.any(Number), jasmine.any(String), jasmine.any(Function));
        });
      });
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
      return describe('easing', function() {
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
    });
  });

}).call(this);

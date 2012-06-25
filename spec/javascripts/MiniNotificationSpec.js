(function() {

  describe('miniNotification', function() {
    var options;
    options = {
      position: 'top'
    };
    beforeEach(function() {
      loadFixtures('fragment.html');
      return this.$element = $('#fixtures');
    });
    it('should be available on the jQuery object', function() {
      return expect($.fn.miniNotification).toBeDefined();
    });
    it('should be chainable', function() {
      return expect(this.$element.miniNotification(options)).toBe(this.$element);
    });
    it('should offers default values', function() {
      var plugin;
      plugin = new $.miniNotification(this.$element[0], options);
      return expect(plugin.defaults).toBeDefined();
    });
    return it('should overwrites the settings', function() {
      var plugin;
      plugin = new $.miniNotification(this.$element[0], options);
      return expect(plugin.settings.position).toBe(options.position);
    });
  });

}).call(this);

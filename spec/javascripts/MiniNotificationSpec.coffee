describe 'miniNotification', ->
  options =
    position: 'bottom'
    show: false


  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $('#fixtures #notification')

  it 'should be available on the jQuery object', ->
    expect($.fn.miniNotification).toBeDefined()

  it 'should be chainable', ->
    expect(@$element.miniNotification(options)).toBe @$element

  it 'should offer default values', ->
    plugin = new $.miniNotification(@$element[0], options)

    expect(plugin.defaults).toBeDefined()

  it 'should overwrites the settings', ->
    plugin = new $.miniNotification(@$element[0], options)

    expect(plugin.settings.position).toBe options.position
    expect(plugin.settings.show).toBe options.show

  describe 'show', ->
    spyOnShowAnimatewWithOptions = (options = {}) -> 
      options = $.extend {show: false}, options
      plugin = new $.miniNotification(@$element, options)
      spyOn(plugin.$element, 'animate')
      plugin.show()
      plugin

    describe 'position', ->

      it 'should position the notification at the top of the page by default', ->
        plugin = spyOnShowAnimatewWithOptions()
        
        expect(plugin.$element.animate).toHaveBeenCalledWith({top: 0, opacity: plugin.settings.opacity}, jasmine.any(Number), jasmine.any(String),  jasmine.any(Function))

      it 'should position the notification at the bottom of the page if specified in the options', ->
        plugin = spyOnShowAnimatewWithOptions({position: 'bottom'})
        
        expect(plugin.$element.animate).toHaveBeenCalledWith({bottom: 0, opacity: plugin.settings.opacity}, jasmine.any(Number), jasmine.any(String),  jasmine.any(Function))

      it 'should position the notification at the top of the page if specified in the options', ->
        plugin = spyOnShowAnimatewWithOptions({position: 'top'})
                
        expect(plugin.$element.animate).toHaveBeenCalledWith({top: 0, opacity: jasmine.any(Number)}, jasmine.any(Number), jasmine.any(String),  jasmine.any(Function))

      it 'should position the notification at the top of the page if option is invalid', ->
        plugin = spyOnShowAnimatewWithOptions({position: 'invalid'})
        
        expect(plugin.$element.animate).toHaveBeenCalledWith({top: 0, opacity: jasmine.any(Number)}, jasmine.any(Number), jasmine.any(String),  jasmine.any(Function))

    describe 'opacity', ->
      it 'should animate the element to the default opacity if not specified', ->
        plugin = spyOnShowAnimatewWithOptions()

        expect(plugin.$element.animate).toHaveBeenCalledWith({opacity: plugin.settings.opacity, top: jasmine.any(Number)}, jasmine.any(Number), jasmine.any(String),  jasmine.any(Function))

      it 'should animate the element to the opacity specified', ->
        plugin = spyOnShowAnimatewWithOptions({opacity: 0.5})
                
        expect(plugin.$element.animate).toHaveBeenCalledWith({opacity: 0.5, top: jasmine.any(Number)}, jasmine.any(Number), jasmine.any(String),  jasmine.any(Function))

    describe 'speed', ->
      it 'should animate the element notification with default show speed', ->
        plugin = spyOnShowAnimatewWithOptions()

        expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), plugin.settings.showSpeed, jasmine.any(String),  jasmine.any(Function))

      it 'should animate the element notification with specified show speed', ->
        plugin = spyOnShowAnimatewWithOptions({showSpeed: 2000})
        
        expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), 2000, jasmine.any(String),  jasmine.any(Function))

    describe 'easing', ->
      it 'should animate the element notification with no easing equation by default', ->
        plugin = spyOnShowAnimatewWithOptions()
        
        expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Number), '',  jasmine.any(Function))

      it 'should animate the element notification with specified easing equation', ->
        plugin = spyOnShowAnimatewWithOptions({showEasing: 'swing'})
        
        expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Number), 'swing',  jasmine.any(Function))

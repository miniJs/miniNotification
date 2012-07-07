describe 'miniNotification', ->
  options =
    position: 'bottom'
    show: false
  fixtures = "<div id='fixtures'>
                <div id='notification'>
                  <p>The notification has been successfully displayed</p>
                </div>
              </div>"


  beforeEach ->
    setFixtures fixtures
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

  describe 'init', ->
    it 'should wrap the inner element in the div with initDivClass', ->
      plugin = new $.miniNotification(@$element)
      $innerElement = plugin.$element.children().first()
      expect($innerElement.hasClass(plugin.settings.innerDivClass)).toBeTruthy() 

    it 'should show the notification by default', ->
      plugin = new $.miniNotification(@$element)
      spyOn(plugin, 'show')

      plugin.init()
      expect(plugin.show).toHaveBeenCalled()

    it 'should not show the notification if show is false', ->
      plugin = new $.miniNotification(@$element, {show: false})
      spyOn(plugin, 'show')

      plugin.init()
      expect(plugin.show).not.toHaveBeenCalled()

    it 'should add a close button if specified', ->
      plugin = new $.miniNotification(@$element, {closeButton: true})
      $innerElement = plugin.$element.children().first()
      expect($innerElement.hasClass(plugin.settings.innerDivClass)).toBeTruthy() 

    it 'should not add a close button by default', ->
      plugin = new $.miniNotification(@$element)

      $innerElement = plugin.$element.children().first()
      expect($innerElement.hasClass(plugin.settings.innerDivClass)).toBeTruthy() 


  describe '#show', ->
    spyOnShowAnimatewWithOptions = (options = {}) -> 
      options = $.extend {show: false}, options
      plugin = new $.miniNotification(@$element, options)
      spyOn(plugin.$element, 'animate')
      plugin.show()
      plugin


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

    describe 'time', ->
      it 'should show the notification for how long the time is set in the defaults', ->
        spyOn(window, 'setTimeout')
        plugin = new $.miniNotification(@$element, {showSpeed: 0})

        expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), plugin.defaults.time)

      it 'should show the notification for how long the time is manually set', ->
        spyOn(window, 'setTimeout')
        new $.miniNotification(@$element, {showSpeed: 0, time: 1000})

        expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 1000)


  describe '#show', ->
    spyOnHideAnimatewWithOptions = (options = {}) -> 
      plugin = new $.miniNotification(@$element, options, {show: false})
      spyOn(plugin.$element, 'animate')
      spyOn(plugin, 'getState').andReturn 'visible' # fake its visibility
      plugin.hide()
      plugin

    describe 'speed', ->
      it 'should animate the element notification with default show speed', ->
        plugin = spyOnHideAnimatewWithOptions()
        expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), plugin.settings.hideSpeed, jasmine.any(String),  jasmine.any(Function))

      it 'should animate the element notification with specified hideSpeed speed', ->
        plugin = spyOnHideAnimatewWithOptions({hideSpeed: 2000})
        
        expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), 2000, jasmine.any(String),  jasmine.any(Function))

    describe 'easing', ->
      it 'should animate the element notification with no easing equation by default', ->
        plugin = spyOnHideAnimatewWithOptions()
        
        expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Number), '',  jasmine.any(Function))

      it 'should animate the element notification with specified easing equation', ->
        plugin = spyOnHideAnimatewWithOptions({hideEasing: 'swing'})
        
        expect(plugin.$element.animate).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Number), 'swing',  jasmine.any(Function))

    describe 'close button', ->
      it 'should not append a close button by default', ->
        plugin = new $.miniNotification(@$element)
        expect(plugin.$element.find('a.close')).not.toExist()

      describe 'set to true', ->
        describe 'with default options', ->
          beforeEach ->
            @plugin = new $.miniNotification(@$element, {closeButton: true})

          it "should append a close button with css class 'close'", ->
            expect(@plugin.$element.find('a.close')).toExist()

          it "should append a close button with content 'close'", ->
            expect(@plugin.$element.find('a.close')).toHaveHtml @plugin.settings.closeButtonText

          it "should hide the notification on click", ->
            spyOn(@plugin, 'hide')
            @plugin.$element.click()            
            expect(@plugin.hide).toHaveBeenCalled()


        describe 'with custom options', ->
          beforeEach ->
            @plugin = new $.miniNotification(@$element, {closeButton: true, closeButtonClass: 'custom-css-class', closeButtonText: 'custom text', hideOnClick: false})

          it 'should append a close button witch custom css class', ->
            expect(@plugin.$element.find('a.custom-css-class')).toExist()

          it "should append a close button with custom text", ->
            expect(@plugin.$element.find('a.custom-css-class')).toHaveHtml 'custom text'

          it "should not hide the notification on click", ->
            spyOn(@plugin, 'hide')
            @plugin.$element.click()            
            expect(@plugin.hide).not.toHaveBeenCalled()

      describe 'callbacks', ->
        beforeEach ->
          @foo = jasmine.createSpy('foo')

        it 'should call onLoad callback function when the plugin has beein initialiazed', ->
            plugin = new $.miniNotification(@$element, {onLoad: @foo, show: false})
            expect(@foo).not.toHaveBeenCalled()

            plugin.show()
            expect(@foo).toHaveBeenCalled()
            expect(@foo.mostRecentCall.args[0]).toBe @$element

        it 'should call onLoad callback function when the plugin has beein initialiazed', ->
            plugin = new $.miniNotification(@$element, {onVisible: @foo, show: false, showSpeed: 0})
            expect(@foo).not.toHaveBeenCalled()

            plugin.show()
            expect(@foo).toHaveBeenCalled()
            expect(@foo.mostRecentCall.args[0]).toBe @$element


        it 'should call onLoad callback function when the plugin has beein initialiazed', ->
            plugin = new $.miniNotification(@$element, {onHide: @foo, show: false, showSpeed: 0})

            expect(@foo).not.toHaveBeenCalled()
            plugin.show()
            expect(@foo).not.toHaveBeenCalled()
            plugin.hide()
            expect(@foo).toHaveBeenCalled()
            expect(@foo.mostRecentCall.args[0]).toBe @$element

        it 'should call onLoad callback function when the plugin has beein initialiazed', ->
            plugin = new $.miniNotification(@$element, {onHidden: @foo, show: false, showSpeed: 0, hideSpeed: 0})

            expect(@foo).not.toHaveBeenCalled()
            plugin.show()
            expect(@foo).not.toHaveBeenCalled()
            plugin.hide()
            expect(@foo).toHaveBeenCalled()
            expect(@foo.mostRecentCall.args[0]).toBe @$element




        
      

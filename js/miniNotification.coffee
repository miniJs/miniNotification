#
# miniNotification, a notification plugin for jQuery
# Instructions: http://minijs.com/plugins/8/notification
# By: Matthieu Aussaguel, http://www.mynameismatthieu.com, @mattaussaguel
# Version: 1.0 Stable
# Updated: April 16, 2012
# More info: http://minijs.com/
#

$ ->
    $.miniNotification = (element, options) ->
        @defaults = {
            position         : 'top'     # string, position top or bottom,
            show             : true      # boolean, show on load
            effect           : 'slide'   # notification animation effect 'slide' or 'fade'
            opacity          : 0.95      # number, notification opacity

            time             : 4000      # animation time
            showSpeed        : 600       # number, animation showing speed in milliseconds
            hideSpeed        : 450       # number, animation hiding speed in milliseconds
            
            showEasing       : ''        # string, easing equation on load, must load http:#gsgd.co.uk/sandbox/jquery/easing/
            hideEasing       : ''        # string, easing equation on hide, must load http:#gsgd.co.uk/sandbox/jquery/easing/

            innerDivClass    : 'inner'   # inner wrapper class

            closeButton      : false     # boolean, generate the close button
            closeButtonText  : 'close'   # string, close button text
            closeButtonClass : 'close'   # string, close button text
            hideOnClick      : true      # close notification when clicked

            onLoad           : ->        # Function(notification), called when the notification is being loaded
            onVisible        : ->        # Function(notification), called when the notification is loaded
            onHide           : ->        # Function(notification), called when notification is hiding
            onHidden         : ->        # Function(notification), called when notification is hidden
        }

        # current state of the notification
        state = ''

        # notification settings
        @settings = {}

        # notification element
        @$element = $ element

        #
        # private methods
        #
        setState = (_state) ->
          state = _state

        getHiddenCssProps = =>
          # set notification y position
          position = if (@getSetting 'effect') == 'slide' then (0 - @$element.outerHeight()) else 0
          css = {}

          if (@getSetting 'position') is 'bottom'
            css['bottom'] = position
          else
            css['top'] = position
          if (@getSetting 'effect') is 'fade'
            css['opacity'] = 0
          css

        getVisibleCssProps = =>
          # return css properties object
          css = {
            'opacity'  : (@getSetting 'opacity')
          }
          if (@getSetting 'position') is 'bottom'
            css['bottom'] = 0
          else
            css['top'] = 0
          css
          

        wrapInnerElement = =>
          @$elementInner = $('<div />', { 'class' : (@getSetting 'innerDivClass') })
          @$element.wrapInner @$elementInner

        appendCloseButton = =>
          #append close button to the inner element
          $closeButton = $('<a />', {'class' : (@getSetting 'closeButtonClass'), 'html' : (@getSetting 'closeButtonText')})
          @$element.children().append $closeButton

          # bind click event
          $closeButton.bind('click', =>
            @hide()
          )

        #
        # public methods
        #
        @getState = ->
          state

        @getSetting = (settingKey) ->
          @settings[settingKey]

        @callSettingFunction = (functionName) ->
          @settings[functionName](element)

        @init = ->
            setState 'hidden'

            @settings = $.extend {}, @defaults, options

            # Check the existence of the element
            if @$element.length

              # wrap the notification content for easier styling
              wrapInnerElement()

              # add close button
              appendCloseButton() if (@getSetting 'closeButton')

              # set css properties
              @$element.css(getHiddenCssProps())
                       .css({ display : 'inline' })

              # show notification
              @show() if @getSetting 'show'

              # bind click event
              if @getSetting 'hideOnClick'
                @$element.bind('click', =>
                  if @getState() isnt 'hiding'
                    @hide()
                )


        # Show notification
        @show = ->
          if @getState() isnt 'showing' and @getState() isnt 'visible'
            setState 'showing'
            @callSettingFunction 'onLoad'
            @$element.animate(getVisibleCssProps(), (@getSetting 'showSpeed'), (@getSetting 'showEasing'), =>
              setState 'visible'
              @callSettingFunction 'onVisible'
              setTimeout (=> @hide()), @settings.time
            )

        # hide notification
        @hide = ->
          if @getState() isnt 'hiding' and @getState() isnt 'hidden'
            setState 'hiding'
            @callSettingFunction 'onHide'
            @$element.animate(getHiddenCssProps(), (@getSetting 'hideSpeed'), (@getSetting 'hideEasing'), =>
              setState 'hidden'
              @callSettingFunction 'onHidden'
            )

        # Initialize the notification
        @init()

        this

    $.fn.miniNotification = (options) ->
        return this.each ->
            # Make sure miniNotification hasn't been already attached to the element
            plugin = ($ this).data('miniNotification')
            if plugin == undefined
                plugin = new $.miniNotification this, options
                ($ this).data 'miniNotification', plugin
            else
                plugin.show()

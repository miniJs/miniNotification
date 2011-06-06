#
# Slides, A Slideshow Plugin for jQuery
# Intructions: Coming Soon
# By: Nathan Searles, http://www.mynameismatthieu.com
# Version: 0.1
# Updated: June 6th, 2011

$ ->
    $.miniNotification = (element, options) ->
        @defaults = {
            position: 'top', # string, position top or bottom,
            show: true, # boolean, show on load
            effect: 'slide', #notification animation effect 'slide' or 'fade'

            # showHideButton: false, # generate the hide button
            # hideOnClick: true, # hide notification when clicked

            time: 2000, # animation time
            showSpeed: 600, # number, animation showing speed in milliseconds
            hideSpeed: 450, # number, animation hiding speed in milliseconds
            
            showEasing: '', # string, easing equation on load, must load http:#gsgd.co.uk/sandbox/jquery/easing/
            hideEasing: '', # string, easing equation on hide, must load http:#gsgd.co.uk/sandbox/jquery/easing/

            onLoad: -> , # Function, called when the notification is being loaded
            onVisible: -> ,  # Function, called when the notification is loaded
            onHide: -> , # Function, called when notification is hidding
            onHidden: -> # Function, called when notification is hidden
        }


        miniNotification = this

        # current state of the notification
        state = ''

        # notification settings
        @settings = {}

        # notification element
        @$element = $ element

        # private methods
        setState = (_state) ->
          state = _state

        # public methods
        @getState = ->
          state

        @getSetting = (settingKey) ->
          @settings[settingKey]

        @callSettingFunction = (functionName) ->
          @settings[functionName]()

        @getHiddenCssProps = ->
          # set notification y position
          position = if (@getSetting 'effect') == 'slide' then (0 - @$element.outerHeight()) else 0
          console.log @$element.outerHeight()

          # return css properties
          'position' : 'absolute'
          'display'  : 'block'
          'top'      : position unless (@getSetting 'position') == 'bottom'
          'bottom'   : position if (@getSetting 'position') == 'bottom'
          'opacity'  : 0 if (@getSetting 'effect') == 'fade'
          'z-index'  : 9999999

        @getVisibleCssProps = ->
          # return css properties
          'opacity'  : 1
          'top'      : 0 unless (@getSetting 'position') == 'bottom'
          'bottom'   : 0 if (@getSetting 'position') == 'bottom'


        @init = ->
            setState 'hidden'

            @settings = $.extend {}, @defaults, options

            # Check the existence of the element
            if @$element.length
              # set css properties
              @$element.css @getHiddenCssProps()

              # show notification
              miniNotification.show() if @settings.show


        # Show notification
        @show = ->
          setState 'showing'
          @callSettingFunction 'onLoad'
          @$element.animate(@getVisibleCssProps(), (@getSetting 'showSpeed'), (@getSetting 'showEasing'), ->
            setState 'visible'
            miniNotification.callSettingFunction 'onVisible'
            setTimeout (-> miniNotification.hide()), miniNotification.settings.time
          )

        # hide notification
        @hide = ->
          setState 'hiding'
          @callSettingFunction 'onHide'
          @$element.animate(@getHiddenCssProps(), (@getSetting 'hideSpeed'), (@getSetting 'hideEasing'), ->
            setState 'hidden'
            miniNotification.callSettingFunction 'onHidden'
          )


        # Initialize the notification
        miniNotification.init()

    $.fn.miniNotification = (options) ->
        return this.each ->
            # Make sure miniNotification hasn't been already attached to the element
            if undefined == ($ this).data('miniNotification')
                miniNotification = new $.miniNotification this, options
                ($ this).data 'miniNotification', miniNotification
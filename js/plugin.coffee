$ ->
    $.miniNotification = (element, options) ->
        defaults = {
            notificationId: 'mini-notification',
            position: 'top', # string, position top or bottom,
            show: true, # boolean, show on load
            time: 2000, # animation time
            effect: 'slide', #notification animation effect 'slide' or 'fade'

            showHideButton: false, # generate the hide button
            hideOnClick: true, # hide notification when clicked
            showSpeed: 300, # number, animation showing speed in milliseconds

            hideSpeed: 250, # number, animation hiding speed in milliseconds
            showAnimationEasing: '', # string, easing equation on load, must load http:#gsgd.co.uk/sandbox/jquery/easing/
            hideAnimationEasing: '', # string, easing equation on hide, must load http:#gsgd.co.uk/sandbox/jquery/easing/
            
            
            onLoad: -> , # Function, called when the notification is being loaded
            onShow: -> ,  # Function, called when the notification is loaded
            onHide: -> # Function, called when notification is hidden
        }


        miniNotification = this

        miniNotification.settings = {}

        $element = $ element

        miniNotification.init = ->
            miniNotification.settings = $.extend {}, defaults, options
            miniNotification.settings.callback element, miniNotification.settings.message


        # Public methods
        # Show the notification
        miniNotification.show = ->

        # Private methods
        foo_private_method = ->


        # Initialize the notification
        miniNotification.init()

    $.fn.miniNotification = (options) ->
        return this.each ->
            # Make sure miniNotification hasn't been already attached to the element
            if undefined == ($ this).data('miniNotification')
                miniNotification = new $.miniNotification this, options
                ($ this).data 'miniNotification', miniNotification
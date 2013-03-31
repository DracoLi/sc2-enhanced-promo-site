define [], ->
    if !jQuery.browser.mobile
        # Set up parallax if not mobile
        $('#landing').parallax "50%", 1
        $('#game').parallax "50%", 0.1
        $('#profile').parallax "50%", 0.1
        $('#rankings').parallax "50%", 0.1

    # Set up navigation
    $('#nav a').tooltip
        placement: 'left'

    # Parse Email
    Parse.initialize("K56c7l2dF36xoDdMsQF8KND5yHirjqUFFblHcfdO", "JnFjXwGeZuvt8WVeWd0348xqXv3QzNohhiewUFdG");
    NotifyEmail = Parse.Object.extend "NotifyEmail"
    re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    $('#get_notified').submit ->
        # Validate email before trying to save
        email = $(@).find('#emailInput').val()

        # Email validation
        if email.length == 0 or not re.test(email)
            $('.result-msg').html "Please provide a valid email"
            return false

        # Once email is valid, save email on parse
        notifyEmail = new NotifyEmail
            email: email
        notifyEmail.save null,
            success: (notifyEmail) ->
                $('.result-msg').addClass('success').html "Email Saved"
                $('#emailInput').attr('disabled', true)
                $('#get_notified .submit').addClass('disabled')
            error: (notifyEmail, error) ->
                $('.result-msg').html error.message

        return false



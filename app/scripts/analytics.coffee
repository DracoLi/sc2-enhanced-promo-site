define [], ->
    # Mixpanel

    # Track navigations
    $('#nav li a').click ->
        title = $(this).data('originalTitle')
        mixpanel.track("#{title} Clicked");

    # Track facebook clicks
    $('#facebook').click ->
        mixpanel.track("Facebook Clicked");

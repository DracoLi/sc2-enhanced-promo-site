(function() {

  define([], function() {
    var NotifyEmail, re;
    if (!jQuery.browser.mobile) {
      $('#landing').parallax("50%", 1);
      $('#game').parallax("50%", 0.1);
      $('#profile').parallax("50%", 0.1);
      $('#rankings').parallax("50%", 0.1);
    }
    $('#nav a').tooltip({
      placement: 'left'
    });
    Parse.initialize("K56c7l2dF36xoDdMsQF8KND5yHirjqUFFblHcfdO", "JnFjXwGeZuvt8WVeWd0348xqXv3QzNohhiewUFdG");
    NotifyEmail = Parse.Object.extend("NotifyEmail");
    re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return $('#get_notified').submit(function() {
      var email, notifyEmail;
      email = $(this).find('#emailInput').val();
      if (email.length === 0 || !re.test(email)) {
        $('.result-msg').html("Please provide a valid email");
        return false;
      }
      notifyEmail = new NotifyEmail({
        email: email
      });
      notifyEmail.save(null, {
        success: function(notifyEmail) {
          $('.result-msg').addClass('success').html("Email Saved");
          $('#emailInput').attr('disabled', true);
          return $('#get_notified .submit').addClass('disabled');
        },
        error: function(notifyEmail, error) {
          return $('.result-msg').html(error.message);
        }
      });
      return false;
    });
  });

}).call(this);

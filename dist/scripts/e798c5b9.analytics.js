(function() {

  define([], function() {
    $('#nav li a').click(function() {
      var title;
      title = $(this).data('originalTitle');
      return mixpanel.track("" + title + " Clicked");
    });
    return $('#facebook').click(function() {
      return mixpanel.track("Facebook Clicked");
    });
  });

}).call(this);

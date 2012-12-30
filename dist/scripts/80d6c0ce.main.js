(function() {

  require.config({
    paths: {
      jquery: 'vendor/jquery.min'
    }
  });

  require(['app', 'analytics'], function(app) {
    return console.log(app);
  });

}).call(this);

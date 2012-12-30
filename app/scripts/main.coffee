require.config
  # shim:
  paths:
    jquery: 'vendor/jquery.min'

require ['app', 'analytics'], (app) ->
  console.log app

require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/dist'

get '/' do
  File.open('dist/index.html', File::RDONLY)
end

not_found do
  File.open('dist/404.html', File::RDONLY)
end

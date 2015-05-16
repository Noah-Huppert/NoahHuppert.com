module Onyx
	# A Sinatra application template with common settings
	# @author Noah Huppert <developer.noah@gmail.com>
	class Base < Sinatra::Base
		enable :sessions, :static
		set :static, Proc.new { File.join(root, 'public') }
		set :port, ENV['PORT'] || 5000
	end# class Base
end# module Onyx
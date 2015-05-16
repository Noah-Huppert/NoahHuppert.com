require 'rubygems'
require 'bundler'

Bundler.require

require './app/base'

# The global module for Onyx, all Onyx related code will be in the Onyx module
# @author Noah Huppert <developer.noah@gmail.com>
module Onyx
	# The main entrypoint for Onyx
	# @author Noah Huppert <developer.noah@gmail.com>
	class App < Base
		get '/' do
			return 'Root'
		end
	end# class app
end# module Onyx

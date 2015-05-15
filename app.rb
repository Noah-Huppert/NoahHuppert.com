require "rubygems"
require "bundler" 

Bundler.require

require "./app/base"

module Onyx
	class App < Base
		get "/" do
			return "Root"
		end
	end#class app
end#module Onyx
require 'rubygems'
require 'bundler/setup'

require 'dotenv'
Dotenv.load(
    File.expand_path("./.env"),
    File.expand_path("./.env.#{ENV['RACK_ENV']}")
)

require './app/app'
run Onyx::App

require 'rubygems'
require 'bundler/setup'

require 'dotenv'
Dotenv.load(
    File.expand_path(".env")
)

enviroment_env_file_path = File.expand_path("./.env.#{ENV['RACK_ENV']}")
if File.file?(enviroment_env_file_path)
    Dotenv.load(enviroment_env_file_path)
end


require './app/app'
run Onyx::App

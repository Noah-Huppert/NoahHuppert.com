#Onyx Sinatra
A new version of NoahHuppert.com using Sinatra instead of NodeJs

#Using with Openshift
I am using Openshift to host NoahHuppert.com  

For the app to launch correctly you must ssh install your Openshift app and run

```
gem install rack
```

This is because for some reason Openshift wants to use Rack `1.5.2` but Sinatra
has Rack `1.6.1` as a dependency so the 2 versions conflict. Explicitly installing
Rack `1.6.1` fixes this issue

#Setting up MySql for local development
For development you must create the user `onyx_dev`. To do so access the
Mysql console(`mysql -u root -p`)

Then run the following commands:

```sql
CREATE USER 'onyx_dev'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'onyx_dev'@'localhost';
```

You must also create the `onyx_dev` database. To do so access the
Mysql console(`mysql -u root -p`)

Then run the following commands:

```sql
CREATE DATABASE 'onyx_dev';
```

#Onyx Sinatra
A new version of NoahHuppert.com using Sinatra instead of NodeJs

#Running
To run Onyx use the following command while in the project root

```bash
rackup
```

To run the project with autoreload run the following command while in the project root  

***Note:*** *You must have the `rerun` gem installed(`gem install rerun`)*

```bash
rerun rackup
```

#Running on Openshift
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
FLUSH PRIVILEGES;
```

You must also create the `onyx_dev` database. To do so access the
Mysql console(`mysql -u root -p`)

Then run the following commands:

```sql
CREATE DATABASE 'onyx_dev';
```
#Git Commit Style Guide
Usually I will try to write my commit messages as sentences. For example

```text
Switched backend config from .yml to .rb files
```
However, on occasion I will forget to commit all day and a commit will contain a
large amount of changes. In this case I use the following shorthand in my commit
messages

- Changes split by `,`
- `[B]` prepending a change indicates it is a ***backend*** change
- `[F]` prepending a change indicates it is a ***frontend*** change
- `+` added
- `-` removed
- `~` changed

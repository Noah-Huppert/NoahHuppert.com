[![Build Status](https://travis-ci.org/Noah-Huppert/NoahHuppert.com.svg?branch=master)](https://travis-ci.org/Noah-Huppert/NoahHuppert.com)

# NoahHuppert.com - Onyx
A new version of NoahHuppert.com using Sinatra instead of NodeJs


# Installation
## PostgreSQL
Onyx uses PostgreSQL version 9.4, install with:

```
sudo apt-get install postgresql-9.4
```

If the package `postgresql-9.4` is not found you must add the PostgreSQL 9.4
repository

You must also install PostgreSQL development dependencies:

```
sudo apt-get install libpq-dev
```

## Add PostgreSQL repository(Optional)
*Only complete this step if the package `postgresql-9.4` was not found.*

Add the PostgreSQL 9.4 repository with the following command:

```
echo "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main" >> /etc/apt/sources.list.d/pgdg.list
```

Then add the PostgreSQL 9.4 key and import the repository with:

```
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | \
  sudo apt-key add -
sudo apt-get update
```

After you have completed the above instructions follow the PostgreSQL 9.4
install instructions


# Configuration
## PostgreSQL
First open the PostgreSQL terminal:

```
sudo -u postgres psql
```

Then create a user and a table:

```
CREATE USER <user> WITH PASSWORD '<password>';
CREATE DATABASE <table_name> WITH OWNER <user>;
```

Make sure to replace the values in `<>` with the following:
- `<user>`
    - development => `onyx_dev`
    - test => `travis`
    - production => *Up to you*
- `<table_name>`
    - development => `onyx_dev`
    - test => `onyx_test`
    - production => `onyx`


## PostgreSQL ***Production***
Make sure to set the following environment variables:
- `POSTGRESQL_DB_HOST`
- `POSTGRESQL_DB_PORT`
- `POSTGRESQL_DB_USERNAME`
- `POSTGRESQL_DB_PASSWORD`

## Google Login
Make sure to set the following environment variables:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## Rack Cookies
Make sure to set the following environment variables:
- `COOKIES_SECRET`

## Environment Variables ***Production***
Use the Dokku config set command to set environment variables:

```
dokku config:set <app> KEY1=value1 KEY2=value2
```

Make sure to replace `<app>` with the Dokku app name for Onyx

## Environment Variables ***Development***
To make local development easier create a file in the root of the project called
`..env.development` and put environment variables in it in the form of:

```
KEY1=value1
KEY2=value2
```


# Running
The the following command:

```
rackup
```

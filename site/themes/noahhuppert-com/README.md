# NoahHuppert.com Theme
Custom Hugo theme for Noah Huppert's personal web page.

# Table Of Contents
- [Overview](#overview)
- [Site Configuration](#site-configuration)
- [Post Tags](#post-tags)

# Overview
Custom Hugo theme for Noah Huppert's personal web page.  

To use this theme a site's configuration file must have certain options as 
described in the [Site Configuration section](#site-configuration).

Additionally posts must have certain tags as described in the 
[Post Tags section](#post-tags).

# Site Configuration
The theme must be given the following configuration variables via the `params` 
key in site configuration file:

- `biography` (String): Short paragraph about site author
- `keybaseUsername` (String): Keybase user to link to
- `githubUsername` (String): GitHub user to provide link to
- `twitterUsername` (String): Twitter user to provide link to
- `contactEmails` (Object[]): Email to provide link to
	- `user` (String): Email user to place before email at symbol
	- `host` (String): Email host to place after email at symbol
	- `tld` (String): Email host top level domain to place after dot in host

# Post Tags
This theme provides a special type of post called a project. A project 
displays a piece of work.  

Each project must have the following tags:

- `title` (String): Name of post
- `statuses` (String): Completion status of post
	- Theme will load a file named `/img/statuses/{{ status }}.png` next to the 
		statuses value when displaying a project. Ensure this file exists.
- `languages` (String[]): List of programming languages used to create project
- `github` (String): GitHub project slug. In format `Username/Repo`.
- `order` (Integer): Field used to determine the display order of projects. 
	Projects with a lower order value will be displayed first.

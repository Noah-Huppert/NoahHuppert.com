# NoahHuppert.com Theme
Custom Hugo theme for Noah Huppert's personal web page.

# Table Of Contents
- [Overview](#overview)
- [Configuration](#configuration)

# Overview
Custom Hugo theme for Noah Huppert's personal web page.  

Must be [configured](#configuration).

# Configuration
The theme must be given the following configuration variables via the `params` 
key in site configuration file:

- `keybaseUsername` (String): Keybase user to link to
- `contactEmail` (Object[]): Email to provide link to
	- `user` (String): Email user to place before email at symbol
	- `host` (String): Email host to place after email at symbol
	- `tld` (String): Email host top level domain to place after dot in host
- `githubUsername` (String): GitHub user to provide link to
- `twitterUsername` (String): Twitter user to provide link to

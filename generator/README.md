# Generator
Program to generate static post content.

# Table Of Contents
- [Overview](#overview)
- [Input](#input)
- [Output](#output)

# Overview
Generates JSON files from post files.

# Input
The tool reads post files as input.  

Posts must be located in sub-directories which determine the type of a post.

Inside each sub-directory a `metadata-schema.toml` file must be present which 
describes the metadata schema for posts of that type.  

Post files are markdown files which contain metadata and content.  
The metadata is TOML at the top of the file. Separated from the content by 
3 dashes.  

All posts are required to have at least the following metadata:

- `title` (String): Human readable title of post
- `slug` (String): Value used in URLs when linking to post. Should never 
    change. Must only contain alpha-numeric characters, no spaces. Must be 
    unique to all other posts.
- `order` (Integer): Used to order post against other posts in category

# Output
JSON files are outputted to emulate an API.

A file will be generated for each post in the `posts` output directory 
named `<slug>.json`.  
It will contain a metadata object and a text field with markdown in HTML form.  

Additionally an index file for each post type will be created. It will be named
`<post type directory name>.json`. It will include an array of sorted post 
slugs for the category.

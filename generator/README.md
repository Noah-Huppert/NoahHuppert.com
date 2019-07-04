# Generator
Generate JSON data files for static content.

# Table Of Contents
- [Overview](#overview)
- [Content](#content)
- [Data Schema](#data-schema)
  - [Input Files](#input-files)
  - [Output Files](#output-files)

# Overview
Parses input files and combines them into JSON output files.  
JSON output files are loaded by the website.

# Content
This tool is used parse content for my personal website.  

Personal projects are the only type of content.

# Data Schema
## Input Files
### Types
The schema input files use is determined by their type.  
Their type is determined by their parent directory.  

### Content Files
Markdown files with a TOML header.  
TOML header must appear first, separated from markdown with 3 dashes on their 
own line.

Header contains content metadata.  
Markdown is the content.  

### Order File
Determines the order content will be displayed.  

A text file which holds a newline delimited list.  

Values are names of content files without their file extensions.  

Items which appear first in the file will appear first on the site.

## Output Files
Contains a top level key for each input file type.  

Each of these type keys has the following keys:


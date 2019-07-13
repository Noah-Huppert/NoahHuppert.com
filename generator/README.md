# Generator
Generate JSON data files for static content.

# Table Of Contents
- [Overview](#overview)
- [Content](#content)
- [Data Schema](#data-schema)
  - [Input Files](#input-files)
  - [Output File](#output-file)

# Overview
Parses input files and combines them into JSON output files.  
JSON output files are loaded by the website.

# Content
This tool is used parse content for my personal website.  

Personal projects are the only type of content.

# Data Schema
## Input Files
### IDs
IDs are used to refer to content items.  
IDs are content file base names without file extensions.

### Types
Input file's have schemas depending on their type.  
Type is determined by the parent directory 1 level down from the working
directory.

For example:

```
|-- project/
|   |-- art/
|   |   |-- order.txt
|   |   |-- foo.md
|   |   |-- bar.md
|   |-- computers/
|       |-- order.txt
|		|-- baz.md
|		|-- quix.md
|-- work/
|	|-- order.txt
|	|-- resume.md
```

The `foo.md`, `bar.md`, `baz.md`, and `quix.md` files are of type `project`.  
The `resume.md` file is of type `work`.  

However the files in `art` and `computers` will have their own order files.

### Content Files
Markdown files with a TOML header.  
TOML header must appear first, separated from markdown with 3 dashes on their 
own line.

Header contains content metadata.  
Markdown is the content.  

### Order File
Determines the order content will be displayed.  

A text file named `order.txt` which holds a newline delimited list.  
Placed in same directory as content.

Values are IDs.

Items which appear first in the file will appear first on the site.

## Output File
One JSON file.  
Contains a top level key for each input file type.  
If types have sub-keys (like `project/art`) there will be an top level key for
each sub-key in those types.

Each of these type keys has the following keys:

- `content` (`map[string]interface{}`): Map of content, keys IDs, values are 
  content items
- `order` (`[]string`): List of IDs in order specified by order file
- `index` (`map[string]map[string][]string`): Map of IDs organized by header 
  values. Keys are header key names, values are another map who's keys are 
  header values and who's values are ordered IDs

# Generator
Transforms static content into deployable format.

# Table Of Contents
- [Overview](#overview)
- [Content Specification](#content-specification)
- [Output Files](#output-files)

# Overview
Content is stored in markdown files.  
Metadata about content is stored in the header section of a file.  
The order of content is determined by numeric prefixes in their names.

Content is coalesced into JSON files which emulate an API.

# Content Specification
Currently the only type of content are projects.

## Projects
Projects are located in the `projects` input directory.  

Headers:

- `Name` (String)
- `Languages` ([]String)
- `Technologies` ([]String)

Content: Description of project

# Output Files
JSON files are generated for each content type.

## Projects
- `/projects/index.json`: All projects with headers and content in one file
- `/projects/{languages,technologies}.json`: Indexes of header values

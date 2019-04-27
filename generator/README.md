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
- `Slug` (String)
- `Languages` ([]String)
- `Technologies` ([]String)
- `GitHub` (String)

Content: Description of project

# Output Files
JSON files are generated for each content type.

## Projects
### Projects
`projects.json`  

Schema:

- `ordered_slugs` ([]String): Project slugs ordered by their source file numeric
  prefixes in descending order
- `projects` (map[String]Project): Map, keys are slugs, values are projects 
  with their headers

### Indexes
`{languages,technologies}.json`

Indexes for header values.  

Keys are language / technology names, values are project slugs.


# NoahHuppert.com
Repository for my (Noah Huppert) home page.

A simple single page Polymer (2.0) app. Content is served with Caddy from the `www` directory.

# Data
The `www/data` directory holds static JSON files that the single page web app will request and use to display.

## `projects.json`
Contains an array of Projects objects which follow this scheme:
- id (string): Id of project
    - **Required**
- name (string): Name of the project
    - **Required**
- short_description (string): Short description of project
    - **Required**
- github_slug (string): Github username and repository name 
    - **Required**
- tags (object): Contains all project tags
    - **Required**
    - languages (string[]): Programming languages used in project
        - **Required**
    - development_areas (string[]): Areas of development touched on in project
        - **Required**
    - progress (string): How far along I am with project
        - **Required**
    - support (string): Whether or not I am supporting the project
        - **Required**
   
## `tags.json`
Contains all valid tag values. Top level keys represent different tag categories. Each tag category has an object, keys 
in this object are tag ids. These ids specify a value in the tag category. More detailed information can then be 
specified via tag objects which follow this scheme:
- text (string): Text to display for tag
    - **Required**

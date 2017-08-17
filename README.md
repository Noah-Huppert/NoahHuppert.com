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
Contains all tag data. Tags are broken down into broad categories. Specific tags represent different values in that
category.

The tags data file is organized by category. Each category contains multiple tag objects, organized by tag id. These tag
objects follow this scheme:

- text (string): Text to display for tag
    - **Required**
- ui_type (string): How to display tag in UI
    - **Required**
    - Must be one of the following values
        - `icon`
        - `box`
- ui_data (string): Data required to display tag in UI
    - **Required**
    - Depending on ui_type the data required is different:
        - `icon`: URL to image to display
        - `box`: Hex of box background color

# Credit
## Rust Logo
File: `/www/img/tags/languages/rust-logo.png`
The Rust Language logo was created by Mozilla and is released under the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/).

Found at URL: [rust-lang/rust#11562](https://github.com/rust-lang/rust/issues/11562)

## Icons8
Some icons where provided by [Icons8](https://icons8.com/) under the [Creative Commons Attribution-NoDerivs 3.0 Unported](https://creativecommons.org/licenses/by-nd/3.0/).

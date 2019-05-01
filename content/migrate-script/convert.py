#!/usr/bin/env python3

import json

old_projects = []

with open('old.json') as f:
    old_projects = json.load(f)['projects']

new_projects = []
    
next_prefix = 0

for project in old_projects:
    tmpl = """Name = "{name}"
Slug = "{slug}"
Languages = [ "{languages}" ]
Technologies = []
GitHub = "{github}"
---
{content}"""

    slug = project['title'].lower().replace(' ', '-')
    s = tmpl.format(name=project['title'],
                    slug=slug,
                    languages="\", \"".join(project['languages']),
                    github=project['github'],
                    content=project['description'])

    new_projects.append([slug, s])
    next_prefix += 10


prefix_len = len(str(next_prefix)) + 1
next_prefix -= 10    

for project in new_projects:
    prefix_str = str(next_prefix)
    while len(prefix_str) < prefix_len:
        prefix_str = "0{}".format(prefix_str)


    next_prefix -= 10

    with open("projects/{}_{}.md".format(prefix_str, project[0]), "w") as f:
        f.write(project[1])

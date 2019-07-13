/*
Parses TOML + Markdown files.  

These files have a TOML header seperated from the Markdown
content by 3 dashes on their own line.

Example:

```
KeyOne = 1
KeyTwo = "foo"
---
# Cool title
Some `code` and **bold**.
```

Would result in a header: `map[string]interface{}{"KeyOne": 1, "KeyTwo": "foo"}`
and content of:

```
# Cool title
Some `code` and **bold**.
```
*/
package tomlmd

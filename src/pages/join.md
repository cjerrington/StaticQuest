---
title: Joining Static.Quest
description: The adventure awaits
eleventyNavigation:
  key: Join
  order: 5
---

The only requirement is to have a static site! This is the honor system and we're not going to ask for the source or hosting or your site. We do have this in the data file that lists our members, just to show the various methods that are available to you to build your sites.

## Adding your site

Just clone/fork the repository, update the `src/_data/members.json` file with your information and make a pull request, and we'll get it added.

Add your information in the JSON data and it will be rendered to the table on the [Members](/members0 page).

```json
  {
    "name": "Your Name",
    "url": "yourwebsite.com/",
    "feed": "yourwebsite.com/feed/",
    "ssg": "static site generator",
    "type": "blog, personal, art, technology, etc"
  }
```

You can add what you'd like in the `JSON`, but the name and website are kinda required. Adding an RSS feed is for those who like to subscribe and its readily available.

The `ssg` is for the Static Site Generator used, and would be neat as the web ring grows to see the variety of methods used to generate your awesome website.

## Add Static.Quest to your site

As a member of a web ring it is common to add links to the web ring and its members.

```html
<p>
    A member of the <a href="https://static.quest">Static.Quest</a> web ring! 
    <a href="https://static.quest">View Members</a>
    <a href="https://static.quest">Feeling lucky?</a>
</p>
```

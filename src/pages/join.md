---
title: Joining Static.Quest
description: The adventure awaits
eleventyNavigation:
  key: Join
  order: 5
---

The only requirement is to have a static site! This is the honor system and we're not going to ask for the source or hosting or your site. We do have this in the data file that lists our members, just to show the various methods that are available to you to build your sites.

## Adding your site

Just clone/fork the [repository](https://github.com/cjerrington/StaticQuest), update the `src/_data/members.json` file with your information and make a pull request, and we'll get it added.

Add your information in the JSON data and it will be rendered to the table on the [Members](/members) page.

```json
{
  "name": "Your Name",
  "host": "yourwebsite.com/",
  "feed": "yourwebsite.com/feed/",
  "ssg": "static site generator",
  "type": "blog, personal, art, technology, etc"
}
```

You can add what you'd like in the `JSON`, but the name and website are kinda required. Adding an RSS feed is for those who like to subscribe and its readily available.

The `ssg` is for the Static Site Generator used, and would be neat as the web ring grows to see the variety of methods used to generate your awesome website.

## Add Static.Quest to your site

As a member of a web ring it is common to add links to the web ring and its members. Feel free to add the following HTML to your site as well. Make sure to update the `host` to the `host` you have in the `members.json` file.

```html
<p>
  A member of the <a href="https://static.quest">Static.Quest</a> web ring! 
  <br />
  <a href="https://static.quest/previous/index.html?host=static.quest">&#8592;
  <a href="https://static.quest/members">View Members</a>
  <a href="https://static.quest/next/index.html?host=static.quest">&#8594;
  <br />
  <a href="https://static.quest/random">Feeling lucky?</a>
</p>
```

<div style="text-align: center;">

  A member of the [Static.Quest](https://static.quest) web ring!
  <br />
  [&#8592;](/previous/index.html?host=static.quest)
  [View Members](/members)
  [&#8594;](/next/index.html?host=static.quest)
  <br />
  [Feeling lucky?](https://static.quest/random)

</div>
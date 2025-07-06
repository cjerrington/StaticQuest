---
title: Joining Static.Quest
description: The adventure awaits
eleventyNavigation:
  key: Join
  order: 5
---

The only requirement is to have a static site! This is the honor system and we're not going to ask for the source or hosting or your site. We do have this in the data file that lists our members, just to show the various methods that are available to you to build your sites.

## Adding your site

Just clone/fork the [repository](https://github.com/cjerrington/StaticQuest), add your website file to `src/members/` folder with your information and make a pull request, and we'll get it added. You can also open a [Join Static.Quest issue](https://github.com/cjerrington/StaticQuest/issues/new/choose), and it can get added by the team.

Add your information in the JSON data and it will be rendered to the table on the [Members](/members) page.

```yaml
---
name: Your Name
host: yourwebsite.com/
feed: yourwebsite.com/feed/
ssg: static site generator
type: "blog, personal, art, technology, etc"
---
```

You can add what you'd like in the `yaml`, but the name and website are kinda required. Adding an RSS feed is for those who like to subscribe and its readily available.

The `ssg` is for the Static Site Generator used, and would be neat as the web ring grows to see the variety of methods used to generate your awesome website.

## Add Static.Quest to your site

As a member of a web ring it is common to add links to the web ring and its members. Feel free to add the following HTML to your site as well. Make sure to update the `host` to the `host` you have in your `name.md` file.

```html
<p>
  A member of the <a href="https://static.quest">Static.Quest</a> web ring! 
  <br />
  <a href="https://static.quest/previous/?host=static.quest">&#8592;</a>
  <a href="https://static.quest/members">View Members</a>
  <a href="https://static.quest/next/?host=static.quest">&#8594;</a>
  <br />
  <a href="https://static.quest/random">Feeling lucky?</a>
</p>
```

<div style="text-align: center;">

  A member of the [Static.Quest](https://static.quest) web ring!
  <br />
  [&#8592;](/previous/?host=static.quest)
  [View Members](/members)
  [&#8594;](/next/?host=static.quest)
  <br />
  [Feeling lucky?](https://static.quest/random)

</div>

## Membership rules

### Website content

As it's nigh impossible for me, or anyone else, to decern the validity of one's claim to Static.Quest status, almost any site should get accepted, barring the following:

- Hate speech
- Racism, sexism, homophobia, transphobia, ableism or any other bigotry
- Illegal or immoral or otherwise NSFW content
- Sites with machine generated text and/or articles
- Sites with little or no actual content

Do, however, note that this list is not exhaustive. I reserve the right to deny join requests at my discretion, for any reason.

If you find a site that violates this please submit an [issue](https://github.com/cjerrington/StaticQuest/issues/new/choose) or please contact me [here](/contact).

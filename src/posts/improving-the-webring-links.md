---
title: Improving the webring links, one build at a time
description: How we replaced JavaScript redirects with pages generated at build time for the Static.Quest webring
date: 2026-08-22
tags:
  - webring
---

If you have ever clicked the little &larr; and &rarr; arrows on a member's site, you have used the plumbing that ties [Static.Quest](https://static.quest) together. Those links are how a web ring works: every site points to the next and previous member, and visitors can walk the whole circle without ever visiting the hub. This post is a look at how those links worked until recently, what was wrong with them, and how we made them better while staying 100% static.

## How it used to work

The original approach leaned on the browser. Members embedded links like this:

```html
<a href="https://static.quest/next/?host=yourwebsite.com">&#8594;</a>
```

When someone clicked that link, they landed on a small page on Static.Quest whose only job was to run some JavaScript:

1. Read the `host` value out of the query string
2. `fetch()` a JSON file listing all the members
3. Find the current host in the array
4. Set `window.location` to the neighbor's URL

It worked, and honestly it worked fine for years. But it had a few rough edges worth fixing:

- **JavaScript required.** No JS, no redirect. You got a polite `<noscript>` message instead.
- **An extra round trip.** Every hop waited on fetching and parsing `members.json` before anything happened.
- **Silent failure modes.** Visit `/next/` without a `?host=` parameter and nothing happens at all.
- **The ring order wasn't stable.** The JSON array was generated in whatever order Eleventy happened to collect the files, which is not guaranteed to be identical between machines or CI checkouts.

## The new way: generate the redirects at build time

The key realization is that Eleventy already knows everything needed at build time. It has the full member list, so it knows exactly who comes before and after you in the ring. So why involve the browser at all?

Instead of one generic redirect page, we now generate **one tiny HTML page per member per direction** during the build:

- `/next/static.quest/`
- `/previous/static.quest/`

Each page is just a meta refresh pointing at the correct neighbor:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=https://nextsiteplaceholder.com/" />
  </head>

  <body>
    <p>Walking the Static.Quest web ring to
      <a href="https://nextsiteplaceholder.com">https://nextsiteplaceholder.com</a>&hellip;</p>
  </body>
</html>
```

Members embed a link to their own page (`/next/static.quest/`) rather than passing themselves as a query parameter. That URL never changes. When a new site joins the ring, the build regenerates everyone's pages, and all the neighbors quietly shift over without any member touching their markup.

## How it is built

Two pieces make this work in Eleventy.

First, a deterministic ring order. Hosts are normalized (lowercased, trailing slashes stripped) and sorted alphabetically, then shared through filters so every consumer agrees on who is next and previous:

```js
function normalizeHost(host) {
  return String(host || "").trim().replace(/\/+$/, "").toLowerCase();
}

eleventyConfig.addFilter("orderedHosts", function(collection) {
  return collection
    .map(item => normalizeHost(item.data.host))
    .filter(Boolean)
    .sort();
});

eleventyConfig.addFilter("ringNeighbor", function(collection, host, offset) {
  const hosts = collection
    .map(item => normalizeHost(item.data.host))
    .filter(Boolean)
    .sort();
  const index = hosts.indexOf(normalizeHost(host));
  if(index === -1) {
    return null;
  }
  return hosts[(index + offset + hosts.length) % hosts.length];
});
```

That modulo arithmetic is the whole wrap-around trick: the last site's "next" is the first site, and the first site's "previous" wraps back around to the end. A web ring should be a circle, after all.

Second, a paginated template generates all the pages:

{% raw %}
```html
---
permalink: "/next/{{ member.data.host | hostSlug }}/"
eleventyExcludeFromCollections: true
pagination:
  data: collections.members
  size: 1
  alias: member
---
<meta http-equiv="refresh" content="0; url=https://{{ collections.members | ringNeighbor(member.data.host, 1) }}/" />
```
{% endraw %}

Eleventy fans that out into 63 pages, one per member, in about a third of a second. There are 63 current members at time of writing.

## Nobody gets left behind

Changing the widget format would normally mean asking every member to update their site. Instead, both formats work side by side:

- The old `/next/?host=yourwebsite.com` pages are untouched and keep doing their thing
- The new per-host pages live alongside them at `/next/<host>/`
- Both read from the same shared ordering, so "next" means the same neighbor no matter which style of link brought you there

New members copying the snippet from the [join page](/pages/join/) get the new format; existing members can update whenever they feel like it, or never. No rush, no breaking changes. That felt like the right way to treat the folks who make the ring a ring.

While improving the overall process, the random link got a small tune-up too. It used to be the same story: load page, fetch JSON, pick a winner. Now the member list is baked right into the page at build time, so clicking "Feeling lucky?" needs zero network requests beyond the redirect itself.

## Why this matters

Everything above stays true to what makes a static site a static site: no server-side logic, no edge functions, no databases. Just files on a static server. The "dynamic" behavior people usually reach for JavaScript to solve turned out to be a build-time problem wearing a runtime costume, and moving it into the build made the result faster, simpler, and friendlier to browsers that don't run scripts.

So go ahead, click an arrow somewhere in the ring and enjoy the tour. If you run your own site and want to join the quest, we would love to have you. Check out the [joining instructions](/pages/join/) and add yourself to the circle.

# Static.Quest

[Static.Quest](https://static.quest) is a web ring focused to list all the amazing static websites.

Scroll down to see the list and even join! We are here to show the world of great sites that can be made with pure HTML, CSS, and JavaScript, only relying on the client browser to render the page content.

- [View the members](https://static.quest/members/)
- [Join the Quest](https://static.quest/join/)
- [What are Static Websites?](https://static.quest/posts/what-is-a-satic-site/)



## Getting Started

### 1. Clone this Repository

```shell
git clone https://github.com/cjerrington/StaticQuest.git StaticQuest
```

### 2. Navigate to the directory

```shell
cd StaticQuest
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies

```shell
npm install
```

### 4. Edit \_data/metadata.json

### 5. Run Eleventy

```shell
npx @11ty/eleventy
```

Or build and host locally for local development

```shell
npx @11ty/eleventy --serve
```

Or build automatically when a template changes:

```shell
npx @11ty/eleventy --watch
```

Or in debug mode:

```shell
DEBUG=* npx @11ty/eleventy
```

## Documentation

- [Eleventy](https://www.11ty.dev/docs/)
- [Simple.css](https://github.com/kevquirk/simple.css/wiki)

### Implementation Notes

- `about/index.md` shows how to add a content page.
- `posts/` has the blog posts but really they can live in any directory. They need only the `post` tag to be added to this collection.
- Use the `eleventyNavigation` key in your front matter to add a template to the top level site navigation. For example, this is in use on `index.njk` and `about/index.md`.
- Content can be any template format (blog posts needn’t be markdown, for example). Configure your supported templates in `.eleventy.js` -> `templateFormats`.
- The `css` and `img` directories in the input directory will be copied to the output folder (via `addPassthroughCopy()` in the `.eleventy.js` file).
- The blog post feed template is in `feed/feed.njk`. This is also a good example of using a global data files in that it uses `_data/metadata.json`.
- This example uses three layouts:
  - `_includes/layouts/base.njk`: the top level HTML structure
  - `_includes/layouts/home.njk`: the home page template (wrapped into `base.njk`)
  - `_includes/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
- `_includes/postlist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `index.njk` has an example of how to use it.

## Joining

The adventure awaits

The only requirement is to have a static site! This is the honor system and we're not going to ask for the source or hosting or your site. We do have this in the data file that lists our members, just to show the various methods that are available to you to build your sites.

You can add a pull request for adding your site, or starting a [Join Static.Quest issue](https://github.com/cjerrington/StaticQuest/issues/new/choose), and it can get added by the team.

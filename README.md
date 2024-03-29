# Amir Sharif

[![Netlify Status](https://api.netlify.com/api/v1/badges/45683b87-df2d-40ee-b3a2-53f6b9549180/deploy-status)](https://app.netlify.com/sites/amirsharif/deploys)

The code that hosts my website, [amirsharif.com](http://www.amirsharif.com).

- `jekyll build`
- `jekyll serve --watch --incremental --livereload`
- Open `http://127.0.0.1:4000/`

Powered by [Netlify](https://www.netlify.com/) and Minimal Mistakes.

- Changes in `/_data` require a restart.

### Override Theme Defaults

To upgrade the main theme follow instructions [here](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/#migrating-to-gem-version).

`bundle update minimal-mistakes-jekyll`

This extends https://github.com/mmistakes/minimal-mistakes.

- `bundle info minimal-mistakes-jekyll`
- Copy those files over and overwrite them

### How to add images

`![My helpful screenshot]({{ "/assets/screenshot.jpg" | absolute_url }})`

### Steps to add a blog post

- Add a post in `/_posts`
- If you want to add a new section to the site, modify `_data/navigation.yml`

### Deploying

- `git push` should trigger a job in Netlify to build the website.
- TODO: How do I do this from GitHub itself?

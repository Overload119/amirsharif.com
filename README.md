# Amir Sharif

The code that hosts my website, [amirsharif.com](http://www.amirsharif.com).

- `jekyll serve --watch --incremental --livereload`
- Open `http://127.0.0.1:4000/`

Powered by [Netlify](https://www.netlify.com/) and Minimal Mistakes.

- Changes in `/_data` require a restart.

### Override theme defaults

- `bundle show minimal-mistakes-jekyll`
- Copy those files over and overwrite them

### How to add images

`![My helpful screenshot]({{ "/assets/screenshot.jpg" | absolute_url }})`

## Steps to add a blog post

- Add a post in `/_posts`
- Wait forever it seems?

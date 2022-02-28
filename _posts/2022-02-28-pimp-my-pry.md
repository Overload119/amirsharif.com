---
layout: single
title: Pimp My Pry
published: true
excerpt: Making Pry more useful in Ruby on Rails
tags: dev
---

## Upgrade Ctrl-R to search with `fzf` 

The default history search for pry is not great. You can override it with more modern tools. ([source](https://stackoverflow.com/questions/46167332/how-make-reverse-i-search-history-use-fzf-in-irb-or-pry-console))

Run `gem install rb-readline` and add it to your Gemfile in your Rails project.

Modify `~/.pryrc`

```rb
require 'rb-readline'

def RbReadline.rl_reverse_search_history(sign, key)
  rl_insert_text  `cat <history path> | fzf --tac |  tr '\n' ' '` # see below for modifying this
end

# I added this line to let me know it kicked in.
puts '~/.pryrc loaded.'
```

To see where Pry stores your history, run:

```rb
pry(main)> Pry.config.history_file
=> "/Users/amirsharif/.local/share/pry/pry_history"
```

Voila!

<video src="https://sapco.nyc3.digitaloceanspaces.com/amirsharif.com/CleanShot%202021-12-31%20at%2013.53.39.mp4" autoplay="true" loop="loop" muted="muted"/>

## Copying a variable from the console

Add these methods to your Pry console. ([source](https://stackoverflow.com/questions/19280965/copy-to-clipboard-in-ruby-html-or-c-sharp#23141160))
```rb
def pbcopy(input)
 str = input.to_s
 IO.popen('pbcopy', 'w') { |f| f << str }
 str
end

def pbpaste
 `pbpaste`
end
```

Let's say you have a giant string blob in a local variable like `html`

In the console you can run:

```rb
pbcopy(html) # The string content is now on your clipboard!
```
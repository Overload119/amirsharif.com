---
layout: single
title: Save Multiple Emails as Images
excerpt: My "hack-of-the-day" post of how to quickly export emails as images to share
published: true
---

# Save Multiple Emails as Images

**Problem**: You found an awesome email campaign that you want to quickly download as screenshots. 

You will need:

- A Gmail account and a Gmail Script project to export the emails. https://script.google.com/home
- [wkhtmltoimage](https://wkhtmltopdf.org/) to convert the emails to image

**Solution**

In this case, I wanted to screenshot all Mercari emails. Here's the script I used:

```js
function exportEmails() {
  var response = Gmail.Users.Messages.list('me', { q: 'from:no-reply@contact-us.mercariapp.com'}); // You can change this line.
  var allMessageBlobs = [];
  response.messages.forEach(function (message) {
    var message = GmailApp.getMessageById(message.id);
    var subject = message.getSubject();
    var body = message.getBody();
    var blob = Utilities.newBlob(body, 'html', subject + '-' + message.getId() + '.html');
    allMessageBlobs.push(blob);
  });
  var zipBlob = Utilities.zip(allMessageBlobs, 'exported_emails.zip')
  Drive.Files.insert({ title: 'exported_emails' }, zipBlob);
}
```

Hit the Play button. This will export each email as a HTML file, zip them all together with the email subject as the filename and save it to your Drive.
Then visit your Google Drive and download "exported_emails.zip"

Now you'll need to convert these HTML files into images. 

`find . -name "*.html" | sed 's,\(.*\),"\1",' | xargs -P 4 -I {} -n 1 wkhtmltoimage "{}" "{}.png"`

This command will perform the conversion from HTML to PNG. It took me a while to figure out, so let's take a closer look.

There are 3 commands here that are piped into each other (with the output of each used as an input of the next one)

- `find . -name "*.html"` will get the name of all the HTML files in the current directory.
- `sed 's,\(.*\),"\1",'` will wrap the text in quotes. I had trouble with xargs using filenames with spaces, so this was necessary.
- `xargs -P 4 -I {} -n 1 wkhtmltoimage "{}" "{}.png"`
  - `-P 4` will run 4 jobs in parallel. I had about 48 emails and this sped up the execution time.
  - `-I {}` will replace instances of `{}` with the input
  - `-n 1` will treat each line as a separate command to run
  - Everything after that will just call `wkhtmltoimage "{}" "{}.png"` which will replace `{}` with the filenames you're converting.

Voila, here are the [results](https://imgur.com/a/rVQzYlx)!
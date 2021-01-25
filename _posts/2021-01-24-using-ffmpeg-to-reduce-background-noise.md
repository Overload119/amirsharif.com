---
layout: single
title: Save Multiple Emails as Images
excerpt: My "hack-of-the-day" post of how to quickly export emails as images to share.
published: true
---

Scenario:

I have a file I recorded. It has background noise I want to remove (fans, clicking, etc.)
Works good for fans but a little less well for clicking.

1. Extract the audio file from the video

```
ffmpeg -i <path> -vn -acodec copy output-audio.aac
```

2. Pipe it through a rnn model.

```
ffmpeg -i <audiopath> -af arnndn=m=<path to model>
```

For path to model I just downloaded the std model from https://github.com/GregorR/rnnoise-models

3. Recombine the new audio with the video

```
ffmpeg -i v.mp4 -i a.wav -c:v copy -map 0:v:0 -map 1:a:0 new.mp4
```
# somachord

sleek and easy to use social media downloader built with javascript.

## what's somachord?

somachord aims to be the ultimate social media downloader, that is efficient, pretty, and doesn't bother you with ads or privacy invasion agreement popups. it also doesn't remux anything, so you get media in best quality possible (unless you change that in settings).

## supported services

### video

- bilibili.com
- douyin
- reddit
- tiktok
- tumblr
- twitter
- youtube
- youtube music
- vk

### audio

- youtube
- youtube music

## translations

- spanish: [@adrigoomy](https://github.com/adrigoomy)
- french: [@lexito-o](https://github.com/lexito-o)
- indonesian: [@lyfev](https://github.com/lyfev)

## how can you help somachord speak your language

take english or portuguese (brazil) localization from [this directory](https://github.com/cv55n/somachord/tree/current/src/localization/languages) and use it as a base for your translation. then simply make a pull request and it'll be out for everyone upon review!

### what you should keep in mind

- do **not** use formal language, that's boring and lame. Use informal language on all occasions.
- strings are **always** lowercase unless it's an internal value like {ContactLink} or stressed like this.
- keep translations as friendly and fun as possible.
- word-for-word translations from original language are not valid.
- you can rephrase sentences as long as they keep the same sense.
- you can add wordplays or puns if it feels natural to do so.
- even though i love cursing, keep that away from translations.
- be nice.

## to-do

### services

- [x] tumblr support
- [ ] niconico support
- [ ] instagram support
- [ ] soundcloud support
- [ ] add an option to save twitter gifs as `.gif` instead of `.mp4`
- [ ] quality switching for bilibili

### other

- [ ] language picker in settings
- [ ] make switch buttons in settings selectable with keyboard
- [ ] option to save audios in formats other than original
- [ ] make somachord fully pwa compatible (add a service worker)
- [ ] make page rendering module more versatile

## host an instance yourself

code might be a little messy, but i do my best to improve it with every commit.

## requirements

- node.js v14.16 >=
- git

## npm modules

- cors
- dotenv
- esbuild
- express
- express-rate-limit
- ffmpeg-static
- got
- node-cache
- url-pattern
- xml-js
- ytdl-core

setup script installs all needed `npm` dependencies, but you have to install `node.js` and `git` yourself.

1. clone the repo: `git clone https://github.com/cv55n/somachord`
2. run setup script and follow instructions: `npm run setup`
3. run somachord via `npm start`
4. done.

## disclaimer

this is my passion project, so update scheduele depends solely on my motivation. don't expect any consistency in that.

## license

somachord is under [mit license](https://github.com/cv55n/somachord/blob/main/LICENSE), please keep that in mind.

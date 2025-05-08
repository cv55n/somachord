# somachord

sleek and easy to use social media downloader built on javascript

## what is somachord?

everyone is annoyed by the mess video downloaders are on the web, and somachord aims to be the ultimate social media downloader, that is efficient, pretty, and doesn't bother you with ads or privacy invasion agreement popups.

somachord doesn't remux any videos, so you get videos of max quality available (unless you change that in settings).

## what's supported?

- twitter
- youtube + youtube music
- bilibili.com
- reddit
- vk

## what still has to be done

- [ ] quality switching for bilibili and twitter
- [ ] Language picker in settings
- [x] clean up the mess that localisation is right now
    - [x] sort contents of .json files
    - [x] rename each entry key to be less linked to specific service (entries like youtubeBroke are awful, I'm sorry)
- [x] Add support for more languages when localisation clean up is done
- [ ] use esmbuild to minify frontend css and js
- [ ] make switch buttons in settings selectable with keyboard
- [ ] a better changelog
- [ ] remake page rendering module to be more versatile
- [ ] matching could be redone
- [ ] facebook and instagram support
- [ ] tiktok support (?)
- [ ] support for bilibili.tv (?)

## disclaimer

this is my passion project, so update scheduele depends on my motivation. don't expect any consistency in that.

## host an instance yourself

code might be a little messy, but i promise to improve it over time.

## requirements

- node.js v14.16 >=
- git

## npm modules

- express
- cors
- got
- url-pattern
- xml-js
- dotenv
- express-rate-limit
- ffmpeg-static
- node-cache
- ytdl-core

setup script installs all needed npm dependencies, but you have to install Node.js and git yourself, if you don't have those already.

1. clone the repo: `git clone https://github.com/cv55n/somachord`
2. run setup script and follow instructions: `npm run setup`
3. run somachord via `npm start`
4. done.

## license

somachord is under [mit license](https://github.com/cv55n/somachord/blob/main/LICENSE), please keep that in mind.

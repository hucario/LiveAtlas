# LiveAtlas [![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE) [![Discord](https://img.shields.io/discord/390942438061113344?color=8C9CFE&label=discord&logo=discord&logoColor=white)](https://discord.gg/DBduB9qyv3) [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/JLyne/LiveAtlas/Build)](https://github.com/JLyne/LiveAtlas/actions)


A [Dynmap](https://github.com/webbukkit/dynmap) and [Pl3xmap](https://github.com/NeumimTo/Pl3xMap)/[Squaremap](https://github.com/jpenilla/squaremap) frontend built with [Vue.js](https://github.com/vuejs/vue) and Typescript.

![A LiveAtlas screenshot](https://minecraft.rtgame.co.uk/liveatlas/liveatlas4.png)

LiveAtlas is an alternative frontend for Dynmap, Pl3xmap and Squaremap, which aims to provide a more modern interface and improved performance for busy maps. LiveAtlas is a drop-in replacement for Dynmap; Pl3xmap and Squaremap maps are supported with some additional configuration.

Development is ongoing, but the major features of each map plugin are supported.

You can see it in action [here](https://minecraft.rtgame.co.uk/map/build)

## Supported map features

| Feature | Dynmap | Pl3xmap/Squaremap |
| --------------- | --------------- | --------------- |
| Viewing maps | ✅ | ✅ |
| Markers | ✅ | ✅ |
| Player markers | ✅ | ✅ |
| Player facing direction | n/a | ✅ |
| Popups | ✅ | ✅ |
| Tooltips | n/a | ✅ |
| Tile updates | ✅ | ✅ |
| Marker updates | ✅ | ❌ |
| Following players | ✅ | ✅ |
| Location display | ✅ | ✅ |
| Link button | ✅ | ✅ |
| Link button URLs | ✅ | ✅ |
| Clock | ✅ | n/a |
| Logos | ✅ | n/a | 
| Chat |  ✅ | n/a |
| Chat balloons | ✅ | n/a |
| Login/register | ✅ | n/a |
| Inactivity timeout | ❌ | n/a |
| Custom player head URLs | n/a | ❌ | 
| Custom map icons | ✅ | ✅ |

## Supported Browsers
- Chrome 66+
- Edge 18+
- Firefox 60+
- Opera 53+
- Safari 11.1+

IE is not supported

## Download
LiveAtlas is available on [SpigotMC](https://www.spigotmc.org/resources/liveatlas-a-dynmap-frontend-for-the-modern-web.86939/)

Dev builds are available in [Github actions](https://github.com/JLyne/LiveAtlas/actions/workflows/main.yml)

## Installation
[See the wiki](https://github.com/JLyne/LiveAtlas/wiki/Installation)

## Customisation
The index.html file can be edited to add custom favicons, styles or analytics, just like the map plugins original UIs. All LiveAtlas messages can also be modified here for translation purposes.
You are also free to build LiveAtlas yourself to make further changes.

## Building
First run `npm install` to install LiveAtlas dependencies. You can then either run `npm run serve` to start a local dev server, or `npm run build` to build.

## Support
If you find a bug, please create an issue with as must detail as possible. I'm working on this in my spare time, so fixes are on a best effort basis, but I'll eventually find time for them.

Please do not contact the Dynmap, Pl3xmap or Squaremap teams regarding any issue with LiveAtlas. They will be very upset.

## Donate
If you appreciate my work, feel free to:

<a href='https://ko-fi.com/jlyne' target='_blank'><img height='35' style='border:0px;height:46px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
___
  
Cross-browser testing provided by [Browserstack](http://browserstack.com/).

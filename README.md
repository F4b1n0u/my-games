# My Games
<p align="center">
  <img src ="https://github.com/F4b1n0u/my-games/blob/develop/demo.gif" />
</p>
My games is a react antive application (iOS only for now), who allow you to keep track of your video game collection

## Features
you can search games in 3 fashions

- ### name keyword
In the search input, you can type the name of the game or part of it and simply press enter
- ### franchise keyword
In the search input, after typing some key word, you can have some suggestions of franchises, a franchise is a group of games under the same name

example: "mario" -> "super mario", "paper mario", etc
- ### Barcode scanner
You can also search a game via his barcode, could be conveninent if you already have a big collection.

# Test it live
you can use this app right now with expo on the following link

 https://expo.io/@f4b1n0u/my-games
# How to run your own version
- populate your own .env file
- add your sentry auth api key in expo.hooks.postPublish.config.authToken  of the app.json


the supported platfom list is a group of IDs of platform separeted by a pipe "|"
example: 1|2|3|4, to know which id you should use, you need to look at the GiantBomb api. but you can as well look at the non exaustive list provided in the section "suported paltforms" of this file

# Supported platforms


- id: 01,  name: Amiga
- id: 03,  name: Game Boy
- id: 04,  name: Game Boy Advance
- id: 05,  name: Game Gear
- id: 07,  name: Atari Lynx
- id: 08,  name: Sega Master System
- id: 09,  name: Super Nintendo Entertainment System
- id: 101,  name: Nintendo 64DD
- id: 106,  name: DSiWare
- id: 11, name: Amstrad CPC
- id: 116,  name: PlayStation Network (PSP)
- id: 117,  name: Nintendo 3DS
- id: 129,  name: PlayStation Vita
- id: 13, name: Atari 
- id: 138,  name: Nintendo 3DS eShop
- id: 139,  name: Wii U
- id: 14, name: Commodore 64
- id: 142,  name: Commodore ColecoVision
- id: 143,  name: PlayStation Network (Vita)
- id: 145,  name: Xbox One
- id: 146,  name: PlayStation 4
- id: 15, name: MSX
- id: 150,  name: Commodore 16
- id: 156,  name: New Nintendo 3DS
- id: 157,  name: Nintendo Switch
- id: 158,  name: Game Master
- id: 16, name: ZX Spectrum
- id: 18, name: PlayStation Portable
- id: 19, name: PlayStation 2
- id: 20, name: Xbox 360
- id: 21, name: Nintendo Entertainment System
- id: 22, name: PlayStation
- id: 23, name: GameCube
- id: 25, name: Neo Geo
- id: 26, name: 3DO
- id: 28, name: Jaguar
- id: 29, name: Sega CD
- id: 31, name: Sega 32X
- id: 32, name: Xbox
- id: 35, name: PlayStation 3
- id: 36, name: Wii
- id: 37, name: Dreamcast
- id: 39, name: Amiga CD32
- id: 40, name: Atari 2600
- id: 42, name: Sega Saturn
- id: 43, name: Nintendo 64
- id: 51, name: Intellivision
- id: 52, name: Nintendo DS
- id: 57, name: Game Boy Color
- id: 58, name: Commodore 128
- id: 59, name: Neo Geo CD
- id: 6, name: sega Megadrive/Genesis
- id: 70, name: Atari 7800
- id: 80, name: Neo Geo Pocket
- id: 81, name: Neo Geo Pocket Color
- id: 86, name: Xbox 360 Games Store
- id: 87, name: Wii Shop
- id: 88, name: PlayStation Network (PS3)
- id: 94, name: PC

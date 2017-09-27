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
- id: 06,  name: Genesis
- id: 07,  name: Atari Lynx
- id: 08,  name: Sega Master System
- id: 09,  name: Super Nintendo Entertainment System
- id: 11, name: Amstrad CPC
- id: 12, name: Apple II
- id: 13, name: Atari ST
- id: 14, name: Commodore 64
- id: 15, name: MSX
- id: 16, name: ZX Spectrum
- id: 17, name: Mac
- id: 18, name: PlayStation Portable
- id: 19, name: PlayStation 2
- id: 20, name: Xbox 360
- id: 21, name: Nintendo Entertainment System
- id: 22, name: PlayStation
- id: 23, name: GameCube
- id: 24, name: Atari 8-bit
- id: 25, name: Neo Geo
- id: 26, name: 3DO
- id: 27, name: CD-i
- id: 28, name: Jaguar
- id: 29, name: Sega CD
- id: 31, name: Sega 32X
- id: 32, name: Xbox
- id: 34, name: N-Gage
- id: 35, name: PlayStation 3
- id: 36, name: Wii
- id: 37, name: Dreamcast
- id: 39, name: Amiga CD32
- id: 40, name: Atari 2600
- id: 42, name: Saturn
- id: 43, name: Nintendo 64
- id: 51, name: Intellivision
- id: 52, name: Nintendo DS
- id: 53, name: TurboGrafx-CD
- id: 55, name: TurboGrafx-16
- id: 57, name: Game Boy Color
- id: 58, name: Commodore 128
- id: 59, name: Neo Geo CD
- id: 60, name: Odyssey 2
- id: 62, name: Commodore PET/CBM
- id: 67, name: Atari 5200
- id: 70, name: Atari 7800
- id: 74, name: Odyssey
- id: 75, name: PC-FX
- id: 79, name: Virtual Boy
- id: 80, name: Neo Geo Pocket
- id: 81, name: Neo Geo Pocket Color
- id: 84, name: Arcade
- id: 86, name: Xbox 360 Games Store
- id: 87, name: Wii Shop
- id: 88, name: PlayStation Network (PS3)
- id: 91, name: Famicom Disk System
- id: 94, name: PC
- id: 96, name: iPhone
- id: 98, name: Satellaview
- id: 101,  name: Nintendo 64DD
- id: 106,  name: DSiWare
- id: 62, name: Commodore PET/CBM
- id: 67, name: Atari 5200
- id: 70, name: Atari 7800
- id: 72, name: iPod
- id: 75, name: PC-FX
- id: 79, name: Virtual Boy
- id: 80, name: Neo Geo Pocket
- id: 81, name: Neo Geo Pocket Color
- id: 84, name: Arcade
- id: 86, name: Xbox 360 Games Store
- id: 87, name: Wii Shop
- id: 88, name: PlayStation Network (PS3)
- id: 91, name: Famicom Disk System
- id: 94, name: PC
- id: 96, name: iPhone
- id: 98, name: Satellaview
- id: 99, name: Arcadia 2001
- id: 101,  name: Nintendo 64DD
- id: 105,  name: Game Wave
- id: 106,  name: DSiWare
- id: 109,  name: NEC PC-8801
- id: 112,  name: NEC PC-9801
- id: 115,  name: NEC PC-6001
- id: 116,  name: PlayStation Network (PSP)
- id: 117,  name: Nintendo 3DS
- id: 118,  name: Sega Pico
- id: 119,  name: SuperGrafx
- id: 121,  name: iPad
- id: 123,  name: Android
- id: 124,  name: Windows Phone
- id: 129,  name: PlayStation Vita
- id: 138,  name: Nintendo 3DS eShop
- id: 139,  name: Wii U
- id: 141,  name: Sega SG-1000
- id: 142,  name: Commodore CDTV
- id: 143,  name: PlayStation Network (Vita)
- id: 145,  name: Xbox One
- id: 146,  name: PlayStation 4
- id: 150,  name: Commodore 16
- id: 152,  name: Linux
- id: 154,  name: Ouya
- id: 155,  name: Amazon Fire TV
- id: 156,  name: New Nintendo 3DS
- id: 157,  name: Nintendo Switch
- id: 158,  name: Game Master
- id: 159,  name: Apple TV

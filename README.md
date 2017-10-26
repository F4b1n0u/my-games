# My Games
<p align="center">
  <img src ="https://github.com/F4b1n0u/my-games/blob/develop/demo.gif" />
</p>
My games is a react native application (iOS only for now), who allow you to keep track of your video game collection

## Supported Devices
### iOS
this app is supposed to work flawlessly on any iOS devices, phone or tablet

### Android
WORK IN PROGRESS
this app is runnable on Android, BUT there is no garranty it works fine, some issue are klnown like the overflow issues (like any RN app actually), and the side effects are triggered in a strange way. in any cases feel free to fix this issues you like, any contributions are more than welcome :)

## Features
you can search games in 3 fashions

- ### game name
In the search input, you can type the name of the game or part of it and simply press enter
- ### franchise name
In the search input, after typing some key word, you can have some suggestions of franchises, a franchise is a group of games under the same name

example: "mario" -> "super mario", "paper mario", etc
- ### Barcode scanner
You can also search a game via his barcode, could be conveninent if you already have a big collection.

# Test it live NOW
the app is still waiting to be release by Apple on his store, so to be able to use it right now on your iPhone or iPad,  you can visit the expo page on the following link

 https://expo.io/@f4b1n0u/my-games
 
 
# How to run your own version
in case you want to run it on your own dev environement you will have to:
- populate your own .env file
- add your sentry auth api key in expo.hooks.postPublish.config.authToken of the app.json


the supported platfom list is a group of IDs of platform separeted by a pipe "|"

Example: 1|2|3|4, to know which id you should use, you need to look at the GiantBomb api.

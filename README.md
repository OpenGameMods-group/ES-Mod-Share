# ES-Mod-Share

### About
ES Mod Share is a mod sharing website for [Endless Sky](http://endless-sky.github.io/)

https://evan153.github.io/ES-Mod-Share/

You may have to give the website permission to show dialog boxes. Using Google Chrome is strongly recommended.

### Installing a mod
Generally, installing a mod is as simple as dropping it into the folder for your operating system, specified here: https://github.com/endless-sky/endless-sky/wiki/CreatingPlugins.
However, different mods may have issues with other ones, so be sure to read each mod's description before installation, and **back up your saves**.

### Adding a mod (in three easy steps!)
1. Go to the `mods` folder and add your own mod folder (eg. `/mods/mymodfolder`). Inside, add a `metadata.json` file (eg. `/mods/mymodfolder/metadata.json`). The easiest way is to copy the [the example mod](https://github.com/evan153/ES-Mod-Share/tree/gh-pages/mods/mod-example-title).

2. Images may be either externally linked or hosted by the site.
    - To use an external link (eg. imgur), add the links to the `metadata.json` file.
    - Otherwise, include the images in your mod folder with the names `thumbnail.png` and `banner.png`.
    - The **thumbnail** is a small image that represents your mod in the list. The **banner** is larger and shown when your mod is being viewed by the user.

3. Add your mod to the `/mods/modList.txt` file, at the end. You must enter the same name as your folder name (eg. `mymodfolder`).

Finally, make a pull request!

This was just an example of how a mod sharing site could be done on Github, but it looks like this may be used instead of a different website. There will be upload requirements, and standard image sizes / tags added soon, but don't worry about that right now.

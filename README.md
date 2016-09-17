# Endless Sky Mod Share

### About
ES Mod Share is a mod sharing website for [Endless Sky](http://endless-sky.github.io/)

Website: https://evan153.github.io/ES-Mod-Share/

### Installing mods
Generally, installing a mod is as simple as dropping it into the Endless Sky `mods` folder for your operating system, specified here: https://github.com/endless-sky/endless-sky/wiki/CreatingPlugins.
However, some mods may have issues with other ones, so be sure to read each mod's description before installation, and **back up your saves**.

### Submitting a mod to the website
1. Go to the `mods` folder and add your own mod folder (eg. `/mods/mymodfolder`). Inside, add a `metadata.json` file (eg. `/mods/mymodfolder/metadata.json`). The easiest way is to copy the [the example mod](https://github.com/evan153/ES-Mod-Share/tree/gh-pages/mods/mod-example-title).

2. Images may be either externally linked or hosted by the site.
    - If you are using a local image (included in the website's source, not hosted elsewhere), prepend `local:` before the image name to tell the website that it's not a hyperlink.
        - eg. `local:banner.png`, `local:thumbnail.jpg`
    - The **thumbnail** is a small image that represents your mod in the list. 
    - The **banner** is larger and shown when your mod is being viewed by the user.

Finally, make a pull request!

Note: The data format for the mod data is YAML, but it is processed to json, which is why it has the json file extension.

All mod data is available in json format at https://evan153.github.io/ES-Mod-Share/mods-json.html.
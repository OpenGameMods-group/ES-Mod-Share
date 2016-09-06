// GUIDELINES
// To add a mod, create a new folder, following the template used in other mods.
// Then, add the name of the folder to mods/modList.txt
// Download and image should be links
// Put new mods at the bottom. They will be displayed first.
// USE HTTPS for external links or add your image to the img folder and link to that.
// Don't copy steam preview image urls upload to imgur or to the repo
// Use unique names
// Use small images less than 1mb in size

// F.A.Q
// No info link?
////Just put a #
// Quotes inside a description?
//// To use double quotes, put an escape character before, eg. \"
// Do I seperate with comas?
//// Yes, but do not put a coma after the last value which is tags.
// And include a coma after the last parenthesis like this createMod(),

var modListPromise = $.ajax({
		url: "mods/modList.txt"
	});

var theme = "light";
var modListObj;

$(document).ready(function(){
	dataPromise.done(function(data) {
		var modList = data.mods;
		var modCount = modList.length;
		console.debug("Loaded " + modCount + " mods");
		loadModList(modList);
		$('.mod-preview').show();

		loadTags(data.tags);
	});
});

function loadModList(mods) {
	$(mods).each(function(i, mod) {
			displayMod(mod, i);
	});

	var options = {
		valueNames: [ 'mod-title', 'mod-tags', 'mod-author', 'mod-contributor' ]
	}

	modListObj = new List('modsDiv', options);
}

function loadTags(tags) {
	tags.forEach(function(tag) {
		$("#left-sidebar ul").append("<li class='tag'><span class='tag-icon' />" + tag + "</li>");
	})

	$("#tagsList .tag").click(function(item) {
		var tag = $(this).text();
		$("#modSearch").val(tag);
		modListObj.search(tag);
	});
}

// Insert a mod, and use the number to determine which position it goes in
function displayMod(mod, number) {
	var id = mod.id;
	var metadata = mod.metadata;
	var titleNoS = id.replace(/\s/g, '') + number;

	var authors = Array.isArray(metadata.author) ? metadata.author.join(", ") : metadata.author;
	var contributors = Array.isArray(metadata.contributors) ? metadata.contributors.join(", ") : metadata.contributors;
	var thumbnail = metadata.thumbnail ? metadata.thumbnail : createModThumbnailUrl(id);
	var banner = metadata.banner ? metadata.banner : createModBannerUrl(id);

	// Create the html
	var modHTML = '<li><div class="mod">' +
					'<div class="mod-preview mdl-card mdl-shadow--2dp" data-toggle="modal" data-target="#' + titleNoS + '">' +
					'<div class="mod-preview-content">' +
					'<img class="preview-img" src="' + thumbnail + '" alt="' + metadata.title + '"' +
					'onerror="this.onerror=null; this.src=\'img/web/github-mark.png\';"' + '/>' +
					'</div>' +
					'<h4 class="preview-title">' + metadata.title + '</h4>' +
					'</div>' +

					'<div class="modal fade" id="' + titleNoS + '" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">' +
					'<div class="modal-dialog modal-lg" role="document">' +
					'<div class="modal-content mod-content">' +
					'<img class="mod-img" src="' + banner + '" alt="' + metadata.title + '"' + 'onerror="this.onerror=null; this.src=\'img/web/github-mark.png\';"' + '>' +
					'<h2 class="mod-title">' + metadata.title + '</h2>' + 
					'<h3 class="mod-author">By ' + authors  + '</h3>';

	if(contributors) {
		modHTML += '<h4 class="mod-contributor">with help from ' + contributors + '</h4>';
	}

	if(metadata.version) {
		modHTML += 'v' + metadata.version;
	}

	modHTML += '<p class="mod-description">' + metadata.description + '</p>';

	if(metadata.downloadLink) {
		modHTML +=	'<a type="button" class="btn btn-success mod-downloadLink" style="margin-right: 20px" href="' + metadata.downloadLink +
					'" target="_blank">' +
					'<span class="glyphicon glyphicon-download" aria-hidden="true"/> Download</a>';
	}

	if(metadata.website) {
		modHTML +=	'<a type="button" class="btn btn-default mod-website" href="' + metadata.website + '" target="_blank">Website</a>';
	}

	if(metadata.lastUpdated) {
		var date = new Date(metadata.lastUpdated);
		modHTML += '<div title="' + date.toLocaleDateString() + '">Last updated: ' + jQuery.format.prettyDate(date) + '</div>';
	}

	modHTML +=		'<br>' +
					'<span class="tags">Tags: </span><span class="mod-tags">' + metadata.tags.join(", ") + '</span>' +
					'</div></div></div></div></li>';

	// Append it to the list
	$("#modsList").append(modHTML);
}

function switchTheme() {
	$('.mod-preview').toggleClass("dark");
	$('.mod-content').toggleClass("dark");
	if (theme === "light") {
		//$('body').css('background-image', 'url("img/web/spacebg.jpg")');
		$('body').css('background-color', '#000');
		$('body').css('color', '#fff');
		theme = "dark";
	} else {
		$('body').css('background-image', '');
		$('body').css('background-color', '#fff');
		$('body').css('color', '#000');
		theme = "light";
	}
}

function fetchMod(directoryName, number) {
	return $.getJSON({
		url: createModMetadataUrl(directoryName)
	});
}

function createModMetadataUrl(directoryName) {
	return createModFolderUrl(directoryName) + "/" + metadataFilename;
}

function createModThumbnailUrl(directoryName) {
	return createModFolderUrl(directoryName) + "/" + thumbnailFilename;
}

function createModBannerUrl(directoryName) {
	return createModFolderUrl(directoryName) + "/" + bannerFilename;
}

function createModFolderUrl(directoryName) {
	return window.baseUrl + "/" + modFolder + "/" + directoryName;
}

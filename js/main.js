var theme = "light";

$(document).ready(function(){
	modListPromise.done(function(modList) {
		var modCount = modList.length;
		$('#loadText').text("There is a total of " + modCount + " mods");
		loadModList(modList);
		$('.mod-preview').show();
	});
});

function loadModList(modList) {
	$(modList.reverse()).each(function(i) {
			var folderName = modList[i];

			fetchMod(folderName, i)
				.done(function(metadata) {
					displayMod(folderName, metadata, i);
				})
				.error(function(jqXHR, textStatus, errorThrown) {
					console.error(errorThrown);
				});
	});
}

// Insert a mod, and use the number to determine which col it goes in
function displayMod(folderName, metadata, number) {
	var col = "firstCol";
	var titleNoS = folderName.replace(/\s/g, '') + number;

	var column = number % 3;
	switch(column) {
		case 0:
			col = "firstCol";
			break;
	 case 1:
			col = "secondCol";
			break;
	 case 2:
			col = "thirdCol";
			break;
	}

	var authors = Array.isArray(metadata.author) ? metadata.author.join(", ") : metadata.author;
	var contributors = Array.isArray(metadata.contributors) ? metadata.contributors.join(", ") : metadata.contributors;
	var thumbnail = metadata.thumbnail ? metadata.thumbnail : createModThumbnailUrl(folderName);
	var banner = metadata.banner ? metadata.banner : createModBannerUrl(folderName);

	// Create the html
	var modHTML = '<div class="mod">' +
					'<div class="mod-preview" data-toggle="modal" data-target="#' + titleNoS + '">' +
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

	modHTML += '<p class="mod-description">' + metadata.description + '</p>';

	if(metadata.downloadLink) {
		modHTML +=	'<a type="button" class="btn btn-success" style="margin-right: 20px" href="' + metadata.downloadLink +
					'" target="_blank">' +
					'<span class="glyphicon glyphicon-download" aria-hidden="true"/> Download</a>';
	}

	if(metadata.website) {
		modHTML +=	'<a type="button" class="btn btn-default" href="' + metadata.website + '" target="_blank">Website</a>';
	}

	modHTML +=		'<br>' +
					'<span class="tags">Tags: </span><span class="mod-tags">' + metadata.tags.join(", ") + '</span>' +
					'</div></div></div></div>';

	// Append it to the list
	$('#' + col).append(modHTML);
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

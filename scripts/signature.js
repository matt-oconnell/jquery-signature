(function($) {

	$.fn.signature = function(options) {

		/**
		 * Options
		 * @param {Boolean} responsiveWidth
		 * @param {Object}  saveButton    (jQuery)
		 * @param {Object}  clearButton   (jQuery)
		 * @param {Object}  resultsHolder (jQuery)
		 * @param {Boolean} localStore
		 */
		var settings = $.extend({
			responsiveWidth: true,
			saveButton: null,
			clearButton: null,
			resultsHolder: null,
			localStore: true
		}, options);

		var canvas = this[0];
		var signaturePad = new SignaturePad(canvas);

		if(settings.responsiveWidth) {
			canvas.width = $(window).width();
			$(window).resize(function() {
				canvas.width = $(window).width();
			});
		}

		var saveButton = settings.saveButton,
			lsKey = 'exp-signature' + window.location.href;
		if(saveButton) {
			saveButton.click(function() {
				if(signaturePad.isEmpty()) {
					alert("Please provide signature first.");
				} else {
					var sigURL = signaturePad.toDataURL();
					if(settings.localStore) {
						localStorage.setItem(lsKey, sigURL);
					}
					var sigImage = '<img src="' + sigURL + '" width="100%"/>';
					settings.resultsHolder.html(sigImage);
				}
			});
		}

		var clearButton = settings.clearButton;
		if(clearButton) {
			clearButton.click(function() {
				signaturePad.clear();
			})
		}

		if(settings.localStore) {
			var img = new Image();
			img.src = localStorage.getItem(lsKey) || '';
			if(img.src) {
				console.log(img.src);
				settings.resultsHolder.append(img);
			}
		}

		return signaturePad;
	};

}(jQuery));
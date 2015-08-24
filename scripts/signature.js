(function($) {

	$.fn.signature = function(options) {

		/**
		 * Options
		 * @param {Boolean} responsiveWidth
		 * @param {Object}  saveButton    (jQuery)
		 * @param {Object}  clearButton   (jQuery)
		 * @param {Object}  resultsHolder (jQuery)
		 */
		var settings = $.extend({
			responsiveWidth: true,
			saveButton: null,
			clearButton: null,
			resultsHolder: null,
			localStore: true
		}, options);

		var canvas = this[0];

		if(settings.responsiveWidth) {
			canvas.width = $(window).width();
			$(window).resize(function() {
				canvas.width = $(window).width();
			});
		}

		var signaturePad = new SignaturePad(canvas);

		var saveButton = settings.saveButton;
		if(saveButton) {
			saveButton.click(function() {
				if(signaturePad.isEmpty()) {
					alert("Please provide signature first.");
				} else {
					var sigURL = signaturePad.toDataURL();
					if(settings.localStore) {
						localStorage.setItem('exp-signature', sigURL);
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

		return signaturePad;
	};

}(jQuery));

	// Helpers
	// Source: https://gist.github.com/tracend/8434259
	_.mixin({
		// Uppercase the first character of each word in a string
		// From: http://phpjs.org/functions/ucwords/
		ucwords : function(str) {
			return (str + '').replace(/^([a-z])|\s+([a-z])|-([a-z])/g, function ($1) {
				return $1.toUpperCase();
			});
		}
	});


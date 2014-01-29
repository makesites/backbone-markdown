/* Backbone Markdown
 * Source: https://github.com/makesites/backbone-markdown
 * Copyright © Makesites.org
 *
 * Initiated by Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */
(function($, _, Backbone) {

	// Supports a template written in markdown
	// ( showdown.js assumed loaded )
	// options:
	// - url : for a file containing the temaplte
	// - html : for a string directly used as the template
	//
	APP.Templates.Markdown = APP.Template.extend({
		compile: (new Showdown.converter()).makeHtml
	});

	APP.Views.Markdown = APP.View.extend({
		options: {
			template: APP.Templates.Markdown,
			mdRoot: "assets/html/" // with trailing slash please...
		},

		events: {
			"click a" : "processLink"
		},

		initialize: function( options ){
			//
			var page = _.ucwords( options.page );
			options.url = this.options.mdRoot + page +".md";
			//
			return APP.View.prototype.initialize.call( this, options );
		},

		processLink : function( e ){
			e.preventDefault();
			var el = ( e.target.tagName == "A") ?  $(e.target) : $(e.target).closest("a");
			var url= el.attr("href");
			// if a full http link allow the clickthrough
			if(/(file|http).*/.test(url)) window.location = url;
			// 'clean' all the wiki paths
			url= url.replace("./wiki", "").replace("./", "");
			// goto the new page
			app.navigate(url, true);
		}

	});

	// Helpers
	// Source: https://gist.github.com/tracend/8434259
	_.mixin({
		// Uppercase the first character of each word in a string
		// From: http://phpjs.org/functions/ucwords/
		ucwords : function(str) {
		  return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
			return $1.toUpperCase();
		  });
		}
	});


})(this.jQuery, this._, this.Backbone);

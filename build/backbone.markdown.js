/**
 * @name backbone.markdown
 * A Backbone.js extension to automatically load Markdown pages as views 
 *
 * Version: 0.2.0 (Sun, 12 Oct 2014 02:58:27 GMT)
 * Source: http://github.com/makesites/backbone-markdown
 *
 * @author makesites
 * Initiated by: Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 *
 * @cc_on Copyright © Makesites.org
 * @license Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function($, _, Backbone) {



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
			mdRoot: "assets/html/", // with trailing slash please...
			parseName: false
		},

		events: {
			"click a" : "processLink"
		},

		initialize: function( options ){
			//
			var page = ( options. parseName || this.options. parseName ) ? this._parseName( options.page ) : options.page;
			this.options.url = this.options.mdRoot + page +".md";
			//
			return APP.View.prototype.initialize.call( this, options );
		},

		processLink: function( e ){
			e.preventDefault();
			var el = ( e.target.tagName == "A") ?  $(e.target) : $(e.target).closest("a");
			var url= el.attr("href");
			// if a full http link allow the clickthrough
			if(/(file|http).*/.test(url)) window.location = url;
			// 'clean' all the wiki paths
			url= url.replace("./wiki", "").replace("./", "");
			// goto the new page
			app.navigate(url, true);
		},

		// bridges the gap between the url and the actual filename
		// update with your own logic
		_parseName: function ( page ){
			// by default just capitalizing page name
			page = _.ucwords( page );
			return page;
		}

	});



})(this.jQuery, this._, this.Backbone);

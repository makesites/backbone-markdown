/**
 * @name backbone.markdown
 * A Backbone.js extension to automatically load Markdown pages as views 
 *
 * Version: 0.3.0 (Thu, 18 Dec 2014 11:14:43 GMT)
 * Source: http://github.com/makesites/backbone-markdown
 *
 * @author makesites
 * Initiated by: Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 *
 * @cc_on Copyright © Makesites.org
 * @license Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function (lib) {

	//"use strict";

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		var deps = ['jquery', 'underscore', 'backbone']; // condition when backbone.app is part of the array?
		define(deps, lib);
	} else if ( typeof module === "object" && module && typeof module.exports === "object" ){
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = lib;
	} else {
		// Browser globals
		var Query = window.jQuery || window.Zepto || window.vQuery;
		lib(Query, window._, window.Backbone);
	}
}(function ($, _, Backbone) {

	// support for Backbone APP() view if available...
	var APP  = window.APP || false;
	var isAPP = ( APP !== false );
	var View = ( isAPP && typeof APP.View !== "undefined" ) ? APP.View : Backbone.View;


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
	var compiler = (new Showdown.converter()).makeHtml;
	var Template = ( isAPP && APP.Template ) ?
		APP.Template.extend({
			compile: compiler
		}) :
		compiler;

	var Markdown = View.extend({
		options: {
			template: Template,
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
			return View.prototype.initialize.call( this, options );
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



	// update Backbone namespace regardless
	Backbone.Markdown = Markdown;
	if( isAPP ){
		APP.Templates.Markdown = Template;
		APP.Views.Markdown = Markdown;
	}

	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.Backbone = Backbone;
		// update APP namespace
		if( isAPP ){
			window.APP = APP;
		}
	}

	// for module loaders:
	return Markdown;

}));

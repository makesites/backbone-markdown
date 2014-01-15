// Markdown
// Source: https://gist.github.com/tracend/8434259
(function($, _, Backbone) {

	// Set markdown template
	APP.Templates.Markdown = APP.Template.extend({
		compile: (new Showdown.converter()).makeHtml
	});

	APP.Views.Markdown = APP.View.extend({
		options: {
			template: APP.Templates.Markdown, 
			htmlRoot: "assets/html/" // with trailing slash please...
		}, 
		
		events: {
			"click a" : "processLink"
		},
		
		initialize: function( options ){
			// 
			var page = _.ucwords( options.page );
			options.url = this.options.htmlRoot + page +".md";
			// 
			return APP.View.prototype.initialize.apply( this, options );
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

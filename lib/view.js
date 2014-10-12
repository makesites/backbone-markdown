
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

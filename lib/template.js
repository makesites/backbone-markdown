
	// Supports a template written in markdown
	// ( showdown.js assumed loaded )
	// options:
	// - url : for a file containing the temaplte
	// - html : for a string directly used as the template
	//
	APP.Templates.Markdown = APP.Template.extend({
		compile: (new Showdown.converter()).makeHtml
	});

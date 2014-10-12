
	// Supports a template written in markdown
	// ( showdown.js assumed loaded )
	// options:
	// - url : for a file containing the temaplte
	// - html : for a string directly used as the template
	//
	var Template = APP.Template.extend({
		compile: (new Showdown.converter()).makeHtml
	});

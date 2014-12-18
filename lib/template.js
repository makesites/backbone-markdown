
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
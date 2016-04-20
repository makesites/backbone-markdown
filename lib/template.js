
	// Supports a template written in markdown
	// ( showdown.js assumed loaded )
	// options:
	// - url : for a file containing the temaplte
	// - html : for a string directly used as the template
	//

	// init compiler
	var compiler;
	if( Showdown.Converter ){
		// newer API...
		var lib = new Showdown.Converter();
		compiler = lib.makeHtml.bind(lib);
	} else {
		// legacy API < v1
		compiler = (new Showdown.converter()).makeHtml;
	}
	// prerequisite #2
	if( !compiler ) return null;

	var Template = ( isAPP && APP.Template ) ?
		APP.Template.extend({
			compile: compiler
		}) :
		compiler;

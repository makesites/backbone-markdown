# Backbone Markdown

A Backbone.js extension to automatically load Markdown pages in views


## Dependencies

This version is expecting these libraries already loaded:

* [Backbone APP](https://github.com/makesites/backbone-app)
* [Showdown](https://github.com/coreyti/showdown)

Future version may deprecate the need of the APP()


## Install

Using Bower:
```
bower install backbone.markdown
```


## Usage

There's a blueprint view you can use and extend:
```
var MyView = APP.Views.Markdown.extend({
	// custom code
});
var view = new MyView();
```


## Options

* __mdRoot__: (_string_) defining the location of the markdown files


## Credits

Initiated by Makis Tracend ( [@tracend](http://github.com/tracend) )

Distributed through [Makesites.org](http://makesites.org/)

Released under the [MIT license](http://makesites.org/licenses/MIT)

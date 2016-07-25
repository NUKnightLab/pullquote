/**
  Pullquote
*/


// Knight Lab Namespace
KL = {};

// Debug Mode
KL.debug = true;


/*	KL.Bind
================================================== */
KL.Bind = function (/*Function*/ fn, /*Object*/ obj) /*-> Object*/ {
    return function () {
        return fn.apply(obj, arguments);
    };
};

/*	Required Files
    Webpack
    https://webpack.github.io/
================================================== */

// CORE
KL.Browser = require("core/KL.Browser");

// DOM
KL.DomEvent = require("dom/KL.DomEvent");

// Data
KL.Data = require("data/KL.Data");

// QUOTE
KL.QuoteComposition = require("quote/KL.QuoteComposition");

_ = require("lodash");

/*	Trace (console.log)
    Wrapped in a function to allow a boolean switch
    to show console log only if in debug mode.
================================================== */
trace = function( msg ) {
    if (KL.debug) {
        if (window.console) {
            console.log(msg);
        } else if ( typeof( jsTrace ) != 'undefined' ) {
            jsTrace.send( msg );
        } else {
            //alert(msg);
        }
    }
}

//extrapolating function for create div and add className
create = function(tagName, className, container) {
    var el = document.createElement(tagName);
    el.className = className;
    if (container) {
        container.appendChild(el);
    }
    return el;
}

KL.Pullquote = (function() {

    // DOM ELEMENTS
    this.el = {
        container: document.getElementById("pullquote-container"),
        container_content: {},
    };

    // OPTIONS
    this.options = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    // SLIDER
    this.slider = {};

    // Quote Objects
    this.quotes = [];

    // Quote Compositions
    this.quote_compositions = [];

    // DATA
    this.data = {
        quote: "Quote",
        cite: "Citation",
        image: "assets/placeholder.jpg",
        headline: "Headline",
        anchor:false,
        credit: ""
    };

    this.getURLVars = function(string) {
      var urlVars = {},
          str = string.toString();

      if(string.match('&#038;') || (string.match('&amp'))) {
        var match = string.match('&#038') || string.match('&amp');
        str = string.replace(match, '&');
      }

      urlVars = str.split('?')[1].split('&');

      for(var i=0; i<urlVars.length; i++) {
        varObj = urlVars[i].split('=');
        urlVars[varObj[0]] = varObj[1];
      }

      return urlVars;
    }

    // LOAD EXAMPLE QUOTES
    this.load_quotes = function() {
        this.vars = this.getURLVars(window.location.href);
        _.assign(this.data, vars);

        // LAYOUT
        this.el.container.innerHTML = "";
        this.el.container_content = create('div', 'editor-content', this.el.container);

        // Create Quotes
        this.createComposition(this.data, false, true);
        this.createComposition(this.data, "left", true);
        this.createComposition(this.data, "right", true);
        this.createComposition(this.data, false, false);
    };

    this.createComposition = function(d, anchor, use_image) {
        var composition = new KL.QuoteComposition(d, {anchor:anchor, use_image:use_image});
        this.el.container_content.appendChild(composition._el.container);
        this.quote_compositions.push(composition);
    };

    /*	EVENTS
    ================================================== */
    window.onresize = function(event) {

        this.options.width = window.innerWidth;
        this.options.height = window.innerHeight;
    }

    /*	INIT
    ================================================== */
    this.load_quotes();


})();

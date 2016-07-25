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
    var el = {
        container: document.getElementById("pullquote-container"),
        container_content: {},
    },

    // OPTIONS
    options = {
        width: window.innerWidth,
        height: window.innerHeight,
    },

    // SLIDER
    slider = {},

    // Quote Objects
    quotes = [],

    // Quote Compositions
    quote_compositions = [],

    // DATA
    data = {
        quote: "Quote",
        cite: "Citation",
        image: "assets/placeholder.jpg",
        headline: "Headline",
        anchor:false,
        credit: ""
    };

    getURLVars = function(string) {
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
    load_quotes = function() {
        vars = getURLVars(window.location.href);
        _.assign(data, vars);

        // LAYOUT
        el.container.innerHTML = "";
        el.container_content = create('div', 'editor-content', el.container);

        // Create Quotes
        createComposition(data, false, true);
        createComposition(data, "left", true);
        createComposition(data, "right", true);
        createComposition(data, false, false);
    };

    createComposition = function(d, anchor, use_image) {
        var composition = new KL.QuoteComposition(d, {anchor:anchor, use_image:use_image});
        el.container_content.appendChild(composition._el.container);
        quote_compositions.push(composition);
    };

    /*	EVENTS
    ================================================== */
    window.onresize = function(event) {
        options.width = window.innerWidth;
        options.height = window.innerHeight;
    }

    /*	INIT
    ================================================== */
    load_quotes();


})();

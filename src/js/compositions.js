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

// Helper Function
KL.Helper = require("helpers/KL.Helper");

_ = require("lib/lodash.js");

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
    quote_compositions = [];

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
        urlVars = getURLVars(window.location.href);

        // LAYOUT
        el.container.innerHTML = "";
        el.container_content = KL.Helper.create('div', 'editor-content', el.container);

        // Create Quotes
        createComposition(urlVars, false, true);
        createComposition(urlVars, "left", true);
        createComposition(urlVars, "right", true);
        createComposition(urlVars, false, false);
    };

    createComposition = function(d, anchor, use_image) {
        var composition = new KL.QuoteComposition().init(d, {anchor:anchor, use_image:use_image});
        el.container_content.appendChild(composition.container);
        quote_compositions.push(composition);
    };

    /*	INIT
    ================================================== */
    load_quotes();

})();

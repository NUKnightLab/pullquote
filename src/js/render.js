/**
  Pullquote
*/ 


// Knight Lab Namespace
KL = {};
KL.QuoteComposition = require('quote/KL.QuoteComposition');

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
KL.Util = require("core/KL.Util.js");

KL.PullquoteRender = (function() {
    var currentURL = window.location.href;

    _getURLVars = function(string) {
      var urlVars = {},
          str = string.toString();

      urlVarArray = str.split('?')[1].split('&');

      for(var i = 0; i < urlVarArray.length; i++) {
        urlKey = urlVarArray[i].split('=')[0];
        urlVal = urlVarArray[i].replace(/([^=]*)./, '')
        urlVars[urlKey] = urlVal;
      }

      return urlVars;
    }

    _createComposition = function(data) {
        KL.QuoteComposition().createPullquoteComposition(data);
    };

    init = function() {
        //grab url params
        var urlVars = _getURLVars(currentURL);
        _createComposition(urlVars);
    }()

})();


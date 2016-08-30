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

      if(str.match('&#038;') || (str.match('&amp'))) {
        var match = str.match('&#038') || str.match('&amp;');
        var re = new RegExp(match,"g");
        str = str.replace(re, '&')
      }

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

    callScreenshot = function() {
        var service_url = "https://screenshot.knightlab.com?&amp;"
            api_url = service_url + current_url,

            request = new XMLHttpRequest();
        path = decodeURIComponent(api_url);
        request.open('GET', path, true);

        request.addEventListener('load', function() {
            thing = this.responseText;
            p = thing.replace("{\"", "");
            p = p.replace("\"}", "");
            p = p.split(",");
            for(i=0;i<p.length;i++){
                result = p[i].split("\":\"");
                if(result[0].indexOf('screenshotLocation') > 0) {
                    window.location = result[1];
                }
            }
        })
        request.send();
    }

    init = function() {
        console.log('render');
        //grab url params
        var urlVars = _getURLVars(currentURL);
        _createComposition(urlVars)
        callScreenshot();
    }()

})();


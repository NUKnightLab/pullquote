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

    _encodeURL = function(url) {
        return encodeURIComponent(url);
    }

    callScreenshot = function(currentURL, data) {
        var service_url = "https://screenshot.knightlab.com?&amp;"
            url_vars = "&amp;anchor=" + data.anchor;
            url_vars += "&amp;quote=" + data.quote;
            url_vars += "&amp;cite=" + data.cite;
            url_vars += "&amp;image=" + data.image;
            url_vars += "&amp;credit=" + data.credit;
            url_vars += "&amp;use_image=" + data.use_image;
            url_vars += "&amp;width=500&amp;height=300";
            api_url = service_url + "url=" + currentURL + url_vars;

        var request = new XMLHttpRequest();
        request.open('GET', api_url, true);

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
        //grab url params
        var urlVars = _getURLVars(currentURL);
        _createComposition(urlVars);
        currentURL = _encodeURL(currentURL);
        callScreenshot(currentURL, urlVars);
    }()

})();


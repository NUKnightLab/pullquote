/**
  Pullquote
*/

// Knight Lab Namespace
KL = {};

KL.Browser = require("core/KL.Browser");
KL.DomEvent = require("dom/KL.DomEvent");
KL.Data = require("data/KL.Data");
KL.QuoteComposition = require("quote/KL.QuoteComposition");
KL.Helper = require("helpers/KL.Helper");

_ = require("lib/lodash.js");

KL.Pullquote = (function() {

    var el = {
        container: document.getElementById("pullquote-container"),
        container_content: {},
        },
        quote_compositions = [],

        QUOTE = "Insert Quote Here",
        CITE = "Insert Citation Here",
        HEADLINE = "Insert Headline Here",
        IMAGE = "assets/placeholder.jpg",

        ANCHOR = false,
        USE_IMAGE = true;

    /**
     * _getURLVars: Parses a given url string and grabs the variables passed into the url
     *
     * @param string urlString
     * @returns object urlVars
     */
    _getURLVars = function(string) {
      var urlVars = {},
          str = string.toString();

      if(string.match('&#038;') || (string.match('&amp'))) {
        var match = string.match('&#038') || string.match('&amp');
        str = string.replace(match, '&');
      }

      urlVarArray = str.split('?')[1].split('&');

      for(var i = 0; i < urlVarArray.length; i++) {
        urlKey = urlVarArray[i].split('=')[0];
        urlVal = urlVarArray[i].replace(/([^=]*)./, '')
        urlVars[urlKey] = urlVal;
      }

      return urlVars;
    }

    /**
     * createPullQuoteContent: creates content for all pullquote items; if none given, it uses defaults
     *
     * @param Object datum (from url params)
     * @returns Object data (constructed for composition)
     */
    createPullquoteContent = function(datum) {
        data = {
            quote: datum.quote || QUOTE,
            cite: datum.cite || CITE,
            image: datum.image || IMAGE,
            headline: datum.headline || HEADLINE,
            credit: "",
            download: ""
        }

        return data;
    }

    /**
     * createPullQuoteLayoutCustomizations: creates customizations for each individual pullquote item; if none given, it uses defaults 
     *
     * @param Boolean anchor
     * @param Boolean use_image
     * @returns Object options
     */
    createPullquoteLayoutCustomization = function(anchor, use_image) {
        options = {
            editable: true,
            anchor: anchor || ANCHOR,
            classname: "",
            base_classname: "kl-quotecomposition",
            use_image: use_image || USE_IMAGE,
            download_ready: false
        }

        return options;
    },


    /**
     * createComposition: composes the layout for image and quote and appends it to the container element 
     *
     * @param String urlData
     * @param Boolean anchor
     * @param Boolean use_image
     * @returns {undefined}
     */
    _createComposition = function(data, anchor, use_image) {
        var layoutOptions = createPullquoteLayoutCustomization(anchor, use_image);
        var composition = KL.QuoteComposition().createPullquoteComposition(data, layoutOptions);

        el.container_content.appendChild(composition.container);
        quote_compositions.push(composition);
    };

    /**
     * _init: creates the composition for pullquote
     *
     * @returns {undefined}
     */
    _init = function() {
        urlVars = _getURLVars(window.location.href);

        // LAYOUT
        el.container.innerHTML = "";
        el.container_content = KL.Helper.create('div', 'editor-content', el.container);

        // Create Content
        urlVars = createPullquoteContent(urlVars);

        // Create Pullquote Composition
        _createComposition(urlVars, false, true);
        _createComposition(urlVars, "left", true);
        _createComposition(urlVars, "right", true);
        _createComposition(urlVars, false, false);
    }();

})();

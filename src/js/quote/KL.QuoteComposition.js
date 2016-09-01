/*	KL.QuoteComposition
================================================== */

Handlebars = require('handlebars');

KL.Class = require("core/KL.Class");
KL.Helper = require("helpers/KL.Helper");

module.exports = KL.Class.extend({
    includes: [KL.Events, KL.DomMixins, KL.Helper]
})

KL.QuoteComposition = function() {
    //var Handlebars = require('handlebars'),
    var data;

    /**
     * createPullquoteComposition: function composing layout customization and composition
     *
     * @param Object data
     * @param Object options
     * @returns {undefined}
     */
    createPullquoteComposition = function(data, counter) {
        var that = this;
        that.data = data;

        if(counter === undefined) {
            counter = 0;
        }

        _initLayout(counter, that);
        _initEvents(that);
    },

    /**
     * _onContentEdit: updates the text size of the quote as you type so it fits in the pullquote container
     *
     * @returns {undefined}
     */
    _onContentEdit = function() {
        data.quote = event.target.innerHTML;
        var quote_detail = _determineTextSize();
        event.target.parentElement.className = quote_detail.sizeclass;
    },

    _onDownload = function(e) {
        _callScreenshot('http://pullquote.knilab.com/render.html?', data);
    },

    _encodeURL = function(url) {
        return encodeURIComponent(url);
    },

    _callScreenshot = function(currentURL, data) {
        var service_url = "https://screenshot.knightlab.com?&amp;";
            url_vars = "&anchor=" + data.anchor;
            url_vars += "&quote=" + data.quote;
            url_vars += "&cite=" + data.cite;
            url_vars += "&image=" + data.image;
            url_vars += "&credit=" + data.credit;
            url_vars += "&use_image=" + data.use_image;

            currentURL = _encodeURL(currentURL);
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
    },

    /**
     * _determineTextSize: checks the anchor param in options and sets the text size
     *
     * @param Object that = undefined(default)
     * @returns {undefined}
     */
    _determineTextSize = function(that) {
        that = that || undefined;
        if (that !== undefined) {data = that.data;}
        var quote_detail = {
            sizeclass: "",
            quote: data.quote
        }

        quote_detail.quote = decodeURIComponent(quote_detail.quote);


        if (!data.anchor) {
            if (data.quote.length < 125) {
                quote_detail.sizeclass = "kl-quote-large";
            } else if (data.quote.length < 250) {
                // Normal size, do nothing
            } else if (data.quote.length < 500) {
                quote_detail.sizeclass = "kl-quote-small";
            } else {
                if (KL.Browser.webkit) {
                    quote_detail.sizeclass = "kl-quote-ellipsis";
                } else {
                    quote_detail.sizeclass = "kl-quote-ellipsis-non-webkit";
                }
            }
        } else {
            if (data.quote.length > 150) {
                if (KL.Browser.webkit) {
                    quote_detail.sizeclass = "kl-quote-ellipsis";
                } else {
                    quote_detail.sizeclass = "kl-quote-ellipsis-non-webkit";
                }
            }
        }

        return quote_detail;
    },

    /**
     * _initLayout: creates the structure for the pullquote composition
     *
     * @param Object that
     * @returns {undefined}
     */
    _initLayout = function (counter, that) {
        var template = document.getElementById('pq-iframe-content-template').innerHTML,
            output = Handlebars.compile(template),
            container = document.getElementById('pullquote-container'),

            pullquoteEl = KL.Helper.create('div', 'pullquote-composition', container);

        pullquoteEl.innerHTML += output(that.data);
        // Listener for save button
        document.getElementsByClassName('kl-button')[counter].addEventListener('click', _onDownload, false)

        var blockquote = document.getElementsByClassName('kl-quote-large')[counter];
        that.blockquote_input = blockquote.getElementsByTagName('p')[0];

        _determineTextSize(that);
    },

    /**
     * _initEvents: Add events to the pullquote input element
     *
     * @param Boolean editable
     * @returns {undefined}
     */
    _initEvents = function (that) {
        if (that.data.editable) {
            that.blockquote_input.addEventListener('input', _onContentEdit, false)
        }
    }

    return {
        createPullquoteComposition: createPullquoteComposition
    }
};

module.exports = KL.QuoteComposition


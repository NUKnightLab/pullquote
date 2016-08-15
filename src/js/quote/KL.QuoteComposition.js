/*	KL.QuoteComposition
================================================== */

KL.Class = require("core/KL.Class");

module.exports = KL.Class.extend({
    includes: [KL.Events, KL.DomMixins, KL.Helper]
})

KL.QuoteComposition = function() {
    var Handlebars = require('handlebars'),
        
        blockquote_input, data,
        animator = null;

    /**
     * createPullquoteComposition: function composing layout customization and composition
     *
     * @param Object data
     * @param Object options
     * @returns {undefined}
     */
    createPullquoteComposition = function(data) {
        var that = this;
        that.data = data;

        _initLayout(that);
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
        if (data.download_ready) {
            e.target.click();

        } else {
            _getImage(e);
        }
        },

        /**
         * _getImage: gets Image using phantom
         *
         * @param e
         * @returns {undefined}
         */
        _getImage = function(e) {
            // width 1010
            // height 566
            var _self = this,
                service_url = "https://ccq6cw2sih.execute-api.us-east-1.amazonaws.com/prod/PhantomJS?width=1010&height=566&url=",
                render_page_url = "https://nuknightlab.github.io/pullquote/dist/render.html",
                url_vars = "?",
                api_url = "";

                url_vars += "anchor=" + options.anchor;
                url_vars += "&quote=" + _el.blockquote_p.innerHTML;
                url_vars += "&cite=" + _el.citation.innerHTML;
                url_vars += "&image=" + data.image;
                url_vars += "&credit=" + data.credit;
                url_vars += "&use_image=" + options.use_image;

            if (!window.location.origin) {
                window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
            }

        api_url = service_url + render_page_url + url_vars;

        KL.Data.getJSON(api_url, function(d) {
            _self.data.download = d.screenshotLocation;
            _self._el.button_download.href = _self.data.download;
            _self._el.button_download.download = "pullquote.png";
            _self.options.download_ready = true;
            _self._onDownload();
        });
    },

    /**
     * _determineTextSize: checks the anchor param in options and sets the text size
     *
     * @param Object that = undefined(default)
     * @returns {undefined}
     */
    _determineTextSize = function(that = undefined) {
        that = that;
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
    _initLayout = function (that) {
        var template = document.getElementById('pq-iframe-content-template').innerHTML,
            output = Handlebars.compile(template),

            container = document.getElementById('pullquote-container'),
            wrapper = document.createElement('div');

            wrapper.innerHTML = output(that.data);
            document.getElementById('pullquote-container').appendChild(wrapper);
        // Listener for save button
        document.getElementsByClassName('kl-button')[0].addEventListener('click', _onDownload, false)
        
        var blockquote = document.getElementsByClassName('kl-quote-large')[0];
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


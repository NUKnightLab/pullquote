/*	KL.QuoteComposition
================================================== */

KL.Class = require("core/KL.Class");

module.exports = KL.Class.extend({
    includes: [KL.Events, KL.DomMixins, KL.Helper]
})

KL.QuoteComposition = function() {
    var data, options,
        _el = {
            container: {},
            background: {},
            composition_container: {},
            composition_text: {},
            blockquote: {},
            blockquote_p: {},
            citation: {},
            image: {},
            button_group: {},
            button_tweet: {},
            button_download: {}
        },
        animator = null;

    /**
     * createPullquoteComposition: function composing layout customization and composition
     *
     * @returns {undefined}
     */
    createPullquoteComposition = function(data, options) {
        var that = this;

        that.data = data;
        that.options = options;

        _el.container = KL.Helper.create("div", options.base_classname);

        _updateClassName(options);

        _initLayout(that);
        _initEvents(options.editable);

        return _el;
    },

    /**
     * _onContentEdit: updates the text size of the quote as you type so it fits in the pullquote container
     *
     * @returns {undefined}
     */
    _onContentEdit = function() {
        data.quote = _el.blockquote_p.innerHTML;
        var quote_detail = _determineTextSize();
        _el.blockquote.className = quote_detail.sizeclass;
    },

    _onDownload = function(e) {
        if (options.download_ready) {
            _el.button_download.click();

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
        if (that !== undefined) {data = that.data; options = that.options}
        var quote_detail = {
            sizeclass: "",
            quote: data.quote
        }

        quote_detail.quote = decodeURIComponent(quote_detail.quote);


        if (!options.anchor) {
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
     * _render: constructs each pullquote item
     *
     * @param Object that
     * @returns {undefined}
     */
    _render = function(that) {
        var quote_detail = _determineTextSize(that);
        _el.blockquote.className = quote_detail.sizeclass;
        _el.blockquote_p.innerHTML = quote_detail.quote;

        _el.citation.innerHTML = that.data.cite.replace(/%20| /g, ' ');
        if (that.options.use_image) {
            _el.image.style.backgroundImage = "url('" + that.data.image + "')";
        }

        _el.blockquote_p.contentEditable = that.options.editable;
        _el.citation.contentEditable = that.options.editable;
    },

    /**
     * _updateClassName: updates the classname of each pullquote item based on it's anchor placement
     *
     * @param Object options
     * @returns {undefined}
     */
    _updateClassName = function(options) {
        options.classname = options.base_classname;

        if (options.anchor) {
            options.classname += " kl-anchor-" + options.anchor;
        }

        if (options.editable) {
            options.classname += " kl-editable";
        }

        _el.container.className = options.classname;
    },

    /**
     * _initLayout: creates the structure for the pullquote composition
     *
     * @param Object that
     * @returns {undefined}
     */
    _initLayout = function (that) {
        // Create Layout
        _el.composition_container 	= KL.Helper.create("div", "kl-quotecomposition-container", _el.container);
        _el.composition_text = KL.Helper.create("div", "kl-quotecomposition-text", _el.composition_container);
        _el.blockquote	= KL.Helper.create("blockquote", "", _el.composition_text);
        _el.blockquote_p = KL.Helper.create("p", "", _el.blockquote);
        _el.citation = KL.Helper.create("cite", "", _el.blockquote);
        _el.background	= KL.Helper.create("div", "kl-quotecomposition-background", _el.composition_container);
        _el.image = KL.Helper.create("div", "kl-quotecomposition-image", _el.composition_container);

        // Create Buttons
        _el.button_group = KL.Helper.create("div", "kl-button-group", _el.container);
        _el.button_download = KL.Helper.create("a", "kl-button kl-button-right", _el.button_group);

        _el.button_download.innerHTML = "Save";

        // Listener for save button
        KL.DomEvent.addListener(_el.button_download, 'click', _onDownload, this);

        _render(that);
    },

    /**
     * _initEvents: Add events to the pullquote input element
     *
     * @param Boolean editable
     * @returns {undefined}
     */
    _initEvents = function (editable) {
        if (editable) {
            KL.DomEvent.addListener(_el.blockquote_p, 'input', _onContentEdit, this);
        }
    }

    return {
        createPullquoteComposition: createPullquoteComposition
    }
};

module.exports = KL.QuoteComposition 


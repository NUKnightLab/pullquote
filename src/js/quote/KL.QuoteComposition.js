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

        QUOTE = "Insert Quote Here",
        CITE = "Insert Citation Here",
        HEADLINE = "Insert Headline Here",
        IMAGE = "assets/placeholder.jpg",

        ANCHOR = false,
        USE_IMAGE = true,

        animator = null;

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
    createPullquoteLayoutCustomizations = function(anchor, use_image) {
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
     * createLayout: Composes the quote and image in a layout
     *
     * @returns {undefined}
     */
    createLayout = function(data, options) {
        _el.container = KL.Helper.create("div", options.base_classname);

        _updateClassName(options);

        _initLayout(data, options);
        _initEvents(options.editable);

        return _el;
    },

    /*	Events
    ================================================== */
    _onMouseClick = function() {
        return this;
    },

    _onContentEdit = function() {
        data.quote = _el.blockquote_p.innerHTML;
        var quote_detail = _determineTextSize(data.quote);
        _el.blockquote.className = quote_detail.sizeclass;
    },

    _onDownload = function(e) {
        if (options.download_ready) {
            _el.button_download.click();

        } else {
            _getImage(e);
        }
    },

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

    /*	Private Methods
    ================================================== */
    _determineTextSize = function(q, options) {
        var quote_detail = {
            sizeclass: "",
            quote: q
        }

        quote_detail.quote = decodeURIComponent(quote_detail.quote);


        if (!options.anchor) {
            if (q.length < 125) {
                quote_detail.sizeclass = "kl-quote-large";
            } else if (q.length < 250) {
                // Normal size, do nothing
            } else if (q.length < 500) {
                quote_detail.sizeclass = "kl-quote-small";
            } else {
                if (KL.Browser.webkit) {
                    quote_detail.sizeclass = "kl-quote-ellipsis";
                } else {
                    quote_detail.sizeclass = "kl-quote-ellipsis-non-webkit";
                }
            }
        } else {
            if (q.length > 150) {
                if (KL.Browser.webkit) {
                    quote_detail.sizeclass = "kl-quote-ellipsis";
                } else {
                    quote_detail.sizeclass = "kl-quote-ellipsis-non-webkit";
                }
            }
        }

        return quote_detail;
    },

    _render = function(data, options) {
        var quote_detail = _determineTextSize(data.quote, options);
        _el.blockquote.className = quote_detail.sizeclass;
        _el.blockquote_p.innerHTML = quote_detail.quote;

        _el.citation.innerHTML = data.cite.replace(/%20| /g, ' ');
        if (options.use_image) {
            _el.image.style.backgroundImage = "url('" + data.image + "')";
        }

        _el.blockquote_p.contentEditable = options.editable;
        _el.citation.contentEditable = options.editable;
    },

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

    _initLayout = function (data, options) {

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

        _render(data, options);
    },

    _initEvents = function (editable) {
        KL.DomEvent.addListener(_el.container, 'click', _onMouseClick, this);
        if (editable) {
            KL.DomEvent.addListener(_el.blockquote_p, 'input', _onContentEdit, this);
        }
    }

    return {
        createPullquoteContent: createPullquoteContent,
        createPullquoteLayoutCustomizations: createPullquoteLayoutCustomizations,
        createLayout: createLayout
    }
};

module.exports = KL.QuoteComposition 


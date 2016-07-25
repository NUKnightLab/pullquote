/*	KL.QuoteComposition
================================================== */

KL.Class = require("core/KL.Class");

module.exports = KL.Class.extend({

    includes: [KL.Events, KL.DomMixins, KL.Helper],
    _el: {},

    /*	Constructor
    ================================================== */
    initialize: function(data, options, add_to_container) {
        // DOM ELEMENTS
        this._el = {
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
        };

        // Data
        this.data = {
            quote: "Quote goes here, gonna make it longer to see",
            cite: "Citation",
            image: "Description",
            headline: "Headline",
            credit: "",
            download: ""
        };

        //Options
        this.options = {
            editable: true,
            anchor: false,
            classname: "",
            base_classname: "kl-quotecomposition",
            use_image: true,
            download_ready: false
        };

        this.animator = null;

        // Merge Data and Options
        _.assign(this.options, options);
        _.assign(this.data, data);

        this._el.container = KL.Helper.create("div", this.options.base_classname);

        this._updateClassName();

        this._initLayout();
        this._initEvents();

        if (add_to_container) {
            add_to_container.appendChild(this._el.container);
        };

    },

    update: function() {
        this._render();
    },

    /*	Events
    ================================================== */
    _onMouseClick: function() {
        return this;
    },

    _onContentEdit: function() {
        this.data.quote = this._el.blockquote_p.innerHTML;
        var quote_detail = this._determineTextSize(this.data.quote);
        this._el.blockquote.className = quote_detail.sizeclass;
    },

    _onDownload: function(e) {
        if (this.options.download_ready) {
            this._el.button_download.click();

        } else {
            this._getImage(e);
        }
    },

    _getImage:function(e) {
        // width 1010
        // height 566
        var _self = this,
            service_url = "https://ccq6cw2sih.execute-api.us-east-1.amazonaws.com/prod/PhantomJS?width=1010&height=566&url=",
            render_page_url = "https://nuknightlab.github.io/pullquote/dist/render.html",
            url_vars = "?",
            api_url = "";

            url_vars += "anchor=" + this.options.anchor;
            url_vars += "&quote=" + this._el.blockquote_p.innerHTML;
            url_vars += "&cite=" + this._el.citation.innerHTML;
            url_vars += "&image=" + this.data.image;
            url_vars += "&credit=" + this.data.credit;
            url_vars += "&use_image=" + this.options.use_image;

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

    _makeDownload: function(e) {
        // CANVAS DOWNLOAD
        // Holding onto this until we get PhantomJS sorted out.
        // var _self = this;
        // this._el.composition_container.style.transformOrigin = "left top";
        // this._el.composition_container.style.transform = "scale(2)";

        // html2canvas(this._el.composition_container, {
        // 	useCORS:"true",
        // 	letterRendering:"true",
        // 	logging:true,
        // 	width:1010,
        // 	height:566,
        // 	onrendered: function(canvas) {
        // 		var dataURL = canvas.toDataURL('image/png');
        // 		_self._el.button_download.href=dataURL;
        // 		_self._el.button_download.download = "pullquote.png";
        // 		_self.options.download_rendered = true;
        // 		_self._onDownload();
        // 		_self._el.composition_container.style.transform="scale(1)";
        // 	}
        // });
    },

    /*	Private Methods
    ================================================== */
    _determineTextSize: function(q) {
        var quote_detail = {
            sizeclass: "",
            quote: q
        }

        quote_detail.quote = quote_detail.quote.replace(/%20| /g, ' '); 

        if (!this.options.anchor) {
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

    _render: function() {
        var quote_detail = this._determineTextSize(this.data.quote);
        this._el.blockquote.className = quote_detail.sizeclass;
        this._el.blockquote_p.innerHTML = quote_detail.quote;

        this._el.citation.innerHTML = this.data.cite.replace(/%20| /g, ' ');
        if (this.options.use_image) {
            this._el.image.style.backgroundImage = "url('" + this.data.image + "')";
        }

        this._el.blockquote_p.contentEditable = this.options.editable;
        this._el.citation.contentEditable = this.options.editable;
    },

    _updateClassName: function() {
        this.options.classname = this.options.base_classname;

        if (this.options.anchor) {
            this.options.classname += " kl-anchor-" + this.options.anchor;
        }

        if (this.options.editable) {
            this.options.classname += " kl-editable";
        }

        this._el.container.className = this.options.classname;
    },

    _initLayout: function () {

        // Create Layout
        this._el.composition_container 	= KL.Helper.create("div", "kl-quotecomposition-container", this._el.container);
        this._el.composition_text = KL.Helper.create("div", "kl-quotecomposition-text", this._el.composition_container);
        this._el.blockquote	= KL.Helper.create("blockquote", "", this._el.composition_text);
        this._el.blockquote_p = KL.Helper.create("p", "", this._el.blockquote);
        this._el.citation = KL.Helper.create("cite", "", this._el.blockquote);
        this._el.background	= KL.Helper.create("div", "kl-quotecomposition-background", this._el.composition_container);
        this._el.image = KL.Helper.create("div", "kl-quotecomposition-image", this._el.composition_container);

        // Create Buttons
        this._el.button_group = KL.Helper.create("div", "kl-button-group", this._el.container);
        this._el.button_download = KL.Helper.create("a", "kl-button kl-button-right", this._el.button_group);

        this._el.button_download.innerHTML = "Save";

        // Listener for save button
        KL.DomEvent.addListener(this._el.button_download, 'click', this._onDownload, this);

        this._render();
    },

    _initEvents: function () {
        KL.DomEvent.addListener(this._el.container, 'click', this._onMouseClick, this);
        if (this.options.editable) {
            KL.DomEvent.addListener(this._el.blockquote_p, 'input', this._onContentEdit, this);
        }
    }

});


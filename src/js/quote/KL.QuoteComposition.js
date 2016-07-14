/*	KL.QuoteComposition
================================================== */
// TODO: Animate into existince

// CORE
	// @codekit-prepend "core/KL.js";
	// @codekit-prepend "core/KL.Util.js";
	// @codekit-prepend "core/KL.Class.js";
	// @codekit-prepend "core/KL.Events.js";
	// @codekit-prepend "core/KL.Browser.js";
	// @codekit-prepend "core/KL.Load.js";
	// @codekit-prepend "data/KL.Data.js";

// HTML TO CANVAS
	// @codekit-prepend "../library/html2canvas.js";

KL.QuoteComposition = KL.Class.extend({
	
	includes: [KL.Events, KL.DomMixins],
	
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
			credit: ""
		};
	
		//Options
		this.options = {
			editable: true,
			anchor: false,
			classname: "",
			base_classname: "kl-quotecomposition",
			use_image: true,
			download_rendered: false
		};
	
		this.animator = null;
		
		// Merge Data and Options
		KL.Util.mergeData(this.options, options);
		KL.Util.mergeData(this.data, data);
		
		this._el.container = KL.Dom.create("div", this.options.base_classname);

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
		this.fire("clicked", this.options);
	},

	_onContentEdit: function() {
		trace("CONTENT EDIT");
		this.data.quote = this._el.blockquote_p.innerHTML;
		var quote_detail = this._determineTextSize(this.data.quote);
		this._el.blockquote.className = quote_detail.sizeclass;
	},

	_onDownload: function(e) {
		if (this.options.download_rendered) {
			this._el.button_download.click();
		} else {
			this._makeDownload(e);
		}
		
		trace("download");
	},

	_makeDownload: function(e) {
		// var url_vars = "?";
		// url_vars += "anchor=" + this.options.anchor;
		// url_vars += "&quote=" + this._el.blockquote_p.innerHTML;
		// url_vars += "&cite=" + this._el.citation.innerHTML;
		// url_vars += "&image=" + this.data.image;
		// url_vars += "&credit=" + this.data.credit;
		
		// if (!window.location.origin) {
		// 	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
		// }
		// var win = window.open(window.location.origin + "/composition.html" + url_vars, '_blank');
		// win.focus();


		var _self = this;
		// _self._el.composition_container.style.transform="scale(1.5)";
		// _self._el.composition_container.style.position="static";
		// _self._el.composition_container.style.width="1010px";
		// _self._el.composition_container.style.height="566px";
		// _self._el.background.style.width="1010px";
		// _self._el.background.style.height="566px";
		// _self._el.image.style.width="1010px";
		// _self._el.image.style.height="566px";
		// //_self._el.composition_container.style.display="block";
		// _self._el.container.style.float="none";
		this._el.composition_container.style.transformOrigin = "left top";
		this._el.composition_container.style.transform = "scale(2)";
		// _self._el.composition_container.style.width="1010px";
		// _self._el.composition_container.style.height="566px";

		html2canvas(this._el.composition_container, {
			useCORS:"true",
			letterRendering:"true",
			logging:true,
			width:1010,
			height:566,
			onrendered: function(canvas) {
				
				var dataURL = canvas.toDataURL('image/png');
				
				_self._el.button_download.href=dataURL;
				_self._el.button_download.download = "pullquote.png";
				_self.options.download_rendered = true;
				_self._onDownload();
				_self._el.composition_container.style.transform="scale(1)";
				// _self._el.composition_container.style.width="505px";
				// _self._el.composition_container.style.height="283px";

				
			}
		});
	},



	_onLoaded: function() {
		this.fire("loaded", this.options);
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
		this._el.composition_container 	= KL.Dom.create("div", "kl-quotecomposition-container", this._el.container);
		this._el.composition_text		= KL.Dom.create("div", "kl-quotecomposition-text", this._el.composition_container);
		this._el.blockquote				= KL.Dom.create("blockquote", "", this._el.composition_text);
		this._el.blockquote_p			= KL.Dom.create("p", "", this._el.blockquote);
		this._el.citation 				= KL.Dom.create("cite", "", this._el.blockquote);
		this._el.background				= KL.Dom.create("div", "kl-quotecomposition-background", this._el.composition_container);
		this._el.image					= KL.Dom.create("div", "kl-quotecomposition-image", this._el.composition_container);

		// Create Buttons
		this._el.button_group 			= KL.Dom.create("div", "kl-button-group", this._el.container);
		this._el.button_download 		= KL.Dom.create("a", "kl-button kl-button-right", this._el.button_group);

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
/**
	Pullquote
	Designed and built by Zach Wise at Knight Lab
*/ 

/*	Required Files
	Webpack
	https://webpack.github.io/
================================================== */
// CORE
	require("core/KL.js");
	require("core/KL.Util.js");
	require("core/KL.Class");
	require("core/KL.Events");
	require("core/KL.Browser");
	require("core/KL.Load");

// ANIMATION
	require("animation/KL.Ease");
	require("animation/KL.Animate");

// DOM
	require("dom/KL.DomMixins");
	require("dom/KL.Dom");
	require("dom/KL.DomUtil");
	require("dom/KL.DomEvent");
	require("dom/KL.StyleSheet");

// QUOTE
	require("quote/KL.QuoteComposition");


KL.Pullquote = (function() {

	// DOM ELEMENTS
	this.el = {
		container: 			KL.Dom.get("pullquote-container"),
		container_content: 	{},

	};

	// OPTIONS
	this.options = {
		width: 				window.innerWidth,
		height: 			window.innerHeight,
	};
	
	// SLIDER
	this.slider = {};

	// Quote Objects
	this.quotes = [];

	// Quote Compositions
	this.quote_compositions = [];

	// Data
	this.data = {
		quote: "Quote",
		cite: "Citation",
		image: "https://static01.nyt.com/images/2016/07/05/us/06OBAMACLINTON-hp/06OBAMACLINTON-hp-facebookJumbo.jpg",
		headline: "Headline",
		credit: ""
	};

	//this._el.menubar			= VCO.Dom.create('div', 'vco-menubar', this._el.container);
	
	// API URL
	//this.api_url = "quotes.json";

	// LOAD EXAMPLE QUOTES
	this.load_quotes = function() {
		this.vars = KL.Util.getUrlVars(window.location.href);
		KL.Util.mergeData(this.data, vars);

		// LAYOUT
		this.el.container.innerHTML = "";
		this.el.container_content = KL.Dom.create('div', 'editor-content', this.el.container);

		// Create Quotes
		this.createComposition(this.data, false, true);
		this.createComposition(this.data, "left", true);
		this.createComposition(this.data, "right", true);
		this.createComposition(this.data, false, false);

		// KL.getJSON(api_url ,function(d) {
		// 	this.createQuoteObjects(d);
		// 	this.createCompositions(d);
		// });
	};

	// CREATE COMPOSITIONS
	// this.createCompositions = function(d) {

	// 	this.quote_compositions = [];
		
	// 	// LAYOUT
	// 	this.el.container.innerHTML = "";
	// 	this.el.container_content = KL.Dom.create('div', 'editor-content', this.el.container);

	// 	for (i=0; i < this.quotes.length; i++) {
	// 		this.createComposition(this.quotes[i], false);
	// 		this.createComposition(this.quotes[i], "left");
	// 		this.createComposition(this.quotes[i], "right");
	// 	}

	// };

	this.createComposition = function(d, anchor, use_image) {
		var composition = new KL.QuoteComposition(d, {anchor:anchor, use_image:use_image});
		composition.addTo(this.el.container_content);
		this.quote_compositions.push(composition);
	};

	// this.createQuoteObjects = function(d) {
	// 	this.quotes = [];

	// 	for (i=0; i < d.quotes.length; i++) {
	// 		var quote = {
	// 			quote: "",
	// 			cite: "",
	// 			credit: "",
	// 			headline:"",
	// 			image: ""
	// 		};

	// 		quote = d.quotes[i];

	// 		this.quotes.push(quote);

	// 	}
	// };

	/*	EVENTS
	================================================== */
	window.onresize = function(event) {

		this.options.width = window.innerWidth;
		this.options.height = window.innerHeight;
	}

	/*	LISTENERS
	================================================== */
	//KL.DomEvent.addListener(this.el.btn_quote_create, 'click', this._onQuoteCreate, this);

	/*	INIT
	================================================== */
	this.load_quotes();
	

})();
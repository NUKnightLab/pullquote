/**
  Pullquote
*/ 


// Knight Lab Namespace
KL = {};

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

    // DOM ELEMENTS
    this.el = {
        composition: document.getElementById("kl-quote-comp"),
        quote_text:	document.getElementById("kl-quote-text"),
        cite: document.getElementById("kl-quote-cite"),
        image: document.getElementById("kl-quote-image")
    };

    // DATA
    this.data = {
        quote: "Quote",
        cite: "Citation",
        image: "assets/placeholder.jpg",
        headline: "Headline",
        anchor: false,
        use_image: true,
        credit: ""
    };

    // OPTIONS
    this.options = {
        width: window.innerWidth,
        height: window.innerHeight
    };


    this.el.composition.style.marginRight = "auto";
    this.vars = KL.Util.getUrlVars(window.location.href);
    KL.Util.mergeData(this.data, vars);

    this.el.quote_text.innerHTML = decodeURIComponent(this.data.quote);
    this.el.cite.innerHTML = decodeURIComponent(this.data.cite);
    console.log(this.data.use_image);
    if (this.data.use_image == "false" || !this.data.use_image){
        this.el.image.style.backgroundImage = "none";
    } else {
        this.el.image.style.backgroundImage = "url(" + this.data.image + ")";
    }

    this.el.composition.className = "kl-quotecomposition kl-anchor-" + this.data.anchor;

    this.el.composition.style.transformOrigin = "left top";
    this.el.composition.style.transform = "scale(2)";
})();


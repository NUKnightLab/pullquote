/*	KL.Dom
    Utilities for working with the DOM
================================================== */

module.exports = {

    get: function(id) {
        return (typeof id === 'string' ? document.getElementById(id) : id);
    },

    getByClass: function(id) {
        if (id) {
            return document.getElementsByClassName(id);
        }
    },

    create: function(tagName, className, container) {
        var el = document.createElement(tagName);
        el.className = className;
        if (container) {
            container.appendChild(el);
        }
        return el;
    },

    createText: function(content, container) {
        var el = document.createTextNode(content);
        if (container) {
            container.appendChild(el);
        }
        return el;
    },

    getTranslateString: function (point) {
        return KL.Dom.TRANSLATE_OPEN + point.x + 'px,' + point.y + 'px' + KL.Dom.TRANSLATE_CLOSE;
    },

    setPosition: function (el, point) {
        el._vco_pos = point;
        if (KL.Browser.webkit3d) {
            el.style[KL.Dom.TRANSFORM] =  KL.Dom.getTranslateString(point);

            if (KL.Browser.android) {
                el.style['-webkit-perspective'] = '1000';
                el.style['-webkit-backface-visibility'] = 'hidden';
            }
        } else {
            el.style.left = point.x + 'px';
            el.style.top = point.y + 'px';
        }
    },

    getPosition: function(el){
        var pos = {
            x: 0,
            y: 0
        }
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            pos.x += el.offsetLeft// - el.scrollLeft;
            pos.y += el.offsetTop// - el.scrollTop;
            el = el.offsetParent;
        }
        return pos;
    }

};



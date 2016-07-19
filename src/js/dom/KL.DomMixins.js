/*	KL.DomMixins
    DOM methods used regularly
    Assumes there is a _el.container and animator
================================================== */
module.exports = {

    /*	Adding, Hiding, Showing etc
    ================================================== */
    show: function(animate) {
        if (animate) {
            /*
            this.animator = KL.Animate(this._el.container, {
            left: 		-(this._el.container.offsetWidth * n) + "px",
            duration: 	this.options.duration,
            easing: 	this.options.ease
            });
            */
        } else {
            this._el.container.style.display = "block";
        }
    },

    hide: function(animate) {
        this._el.container.style.display = "none";
    },

    addTo: function(container) {
        container.appendChild(this._el.container);
        this.onAdd();
    },

    removeFrom: function(container) {
        container.removeChild(this._el.container);
        this.onRemove();
    },

    /*	Animate to Position
    ================================================== */
    animatePosition: function(pos, el) {
        var ani = {
            duration: 	this.options.duration,
            easing: 	this.options.ease
        };
        for (var name in pos) {
            if (pos.hasOwnProperty(name)) {
                ani[name] = pos[name] + "px";
            }
        }

        if (this.animator) {
            this.animator.stop();
        }
        this.animator = KL.Animate(el, ani);
    },

    /*	Events
    ================================================== */

    onLoaded: function() {
        this.fireEvent("loaded", this.data);
    },

    onAdd: function() {
        this.fireEvent("added", this.data);
    },

    onRemove: function() {
        this.fireEvent("removed", this.data);
    },

    /*	Set the Position
    ================================================== */
    setPosition: function(pos, el) {
        for (var name in pos) {
            if (pos.hasOwnProperty(name)) {
                if (el) {
                    el.style[name] = pos[name] + "px";
                } else {
                    this._el.container.style[name] = pos[name] + "px";
                };
            }
        }
    },

    getPosition: function() {
        return KL.Dom.getPosition(this._el.container);
    }

};

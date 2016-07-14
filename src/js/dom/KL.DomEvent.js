/*	KL.DomEvent
	Inspired by Leaflet 
	DomEvent contains functions for working with DOM events.
================================================== */
// TODO stamp

KL.DomEvent = {
	/* inpired by John Resig, Dean Edwards and YUI addEvent implementations */
	addListener: function (/*HTMLElement*/ obj, /*String*/ type, /*Function*/ fn, /*Object*/ context) {
		var id = KL.Util.stamp(fn),
			key = '_vco_' + type + id;

		if (obj[key]) {
			return;
		}

		var handler = function (e) {
			return fn.call(context || obj, e || KL.DomEvent._getEvent());
		};

		if (KL.Browser.touch && (type === 'dblclick') && this.addDoubleTapListener) {
			this.addDoubleTapListener(obj, handler, id);
		} else if ('addEventListener' in obj) {
			if (type === 'mousewheel') {
				obj.addEventListener('DOMMouseScroll', handler, false);
				obj.addEventListener(type, handler, false);
			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
				var originalHandler = handler,
					newType = (type === 'mouseenter' ? 'mouseover' : 'mouseout');
				handler = function (e) {
					if (!KL.DomEvent._checkMouse(obj, e)) {
						return;
					}
					return originalHandler(e);
				};
				obj.addEventListener(newType, handler, false);
			} else {
				obj.addEventListener(type, handler, false);
			}
		} else if ('attachEvent' in obj) {
			obj.attachEvent("on" + type, handler);
		}

		obj[key] = handler;
	},

	removeListener: function (/*HTMLElement*/ obj, /*String*/ type, /*Function*/ fn) {
		var id = KL.Util.stamp(fn),
			key = '_vco_' + type + id,
			handler = obj[key];

		if (!handler) {
			return;
		}

		if (KL.Browser.touch && (type === 'dblclick') && this.removeDoubleTapListener) {
			this.removeDoubleTapListener(obj, id);
		} else if ('removeEventListener' in obj) {
			if (type === 'mousewheel') {
				obj.removeEventListener('DOMMouseScroll', handler, false);
				obj.removeEventListener(type, handler, false);
			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
				obj.removeEventListener((type === 'mouseenter' ? 'mouseover' : 'mouseout'), handler, false);
			} else {
				obj.removeEventListener(type, handler, false);
			}
		} else if ('detachEvent' in obj) {
			obj.detachEvent("on" + type, handler);
		}
		obj[key] = null;
	},

	_checkMouse: function (el, e) {
		var related = e.relatedTarget;

		if (!related) {
			return true;
		}

		try {
			while (related && (related !== el)) {
				related = related.parentNode;
			}
		} catch (err) {
			return false;
		}

		return (related !== el);
	},

	/*jshint noarg:false */ // evil magic for IE
	_getEvent: function () {
		var e = window.event;
		if (!e) {
			var caller = arguments.callee.caller;
			while (caller) {
				e = caller['arguments'][0];
				if (e && window.Event === e.constructor) {
					break;
				}
				caller = caller.caller;
			}
		}
		return e;
	},
	/*jshint noarg:false */

	stopPropagation: function (/*Event*/ e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},
	
	// TODO KL.Draggable.START
	disableClickPropagation: function (/*HTMLElement*/ el) {
		KL.DomEvent.addListener(el, KL.Draggable.START, KL.DomEvent.stopPropagation);
		KL.DomEvent.addListener(el, 'click', KL.DomEvent.stopPropagation);
		KL.DomEvent.addListener(el, 'dblclick', KL.DomEvent.stopPropagation);
	},

	preventDefault: function (/*Event*/ e) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	},

	stop: function (e) {
		KL.DomEvent.preventDefault(e);
		KL.DomEvent.stopPropagation(e);
	},


	getWheelDelta: function (e) {
		var delta = 0;
		if (e.wheelDelta) {
			delta = e.wheelDelta / 120;
		}
		if (e.detail) {
			delta = -e.detail / 3;
		}
		return delta;
	}
};



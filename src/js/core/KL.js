/*!
	KL
*/

(function (root) {
	root.KL = {
		VERSION: '0.1',
		_originalL: root.KL
	};
}(this));

/*	KL
	Debug mode
================================================== */
KL.debug = true;



/*	KL.Bind
================================================== */
KL.Bind = function (/*Function*/ fn, /*Object*/ obj) /*-> Object*/ {
	return function () {
		return fn.apply(obj, arguments);
	};
};



/* Trace (console.log)
================================================== */
trace = function( msg ) {
	if (KL.debug) {
		if (window.console) {
			console.log(msg);
		} else if ( typeof( jsTrace ) != 'undefined' ) {
			jsTrace.send( msg );
		} else {
			//alert(msg);
		}
	}
}
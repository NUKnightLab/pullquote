/*	KL.Class
    Class powers the OOP facilities of the library.
================================================== */
KL.Class = function () {};

module.exports = KL.Class;
_ = require("lodash");

KL.Class.extend = function (/*Object*/ props) /*-> Class*/ {

    // extended class with the new prototype
    var NewClass = function () {
        if (this.initialize) {
            this.initialize.apply(this, arguments);
        }
    };

    // instantiate class without calling constructor
    var F = function () {};
    F.prototype = this.prototype;
    var proto = new F();

    proto.constructor = NewClass;
    NewClass.prototype = proto;

    // add superclass access
    NewClass.superclass = this.prototype;

    // add class name
    //proto.className = props;

    //inherit parent's statics
    for (var i in this) {
        if (this.hasOwnProperty(i) && i !== 'prototype' && i !== 'superclass') {
            NewClass[i] = this[i];
        }
    }

    // mix static properties into the class
    if (props.statics) {
        _.assign(NewClass, props.statics);
        delete props.statics;
    }

    // mix includes into the prototype
    if (props.includes) {
        _.assign.apply(null, [proto].concat(props.includes));
        delete props.includes;
    }

    // merge options
    if (props.options && proto.options) {
        props.options = _.assign({}, proto.options, props.options);
    }

    // mix given properties into the prototype
    _.assign(proto, props);

    // allow inheriting further
    NewClass.extend = KL.Class.extend;

    // method for adding properties to prototype
    NewClass.include = function (props) {
        _.assign(this.prototype, props);
    };

    return NewClass;
};

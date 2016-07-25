module.exports = {
 
    //extrapolating function for create div and add className
    create: function(tagName, className, container) {
        var el = document.createElement(tagName);
        el.className = className;
        if (container) {
            container.appendChild(el);
        }
        return el;
    },

    stamp: function() {
        var lastId = 0, key = '_vco_id';

        return function (/*Object*/ obj) {
            obj[key] = obj[key] || ++lastId;

            return obj[key];
        };
    }
}

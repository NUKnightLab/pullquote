module.exports = {
 
    //extrapolating function for create div and add className
    create: function(tagName, className, container) {
        var el = document.createElement(tagName);
        el.className = className;
        if (container) {
            container.appendChild(el);
        }
        return el;
    }

}

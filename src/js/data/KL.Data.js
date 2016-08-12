/*	KL.Data
    Deal with JSON data
================================================== */
module.exports = {
    getJSON: function(path, success, error) {
        var request = new XMLHttpRequest();

        path = decodeURIComponent(path);
        request.open('GET', path, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                success(JSON.parse(request.responseText));
            } else {
                error(request);
            }
        };

        request.onerror = function(e) {
            // There was a connection error of some sort
            console.error(request.statusText);
        };

        request.send();
    },

    post: function(path, success, error) {
        var request = new XMLHttpRequest();

        request.open('POST', '/my/url', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(data);
    },

    get: function(path, success, error) {

    }
}


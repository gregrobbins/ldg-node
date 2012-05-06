function start(response) {
    console.log("Request handler 'start' was called.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('Welcome');
    response.end();
}

function schedule(response, request) {
    console.log("Request handler 'schedule' was called.");
    var db = require('./db.js');
    var url = require('url');
    db.connect(function() {
        selectCallback = function(err, results, fields) {
            if (err) {
                throw err;
            }
            data = new Object();
            data.items = results;
            var queryObject = url.parse(request.url,true).query;
            var requestedCallback = queryObject.callback;
            // console.log(queryObject);
            response.writeHead(200, {"Content-Type": "text/javascript"});
            response.write(requestedCallback + '(' + JSON.stringify(data) + ')');
            response.end();
            client.end();
        }
        client.query(
            "SET lc_time_names = es_ES"
        );
        client.query(
            "SELECT DATE_FORMAT(p.showDate, '%e de %M') AS showDate, TIME_FORMAT(p.showTime, '%H.%m') AS showTime, a.title, a.desc_es FROM performances p LEFT OUTER JOIN artists a ON p.idArtist_FK = a.idArtist WHERE showDate >= CURRENT_DATE() AND a.isLuzDeGas = 'Y' ORDER BY p.showDate",
            selectCallback
        );
    });
}

exports.start = start;
exports.schedule = schedule;

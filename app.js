$('document').ready(function() {

    var webAuth = new auth0.WebAuth({
        domain: "guitarlanguage.auth0.com",
        clientID: "y8AA4z9Gre45oDzkbPIjJTM4RnE36HJG",
        redirectUri: "https://cocky-sinoussi-e4da0e.netlify.com/",
        audience: 'https://' + "guitarlanguage.auth0.com" + '/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    });

    var loginBtn = $('#authLogin');
    var triviaBtn = $('#trivia');

    loginBtn.click(function(e) {
        e.preventDefault();
        webAuth.authorize();
    });
    // was going to try and use jquery to redirect to triviaGame
    // however I think the file would have to be included in the Guitarlanguage folder
    // -----------------------------------------------------------------
    // triviaBtn.on("click", function(e){
    //     e.preventDefault();
    //     var url = window.location.href;
    //     var page = $(this).data('https://guitarlanguage.github.io/triviaGame/');
    //     window.location = url + page;
    // });
    // cors work around for use in browsers like chrome
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    // caching jquery objects
    var $bit = $("#bit-div");
    var $bitAsk = $("#bit-ask");
    var $bitBid = $("#bit-bid");

    //this function connects to the bitcoin weighted average api and
    //prints it to the $bit div
    function sevenDayWeightedAvg() {
        var queryURL = "http://api.bitcoincharts.com/v1/weighted_prices.json";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response;

            var obj = JSON.parse(results);
            console.log(obj.USD);

            // Printing the entire object to console
            var us = obj.USD["7d"];

            // Constructing HTML containing the bitcoin information
            $bit.html("Bitcoin USD 7 day weighted average price: $" + "<span>" + us + "</span>" + "<br>");

        });
    }
    console.log(sevenDayWeightedAvg);

    //calls bitcoincharts api for current ask and bid price from bitstamp exchange
    function currentPrice() {
        var queryURL = "http://api.bitcoincharts.com/v1/markets.json";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response;

            var obj = JSON.parse(results);
            console.log(obj);

            // Printing the entire object to console
            var ask = obj["57"]["ask"];
            var bid = obj["57"]["bid"];
            var exchange = obj["57"]["symbol"];

            // Constructing HTML containing the artist information
            $bitAsk.html(exchange + " Asking Price: $" + ask + "<br>");
            $bitBid.html(exchange + " Current Bid: $" + bid);

        });
    }

    sevenDayWeightedAvg();
    currentPrice();
    setInterval(sevenDayWeightedAvg, 60000);
    // var interval = 60000;
    // //use the setInterval method to the api every minute
    setInterval(currentPrice, 60000);

});

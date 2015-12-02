var Ajax = function(){

    var that = this;

    var PROXY = 'proxy.php';
    var FEED = 'http://rss.cnn.com/services/podcasting/studentnews/rss.xml';

    var url = PROXY + '?url=' + encodeURIComponent(FEED);

    this.request = function(callback){

        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    // Success!
                    var tmp = new DOMParser();

                    that.data = JSON.parse(this.responseText);
                    that.data = tmp.parseFromString( that.data.contents , "text/xml" );
                    callback.apply(this, that.data);
                } else {
                    // Error :(
                }
            }
        };
        request.send();
        request = null;
    };

    this.returnData = function(){
        if(that.data !== undefined){
            return that.data;
        }
    };
}
/**
 * Created by edwardhunton on 30/11/2015.
 */
document.addEventListener("DOMContentLoaded", function() {

  var App = function () {

        return {

            init: function(){

                var serviceManager = new ServiceManager();

                serviceManager.setService(new View(serviceManager), 'view');
                serviceManager.setService(new Model(serviceManager), 'model');
                serviceManager.setService(new Controller(serviceManager), 'controller');
            }
        };
    };





    var app = new App();

    app.init();



});


var Controller = function(serviceManager){

    this.buildUI = function(){

        serviceManager.getService('view').buildUI(serviceManager.getService('model').returnPlaylist());

    }


};
var Helpers = function(){

    this.xmlToJson = function(xml) { // david walsh - https://davidwalsh.name/convert-xml-json

        var obj = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for(var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if(nodeName === '#text'){
                    nodeName = 'text';
                }
                if (typeof(obj[nodeName]) == "undefined") {
                    obj[nodeName] = this.xmlToJson(item);
                } else {
                    if (typeof(obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }

        return obj;

    };
};
var Model = function(serviceManager){

    var data,  RSSObj;

    function pullDataIntoModel(){

        data = ajax.returnData();
        convertXML(data.childNodes[1]); // 0 is stylesheet, 1 is rss

    }

    function onLoad(){

        pullDataIntoModel();

    }

    function convertXML(xml){

        RSSObj = new Helpers().xmlToJson(xml);

        serviceManager.getService('controller').buildUI();


    }

    this.returnPlaylist = function(){

        return RSSObj;

    };

    var ajax = new Ajax();
    ajax.request(onLoad);


};
var ServiceManager = function(){

    var services = [];

    this.setService = function(service, name){

        services[name] = service;

    };

    this.getService = function(name){

        if (services.hasOwnProperty(name)) {
            return services[name];
        }
        console.log(name);
        throw "Service not found";

    };


};
var View = function(serviceManager){



    var currentIndex = 0, activeNumber = 0;

    function navigation(dir){

        if(dir === 'up'){
            if(currentIndex-1 >= 0 && (currentIndex-1 < playlist.channel.item.length-4) ){
                currentIndex--;
                redraw();
            } else if(currentIndex-1 >= 0){
                removeHighlight();
                currentIndex--;
                activeNumber--;

                highlight();
            }
        } else {
            if(currentIndex+1 >= 0 && (currentIndex+1 < playlist.channel.item.length-3)){
                currentIndex++;
                redraw();
            } else if(currentIndex+1 >= 0 && (currentIndex+1 < playlist.channel.item.length)){
                activeNumber++;
                currentIndex++;
                removeHighlight();
                highlight();

            }
        }
    }

    function playVideo(){

        drawVideoUI();

    }

    function togglePlayback(){
        var v = document.getElementById('vid');

        if(v.paused){
            v.play();
        } else {
            v.pause();

        }
    }

    function setUpNavigation(){

        var upArrow = document.getElementById('upArrow');
        var downArrow = document.getElementById('downArrow');

        upArrow.addEventListener('click', function(){
            navigation('up');
        });

        downArrow.addEventListener('click', function(){
            navigation('down');
        });

        window.onkeydown = function(e){
            if(e.keyCode === 38){
                navigation('up');
            } else if(e.keyCode === 40){
                navigation('down');
            } else if(e.keyCode === 13){
                playVideo();
            } else if(e.keyCode === 32){
                togglePlayback();
            }
        };
    }

    function redraw(){

        document.getElementById("mainNav").innerHTML = null;
        document.getElementById('mainNav').appendChild(drawListItems(playlist));
        highlight();




    }

    function highlight(){
        var list = document.getElementsByTagName("ul")[0];
        var lItem = list.getElementsByTagName("li")[activeNumber]
        lItem.className = lItem.className +" li_active";
    }

    function removeHighlight(){
        var list = document.getElementsByTagName("ul")[0];
        for(var i = 0; i < list.childNodes.length; i++){
            var lItem = list.getElementsByTagName("li")[i];
            lItem.className = 'vidlist';
        }

    }

    function drawVideoUI(){

        document.getElementById('videoTitle').innerHTML = playlist.channel.item[currentIndex].title.text;
        document.getElementById('videoDescription').innerHTML = playlist.channel.item[currentIndex].description.text;
        document.getElementById('vid').src = playlist.channel.item[currentIndex].enclosure.attributes.url;

    }



    function drawListItems(playlist) {

        var playListItems = document.createElement('ul'), li;

        for (var i = currentIndex; i < playlist.channel.item.length; i++) {

            li = document.createElement('li');
            if(i === 0){
                li.className = 'li_active';
            } else {
                li.className = 'vidlist';
            }

            li.innerHTML = playlist.channel.item[i].title.text;

            playListItems.appendChild(li);

        }

        return playListItems;

    }

    this.buildUI = function(_playlist){

        playlist = _playlist

        document.getElementById('mainNav').appendChild(drawListItems(playlist));
        document.getElementById('podcastTitle').innerHTML = playlist.channel.title.text;
        document.getElementById('podcastDescription').innerHTML = playlist.channel.description.text;

        drawVideoUI();
        setUpNavigation();

    }
};
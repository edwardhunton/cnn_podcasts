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
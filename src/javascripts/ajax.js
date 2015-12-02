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
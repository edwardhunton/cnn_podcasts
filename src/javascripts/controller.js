

var Controller = function(serviceManager){

    this.buildUI = function(){

        serviceManager.getService('view').buildUI(serviceManager.getService('model').returnPlaylist());

    }


};
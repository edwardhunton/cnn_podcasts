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
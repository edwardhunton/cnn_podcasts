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
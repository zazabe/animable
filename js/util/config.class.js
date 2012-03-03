define([], function() {
    Animable.Configuration = function(config){
        this.config = config;
    };
    
    Animable.Configuration.prototype = {
    
        
        find: function(name, recursive){
            return new Animable.Configuration(this.findObject(name, recursive));
        },
        
        getRaw: function(){
            return this.config;
        },
        
        findObject: function(name, recursive, config){
            var found = null, 
                recursive = recursive || false, 
                config = config || this.config;
            
            for(var key in config){
                if (key == name){
                    found = config[key];
                    break;
                }
                else if(recursive && typeof config[key] == 'object'){
                    if(found = this.findObject(name, recursive, config[key])){
                        break;
                    }
                }
            }
            return found;
        }
    };
});

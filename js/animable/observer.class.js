define([], function() {
        
    Animable.Observer = {
        triggers: {},
        
        register: function(name, dispatcher){
            if(!this.triggers.hasOwnProperty(name)){
                this.triggers[name] = [];
            }
            this.triggers[name].push(dispatcher);
        },
        
        dispatch: function(name){
            console.log('Animable.Observer', name);
            if(this.triggers.hasOwnProperty(name)){
                var dispatcher = null, args = Array.prototype.slice.call(arguments).slice(1);
                for(var i=0 ; i< this.triggers[name].length ; i++){
                    dispatcher = this.triggers[name][i];
                    dispatcher.obj[dispatcher.method].apply(dispatcher.obj, args);
                }
            }
        }, 
        
        dispatchMethod: function(method, type){
            this.dispatch('anim' + Animable.Util.firstLetterUppercase(method) + Animable.Util.firstLetterUppercase(type));
        },
        
        reset: function(){
            for(var name in this.triggers){
                this.unregister(name);
            }
        },
        
        unregister: function(name){
            if(this.triggers.hasOwnProperty(name)){
                delete this.triggers[name];
            }
        }
    };
});
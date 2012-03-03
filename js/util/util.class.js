define(["animable/core"], function(Animable) {
    
    Animable.Util = {
        isArray: function(obj){
            return /Array/.test(toString.call(obj)); 
        }   
    };

    return Animable;
});

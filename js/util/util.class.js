define([], function() {
    
    Animable.Util = {
        isArray: function(obj){
            return /Array/.test(toString.call(obj)); 
        },
        
        firstLetterUppercase: function(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        }   
    };

    return Animable;
});

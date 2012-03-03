define(["jquery", "util/collection.base", "vendor/jquery.transform2d"], function($, Animable) {
    
    
    
    Animable.Animation = function(animation){
    };
    
    Animable.Animation.prototype = {
    };
    
    
    
    Animable.Animations = function(animations){
        this.init(animations);
    };
    
    Animable.Animations.prototype = $.extend({}, Animable.Base.Collection,
    {
        run: function(){
            console.log('run !!!', this.items);
        }
    });

    console.log('anim', Animable);
    return Animable;
});


define(["jquery", "util/collection.base", "vendor/jquery.transform2d"], function($) {
    Animable.Animation = function(animation){
    };
    
    Animable.Animation.prototype = {
    };
    
    Animable.Animations = function(element, animations){
        this.setElement(element);
        this.init(animations);
    };
    
    
    Animable.Animations.prototype = $.extend({}, Animable.Base.Collection,
    {
        
        run: function(){
            this.forEach(function(anim){
                this.element.animate.apply(this.element, anim);
            }, this);
        }, 
        
        setElement: function(element){
            if(!element instanceof jQuery){
                throw {message: 'element is not an instance of jQuery object'};
            }
            this.element = element;
        }
        
        
    });

    console.log('anim', Animable);
});


define(["jquery", "util/collection.base", "animable/observer.class", "vendor/jquery.transform2d"], function($) {
    
    Animable.Animations = function(element, animations){
        this.setElement(element);
        this.init(animations);
    };
    
    Animable.Animations.prototype = $.extend({}, Animable.Base.Collection,
    {
        run: function(method, callback){
            var nbAnim = this.count(), 
                animEnd = function(){
                    if(callback && --nbAnim >= 0){
                        callback.call();
                    }
                }; 
             
            this.forEach(function(anim){
                this.addInternalCallback(anim, animEnd, method);
                this.applyAnimation(anim);
            }, this);
        },
        
        addInternalCallback: function(anim, animEnd, method){
            var callback_id = anim.length;
            for(var i=0 ; i < anim.length ; i++){
                if(typeof anim[i] == 'function'){
                   callback_id = i; 
                }
            }
            anim[callback_id] = animEnd;
        },
        
        stop: function(){
            this.element.stop();
            
        }, 

        applyAnimation: function(anim){
            if(anim[0]['transformOrigin']){
                this.element.css({transformOrigin: anim[0]['transformOrigin']});
            }
            this.element.animate.apply(this.element, anim);
        },
        
        setElement: function(element){
            if(!element instanceof jQuery){
                throw new Error('element is not an instance of jQuery object');
            }
            this.element = element;
        }
    });
    
});


define(["jquery", "animable/obj.class", "animable/anim.class", "animable/config"], function($) {

    console.log(Animable);
    
    Animable.Scene = function(container, scene, params){
        this.configure();
        this.setScene(container, scene);
        this.setParameters();
        this.setContainer(container);
    };
    
    Animable.Scene.prototype = {
        configure: function(){
            if(Animable.config){
                this.config = Animable.config.find('scene');
            }
            else {
                throw {message: 'Animable has no configuration'};
            }    
        },
        
        setScene: function(name, parameters){
            if(this.config[name]){
                this.scene = this.config.find(name);
                this.objects = {};
            }
            else {
                throw {message: 'scene '+ name +' doesn\'t exist'};
            }
        },
        
        setContainer: function(container){
            this.container = container;
        },
        
        setParameters: function(params){
            for(var name in params){
                if(this.validObject(name, params[name])){
                    this.objects[name] =  params[name];
                }
            }
        },
        
        setAnimations: function(){
            var anim = null;
            if(anim = this.scene.find('anim')){
            }
        },
        
        validObject: function(type, obj){
            var def = this.scene.find(type, true);
            if(def){
                for(var i=0 ; i < def.allowed.length ; i++){
                    if(obj.type == def.allowed[i]){
                        return true;
                    }    
                }
            }
            return false;
        }
    };
    
    
    //extend jQuery
    $.fn.scene = function(scene, params){
      var instance = null;
      $.each(function(){
          var obj = $(this);
          if(obj.hasData('animableScene')){
            instance = obj.getData('animableScene');
          }
          else {
            instance = new Animable.Scene(obj, scene, params);
            obj.setData('animableScene', instance);    
          }
      });  
      return instance;
    };
});
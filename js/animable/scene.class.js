define(["jquery", "animable/observer.class", "animable/obj.class", "animable/anim.class", "animable/config"], function($) {
        
    Animable.Scene = function(container, scene, params){
        this.init(container, scene, params);
    };
    
    Animable.Scene.prototype = {
        
        init: function(container, scene, params){
            this.animations = {};
            this.objects = {};
            this.config = {};
            this.scene = {};
            this.container = null;
            this.params = null;
            
            this.configure();
            this.setContainer(container);
            this.setScene(scene);
            this.setObjects(params);
            this.setupAnimations();  
        },
        
        configure: function(){
            if(Animable.config){
                this.config = Animable.config.find('scene');
            }
            else {
                throw new Error('Animable has no configuration');
            }    
        },
        
        setScene: function(name){
            this.scene = this.config.find(name, true);
            
            if(null == this.scene.getRaw()) {
                throw new Error('scene '+ name +' doesn\'t exist');
            }
        },
        
        setContainer: function(container){
            this.container = container;
        },
        
        setObjects: function(params){
            this.params = params ?  params : this.params; 
            
            var def = null;
            for(var name in this.params){
                if(def = this.validObject(name, this.params[name])){
                    this.objects[name] =  this.initObj(this.params[name], def);
                    
                }
            }
        },
        
        getObject: function(name){
            if(!this.objects.hasOwnProperty(name)){
                throw new Error('object ' + name + ' doesn\'t exist');
            }
            return this.objects[name];
        },
        
        
        initObj: function(obj, def){
            this.container.append(obj.struct);
            
            obj.struct.css(Animable.Convert.Position(def.position, {
                container: { width: this.container.width(), height: this.container.height() },
                obj:       { width: obj.getWidth(), height: obj.getHeight() }
            }));
            
            if(def.trigger){
                this.register(obj, def.trigger);    
            }
            
            return obj;
        },
        
        removeObjects: function(){
            for(var name in this.objects){
                this.objects[name].reset();
            }    
        },
            
        register: function(obj, triggers){
            for(var name in triggers){
                Animable.Observer.register(name, {obj: obj, method: triggers[name]});
            }
        },
        
        setupAnimations: function(){
            var anims = this.scene.find('anim').getRaw(),
                elements = this.elements,
                calls = {},
                iteration = 1;
                
            if(anims.iteration){
                iteration = anims.iteration;
            }
             
            for(var method in anims){
                calls[method] = [];
                var def = anims[method];
                for(var name in def){
                    this.animations[method] = new Animable.Animations(this.getObject(name).struct, this.convertAnimParameters(def[name])); 
                    calls[method].push(this.animations[method]);
                }
                this[method] = function(animObjects, method, iteration){
                    return function() {
                        var iter = iteration;
                        
                        Animable.Observer.dispatchMethod(method, 'start');
                        
                        var iterate = function(){
                            Animable.Observer.dispatchMethod(method, 'iterate');
                            nbAnim = animObjects.length;
                            for(var i=0 ; i < animObjects.length ; i++){ 
                                animObjects[i].run(method, function(){
            
                                    if(--nbAnim <= 0 && --iter > 0){
                                        iterate();
                                    }
                                    if(iter <= 0){
                                        iter = iteration;
                                        Animable.Observer.dispatchMethod(method, 'end');
                                    }
                                });
                            }
                        };
                        iterate();
                         
                    };
                }(calls[method], method, iteration);
            }
        },
        
        removeAnimations: function(){
            var anims = this.config.find('anim').getRaw();
                
            for(var method in anims){
                delete this[method];
            }
            
            for(var method in this.animations){
                this.animations[method].stop();
                delete(this.animations[method]);
            }
        },
        
        convertAnimParameters: function(anims){
            for(var i=0 ; i < anims.length ; i++){
                
                var anim = anims[i], transform = anim[0]['transform'], val = null, x = null, y = null, reg = /translate\(([-0-9]+)%,([-0-9]+)%\)/;
                
                if(transform && reg.test(transform)){
                    
                    val = transform.match(reg);
                    x = (this.container.width() / 100) * val[1];
                    y = (this.container.height() / 100) * val[2];
                    anims[i][0]['transform'] = transform.replace(/([-0-9]+%,[-0-9]+%)/, x + 'px,' + y + 'px');
                }
            }
            return anims;
        },
        
        validObject: function(type, obj){
            var def = this.scene.find(type, true).getRaw();
            if(def){
                for(var i=0 ; i < def.allowed.length ; i++){
                    if(obj.type == def.allowed[i]){
                        return def;
                    }    
                }
            }
            return false;
        },
        
        reset: function(){
            Animable.Observer.reset();
            
            this.removeObjects();
            this.removeAnimations();
            
            this.setObjects();
            this.setupAnimations(); 
            
        }
    };
    
    
    //extend jQuery
    $.fn.scene = function(scene, params){
      var instance = null;
      this.each(function(){
          var obj = $(this);
          if(obj.data('animableScene')){
            instance = obj.data('animableScene');
          }
          else {
            instance = new Animable.Scene(obj, scene, params);
            obj.data('animableScene', instance);    
          }
      });  
      return instance;
    };
});
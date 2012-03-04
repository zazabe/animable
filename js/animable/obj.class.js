define(["jquery", "animable/config", "animable/observer.class", "animable/anim.class", "util/convert.class"], function($) {

    Animable.Obj = function(type, style){
        this.type = type;
        this.style = style;
        this.struct = null;
        this.elements = {};
        this.animations = {};
        
        
        this.configure(); 
        
        this.createElements();
        this.setupAnimations();
        
        this.setStyle(style);
    };
    
    Animable.Obj.prototype = {
        configure: function(){
            if(Animable.config){
                this.config = Animable.config.find(this.type, true);
            }
            else {
                throw new Error('Animable has no configuration');
            }
        },
        
        setStyle: function(style){
            this.style = style ?  style : this.style; 
            
            for(var name in this.elements){
                this.elements[name].css({
                    'backgroundImage': 'url(' + this.config.find(this.style, true).getRaw().src + ')'   
                });
            }
        },
        
        appendTo: function(element){
            element.append(this.struct);
        },
        
        position: function(position){
            this.struct.css(Animable.Convert.Position(position));
        },
        
        createStructure: function(){
            return $('<div>').addClass(this.type).css({'position': 'absolute', transform: 'translate(0px,0px)'});
        },
        
        createElements: function(){
            var definitions = this.config.find('struct').getRaw();
            this.struct = this.createStructure();
            
            for(var element in definitions)
            {
                this.elements[element] = this.createElement(element, definitions[element]);
                this.struct.append(this.elements[element]);
            }
        },
        
        createElement: function(name, def){
            var element = $('<div>').attr('id', name);
            element.css(this.getCssFromDefinition(def));
            
            return element;
        },
        
        getElement: function(name){
            if(!this.elements.hasOwnProperty(name)){
                throw new Error('element ' + name + ' doesn\'t exist');
            }
            return this.elements[name];
        },
        
        setupAnimations: function(){
            var anims = this.config.find('anim').getRaw(),
                elements = this.elements,
                calls = {};
                
            for(var method in anims){
                calls[method] = [];
                var def = anims[method];
                for(var name in def){
                    this.animations[method] = new Animable.Animations(this.getElement(name), def[name]);
                    calls[method].push(this.animations[method]);
                }
                this[method] = function(animObjects, method){
                    return function() {
                        for(var i=0 ; i < animObjects.length ; i++){ 
                            animObjects[i].run(method);
                        }
                    };
                }(calls[method], method);
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
        
        getHeight: function(){
            var h = 0, height = 0;
            for(var name in this.elements){
                var el = this.elements[name];
                h = el.position().top + el.height();
                height = (h > height) ? h : height;
            }
            return height;
        },
        
        getWidth: function(){
            var w = 0, width = 0;
            for(var name in this.elements){
                var el = this.elements[name];
                w = el.position().left + el.width();
                width = (w > width) ? w : width;
            }
            return width;
        },
        
        getCssFromDefinition: function(def){
            var area = {}, position = {};
            if(def.area){
                area = Animable.Convert.Area(def.area);
            }
            if(def.position){
                position = Animable.Convert.Position(def.position);
            }
            return $.extend({'position': 'absolute', transform: 'translate(0px,0px)'}, position, area);
        },
        
        reset: function(){
            this.destroy();
            this.createElements();
            this.setStyle();
            this.setupAnimations();
        },
        
        destroy: function(){
            this.struct.remove();
            this.removeAnimations();
            for(var name in this.elements){
                this.elements[name].remove();
                delete this.elements[name];
            }
        }
    };
});
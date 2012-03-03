define(["jquery", "animable/config", "animable/observer.class", "animable/anim.class", "util/convert.class"], function($) {

    Animable.Obj = function(type, style){
        this.type = type;
       
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
            for(var name in this.elements){
                this.elements[name].css({
                    'backgroundImage': 'url(' + this.config.find(style, true).getRaw().src + ')'   
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
            this.elements = {};
            
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
                    calls[method].push(new Animable.Animations(this.getElement(name), def[name]));
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
        }
    };
});
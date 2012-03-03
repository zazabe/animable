define(["jquery", "animable/config", "animable/anim.class", "util/convert.class"], function($, Animable) {

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
                throw {message: 'Animable has no configuration'};
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
            var position = Animable.Convert.Position(position);
            this.struct.css({
                'top': position['y'] + 'px',
                'left': position['x'] + 'px'
            });
        },
        
        createStructure: function(){
            return $('<div>').addClass(this.type).css({'position': 'relative'});
        },
        
        createElements: function(){
            this.struct = this.createStructure();
            
            this.elements = {};
            var definitions = this.config.find('struct').getRaw();
            
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
            return this.elements[name] ? this.elements[name] : null;
        },
        
        setupAnimations: function(){
            var anims = this.config.find('anim');
            var elements = this.elements;
            
            this.animations = {};
            
            for(var method in anims){
                var def = anims[method];
                var calls = [];
                for(var element in def){
                    this.animations[element] = new Animable.Animations(def[element]);
                    calls.push(this.animations[element]);
                }
                this[method] = function(){
                    for(var i=0 ; i < calls.length ; i++){
                        calls[i].run();
                    }
                };
                 
            }
        },
        
        getCssFromDefinition: function(def){
            var area = {}, position = {};
            if(def.area){
                area = Animable.Convert.Area(def.area);
                area = {
                    'width': area['w'] + 'px',
                    'height': area['h'] + 'px',
                    'backgroundPosition': area['x'] + 'px ' + area['y'] + 'px',
                    'zIndex': area['z']
                };
            }
            if(def.position){
                position = Animable.Convert.Position(def.position);
                position = {
                    'top': position['y'] + 'px',
                    'left': position['x'] + 'px',
                }
            }
            return $.extend({'position': 'absolute'}, position, area);
        }
    };

    return Animable;
});
var Animable = Animable || {}, camper, tower;

define(["jquery", "animable/obj.class", "animable/scene.class", "animable/anim.class"], function($) {
    $(document).ready(function(){
        camper = new Animable.Obj('vehicule', 'camper');
        tower = new Animable.Obj('building', 'tower');
        
        $('#container').scene('goTo', {subject: camper, target: tower });
        
        $('#play').click(function(){
            $('#container').scene().play();
        });
        
        $('#reset').click(function(){
            $('#container').scene().destroy();
            
            camper = new Animable.Obj('vehicule', 'camper');
            tower = new Animable.Obj('building', 'tower');
        
            $('#container').scene('goTo', {subject: camper, target: tower });
        
        });
        
        
    });
 
});

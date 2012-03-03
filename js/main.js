var Animable = Animable || {}, camper;
define(["jquery", "animable/obj.class", "animable/scene.class", "animable/anim.class"], function($) {
    $(document).ready(function(){
        camper = new Animable.Obj('vehicule', 'camper');
        var tower = new Animable.Obj('building', 'tower');
        
        camper.appendTo($('#container'));
        camper.position('x10y20');
    
        //$('container').scene('goTo', {subject: camper, target: tower }):
        //$('container').scene().play();
    });
 
});

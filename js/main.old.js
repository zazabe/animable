var camper = null, tower = null;
$(document).ready(function(){
    camper = new Animable.Obj('vehicule', 'camper');
    tower  = new Animable.Obj('building', 'tower');
    
    camper.appendTo($('#container'));
    camper.position('x10y20');
    
    //$('container').scene('goTo', {subject: camper, target: tower }):
    //$('container').scene().play();
});

define(["jquery", "util/config.class"], function($) {
    Animable = $.extend({
        config: new Animable.Configuration({
            obj: {
                vehicule: {
                    style: {
                        camper: { src: 'data/vehicules/vw_camper.svg' },   
                        sport: { src: 'data/vehicules/sport.svg' }   
                    },
                    struct: {
                        body:       { area: 'w592h232x0y-818z3' },
                        backWheel:  { area: 'w93h93x-596y-958z2', position: 'x75y165' },
                        frontWheel: { area: 'w93h93x-596y-958z2', position: 'x406y165' },
                        back:       { area: 'w592h72x0y-746z1', position: 'x28y154' }        
                    },
                    anim: {
                        move: {
                            backWheel: [[{ transform: '+=rotate(360deg)' }, 500, 'linear']],
                            frontWheel: [[{ transform: '+=rotate(360deg)' }, 500, 'linear']],
                            body:  [
                                [{ transform: 'translate(2px,0px)' }, 250 , 'linear'],
                                [{ transform: 'translate(0px,2px)' }, 250 , 'linear']
                            ]    
                        },
                        stop: {
                            body:  [[{ transform: ''}, 250]]    
                        }
                    }
                },
                building: {
                    style: {
                        tower: { src: 'data/building/tower.svg' }   
                    },
                    struct: {
                        body:  { area: 'w340h416x-18y-26z1' },
                        door:  { area: 'w48h93x-366y-26z2', position: 'x78y276' }
                    },
                    anim: {
                        open: { 
                            door:  [[{ transformOrigin: '100% 50%', transform: 'scaleX(0.6) skewY(-8deg)'}, 750]] 
                        },
                        close: {
                            door:  [[{ transformOrigin: '100% 50%', transform: 'scaleX(1) skewY(0deg)'}, 500]]    
                        }
                    }
                }
            },
            scene: {
                goTo: {
                    obj: {
                        subject:  { 
                            position: 'x0%y90%', 
                            allowed:  ['vehicule', 'human'], 
                            trigger:  { animPlayIterate: 'move', animPlayEnd: 'stop' } 
                        },
                        target: { 
                            position: 'x78%y90%', 
                            allowed:  ['building'], 
                            trigger:  { animPlayEnd: 'open' } 
                        }   
                    },
                    anim: {
                        play:     {
                           subject: [[{ transform: '+=translate(5%,0%)'}, 500, 'linear']]
                        },
                        iteration: 8
                    }
                }    
            }
        })
    }, Animable);
});
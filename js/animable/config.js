define(["jquery", "animable/core", "util/config.class"], function($, Animable) {
    

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
                        backWheel:  { area: 'w93h93x-596y-958z2', position: 'x165y75' },
                        frontWheel: { area: 'w93h93x-596y-958z2', position: 'x165y406' },
                        back:       { area: 'w592h72x0y-746z1', position: 'x154y28' }        
                    },
                    anim: {
                        move: {
                            wheel: [{ transform: '+=rotate(360deg)' }, 500, 'linear'],
                            body:  [
                                [{ transform: 'translate(2px,0px)' }, 250 , 'linear'],
                                [{ transform: 'translate(0px,2px)' }, 250 , 'linear']
                            ]    
                        },
                        stop: {
                            body:  [{ transform: ''}, 250]    
                        }
                    }
                },
                building: {
                    style: {
                        tower: { src: 'data/tower.svg' }   
                    },
                    struct: {
                        door:  { area: '' },
                        body:  { area: '' }
                    },
                    anim: {
                        open: {
                            door:  [{ transform: ''}, 250] 
                        },
                        close: {
                            door:  [{ transform: ''}, 250]    
                        }
                    }
                }
            },
            scene: {
                goTo: {
                    obj: {
                        subject:  { 
                            position: 'x0y90%', 
                            allowed:  ['vehicule', 'human'], 
                            trigger:  { animPlayIterate: 'move', animPlayEnd: 'stop' } 
                        },
                        target: { 
                            position: 'x90%y90%', 
                            allowed:  ['building'], 
                            trigger:  { animPlayEnd: 'open' } 
                        }   
                    },
                    anim: {
                        play:     [{ transform: '+=translate(10%,0px)'}, 250, 'linear'],
                        iteration: 8
                    }
                }    
            }
        })
    }, Animable);
        
    return Animable;
});
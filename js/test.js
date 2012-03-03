$(document).ready(function(){
        $('.wheel').css({transform: 'rotate(0deg)'});
        $('.vehicule').css({transform: 'translate(0px,400px)'});
        $('.body').css({transform: 'translate(0px,0px)'});
        
        
        var iter = 0;
        var animWheel = function(obj){
            console.log('> wheel anim');
                
            obj.animate({transform: '+=rotate(360deg)'}, 500, 'linear', function(){
                if(iter < 8){
                    animWheel($(this));
                }
            });
        };
        
        var animBody = function(obj){
            console.log('> body anim');
            obj.animate({transform: 'translate('+((iter+1)%2==1? 2 : 0 )+'px,'+((iter+1)%2==0? 2 : 0 )+'px)'}, 250, function(){
                if(iter <= 10){
                    animBody($(this));
                }
            });
        };
        
        
        var animVehicule = function(obj){
            console.log('> vehicule anim');
            obj.animate({transform: '+=translate(100px,0px)'}, 250, 'linear', function(){
                if(iter++ < 10){
                    animVehicule($(this));
                }
            });
        };
        
        $('.vehicule').click(function(){
            animVehicule($('.vehicule'));
            animBody($('.body'));
            
            animWheel($('.wheel'));
        }); 
    
        $('#switch').click(function(){
            var vehicule = $('.vehicule');
            vehicule.attr('class', 'vehicule ' + (vehicule.hasClass('vw_camper') ? 'sport' : 'vw_camper'));
            return false;
        });
    
});


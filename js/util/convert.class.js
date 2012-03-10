define([], function() {

    Animable.Convert = {
        Expressions: {
            area:        /^w([-0-9]+)h([-0-9]+)x([-0-9]+)y([-0-9]+)z([-0-9]+)$/,
            position:    /^x([-0-9]+)y([-0-9]+)$/,
            refPosition: /^x([-0-9]+)%y([-0-9]+)%$/
        },
        
        Position: function(string, ref){
            var position = null;
            if(ref){
                position = string.match(Animable.Convert.Expressions.refPosition);
                position[1] = Math.round(((ref.container.width/100) * position[1])); 
                position[2] = Math.round(((ref.container.height/100) * position[2])-ref.obj.height); 
            }
            else {
                position = string.match(Animable.Convert.Expressions.position);
            }
            
            return {
                left: position[1] + 'px',
                top: position[2] + 'px'
            };
        },
        
        Area: function(string){
            var area = string.match(Animable.Convert.Expressions.area);
            return {
                width: area[1] + 'px',
                height: area[2] + 'px',
                backgroundPosition: area[3] + 'px ' + area[4] + 'px',
                zIndex: area[5]
            };
        }   
    };
});

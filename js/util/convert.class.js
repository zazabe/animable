define([], function() {

    Animable.Convert = {
        Expressions: {
            area:     /^w([-0-9]+)h([-0-9]+)x([-0-9]+)y([-0-9]+)z([-0-9]+)$/,
            position: /^x([-0-9]+)y([-0-9]+)$/
        },
        
        Position: function(string){
            var position = string.match(Animable.Convert.Expressions.position);
            return {
                x: position[2],
                y: position[1]
            };
        },
        
        Area: function(string){
            var area = string.match(Animable.Convert.Expressions.area);
            return {
                w: area[1],
                h: area[2],
                x: area[3],
                y: area[4],
                z: area[5]
            };
        }   
    };
});

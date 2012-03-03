define(["util/util.class"], function() {
 
    Animable.Base = Animable.Base || {};
    
    Animable.Base.Collection = {
        init: function(items){
            if(!this.validItems(items)){
                throw new Error('Collection: items is not an Array');
            }
            this.index = 0;  
            this.items = items;
        },
        
        validItems: function(items){
            return Animable.Util.isArray(items);
        },
    
        go: function(index){
            this.index = index < this.count() 
                       ? ( index >= 0 ? index : 0)
                       : this.count();
            return this;
        },
        
        get: function(index){
            return this.items[index];
        },
        
        has: function(index){
            return index >= 0 && index < this.count();
        },
        
        getIndex: function(){
            return this.index;  
        },
        
        current: function(){
            return this.items[this.index];
        },

        getNext: function(){
            var index = this.index + 1 < this.count() ? this.index + 1 : null;
            return index != null ? this.get(index) : null;
        },
        
        getPrevious: function(){
            var index = this.index > 0 ? this.index - 1  : null;
            return index != null ? this.get(index) : null;
        },
        
        getFirst: function(){
            return this.get(0);
        },
        
        getLast: function(){
            return this.get(this.lastIndex());
        },
        
        next: function(){
            this.index = this.index + 1 < this.count() ? this.index + 1 : this.index;
            return this.current();
        },
        
        previous: function(){
            this.index = this.index > 0 ? this.index - 1 : 0;
            return this.current();
        },
        
        last: function(){
            this.index = this.lastIndex();
            return this.current();
        },
        
        first: function(){
            this.index = 0;
            return this.current();
        },
        
        isFirst: function(){
            return this.index == 0;
        },
        
        isLast: function(){
            return this.index == this.lastIndex();
        }, 
        
        add: function(item, index){
            index = arguments.length > 1 ? index : this.count();
            this.items.splice(index, 0, item);
            return this;
        },
        
        update: function(item, index){
            index = arguments.length > 1 ? index : this.count();
            this.items.splice(index, 1, item);
            return this;
        },
         
        remove: function(index){
            this.items.splice(index, 1);
            return this;
        },
        
        count: function(){
            return this.items.length;
        },
        
        lastIndex: function(){
            return this.count() - 1;
        },
        
        each: function(order, callback){
            var by = order, func = callback, slice = 2;
            if(typeof order == 'function'){
                func  = order;
                slice = 1;
                by    = 'asc';
            }
            var args = Array.prototype.slice.call(arguments).slice(slice);
            
            this.forEach(order, function(item, index){
                func.apply(item, [index].concat(args));
            }, this);
        },
        
        forEach: function(order, callback, scope){
            var by = order, func = callback, sc = scope, slice = 2;
            if(typeof order == 'function'){
                func  = order;
                sc    = callback;
                slice = 1;
                by    = 'asc';
            }
            var args = Array.prototype.slice.call(arguments).slice(slice);
            
            if(by == 'desc'){
                for(var index = this.lastIndex() ; index >= 0 ; index--){
                    func.apply(sc, [this.get(index), index].concat(args));
                }   
            }
            else if(by == 'asc'){
                for(var index = 0 ; index < this.count() ; index++){
                    func.apply(sc, [this.get(index), index].concat(args));
                }   
            }
        }
    };
});
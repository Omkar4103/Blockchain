// iife = Immediately invoked Fn expression
//eg 1
var ans = (function(){
    var privateval = 24;

    return {
        getter: function(){
            console.log(privateval);
        },
        setter: function(val){
            privateval = val;
        } 
    }
})()
//ans.getter() o/p: 24
//ans.setter(12) > ans.getter() o/p: 12
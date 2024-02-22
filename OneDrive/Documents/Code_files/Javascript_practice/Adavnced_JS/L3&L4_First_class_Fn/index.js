//L3 First class fn
//eg1
let dam = function preserveWater(){

}
preserveWater();

//eg 2
setTimeout(function(){

})

//L4 new keyword
function example(){
    this.age = 89;
}
new example();

//what actually the new keyword does for each 'this' keyword within the Fn
// {
//     age : 89;
// }
// it creates a blank object for the properties within the Fn
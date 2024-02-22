//this
//eg 1
console.log(this) //global scope
//gives the window object

//eg 2
var obj = {
    name: "gyrox",
    demo: function(){
        console.log(this)//method scope
    }
}
obj.demo(); //o/p {name: "gyrox", demo:f }

//eg 3
var button = document.querySelector("button");
button.addEventListener("click", function(){
    this.style.color = "red"; //this is equal to anything before the 'addEventListener' (button in this case)
})

//call aplly bind
//eg 1
function abc(){
    console.log(this); //by default the function will return the window object
}
var obj = {age: 24};
abc.call(obj); //the Fn will now return the obj value due to the '.call' method

//eg2
function abc(val1, val2, val3){
    console.log(this, val1, val2, val3); 
}
var obj = {age: 24};
abc.apply(obj, [1,2,3]);//.apply takes two arguments
//first is the this object and the second argument in form of an array to assign values 
//to the defind parameters for the Fn

//eg3
function abc(){
    console.log(this); //by default the function will return the window object
}
var obj = {age: 24};
var bindedfnc = abc.bind(obj);
bindedfnc();
//mostly used in React especially for asynchronous programming




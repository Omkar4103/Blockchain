//eg 1
function biscuitMold(){
    this.width = 20;
    this.height = 10;
    this.color = "brown";
}
let bis1 = new biscuitMold(); //returns the properties of the above Fn

function createCircularButton(color){
    this.radius = 0.2;
    this.color = color;
    this.icon = false;
    this.pressable = false;
}
let btn1 = new createCircularButton("red"); //returns the properties of the above Fn with 'color:red' 
let btn2 = new createCircularButton("blue");//returns the properties of the above Fn with 'color:blue'
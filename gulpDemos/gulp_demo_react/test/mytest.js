/**
 * Created by chenxincong on 15-10-22.
 */
var Person = function(){
    var obj = new Object();
    obj.PI = 10;
    obj.area = function(i){
        console.log(this)
        return this.PI*i*i;
    }
    return obj;
}

var c = new Person();
c.area(3)



var Person = function(){
    this.PI = 10;
    this.area = function(i){
        console.log(this)
        return this.PI*i*i;
    }
}

var c = new Person();
c.area(3)

var Person = new Object();
console.log(this)
Person.PI = 10;
Person.area = function(i){
        console.log(this)
        return this.PI*i*i;
    }
Person.area(3)
//var c = new Person();
//c.area(3)


function test(){
    this.x=1;
    alert(x);
}
test()





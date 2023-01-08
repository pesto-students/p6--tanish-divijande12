var Person = function() {};

Person.prototype.initialize = function(name, age)
{
    this.name = name;
    this.age = age;
}

// class teacher and method created teach
var Teacher = function() {
    this.teach = function(subject){
        console.log(this.name + " is now teaching " + subject);
    }
}
Teacher.prototype = new Person();
var him = new Teacher();

him.initialize("Tanish Shah", 25);
him.teach("Javascript");

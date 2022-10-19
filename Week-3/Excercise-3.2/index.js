var car = {
    registrationNumber: "MH12PU2893",
    brand: "TATA",

    displayDetails: function (ownerName) {
        console.log(ownerName + ", this is your car: " + this.registrationNumber + " " + this.brand);
    }
}
// apply() method
var myCarDetails = car.displayDetails.apply(car, ["Divij"]);
// call() method
var myCarDetails = car.displayDetails.call(car, ["Divij"]);
// bind() method
var myCarDetails = car.displayDetails.bind(car, "Divij");
console.log(myCarDetails())
var car = {
    number: "MH12PU2893",
    brand: "TATA",
    
    displayDetails: function() {
        console.log(this.number + " " + this.brand);
    }
}

function displayDetails(ownerName) {
    console.log(ownerName + ", this is your car: " + this.number + " " + this.brand);
}
var myCarDetails = car.displayDetails.bind(car);
myCarDetails();
displayDetails.apply(car, ["DIVIJ"]);
displayDetails.call(car, ["DIVIJ"]);

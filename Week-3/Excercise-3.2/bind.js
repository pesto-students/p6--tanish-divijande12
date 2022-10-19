var car = {
    number: "MH12PU2893",
    brand: "TATA",

    displayDetails: function() {
        console.log(this.number + " " + this.brand);
    }
}

var myCarDetails = car.displayDetails.bind(car);
myCarDetails();
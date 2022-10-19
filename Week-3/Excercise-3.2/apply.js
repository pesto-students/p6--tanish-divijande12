var car = {
    number: "MH12PU2893",
    brand: "TATA"
}

function displayDetails(ownerName) {
    console.log(ownerName + ", this is your car: " + this.number + " " + this.brand);
}
displayDetails.apply(car, ["DIVIJ"]);
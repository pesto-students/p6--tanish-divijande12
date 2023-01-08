function createIncrement() {
    let count = 0;
    function increment() {
        count++;
    }
    let message = `Count is${count}`;
    function log() {
        console.log(message);
    }
    return [increment, log];
}
const [increment, log] = createIncrement();
increment();
increment();
increment();
log();
// What is logged?

// It logs count = 0, 
// because when we increment count we are assigning to the variable a new instance of a number with 
// the value 1 message is still pointing to the old instance (0) 
// so the log is going to print the same old value.


//Correction

// function createIncrement() {
//     let count = 0;

//     function increment() {
//         count++;
//     }

//     function log() {
//         let message = `Count is ${count}`;
//         console.log(message);
//     }
//     return [increment, log];
// }
// const [increment, log] = createIncrement();
// increment();
// increment();
// increment();
// log();

// Async function 1
async function doTask1() {
    let task1Promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Task 1 Completed in 1 sec");
        }, 1000);
    });
    // Waiting for task 1 to compelete
    let response1 = await task1Promise;

    console.log(response1);
}
// Async function 2
async function doTask2() {
    let task2Promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Task 2 Completed in 2 sec");
        }, 2000);
    });
    // Waiting for task 2 to complete
    let response2 = await task2Promise;

    console.log(response2);
}
// Async function 3
async function doTask3() {
    let task3Promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Task 3 Completed in 3 sec");
        }, 3000);
    });
    // Waiting for task 3 to complete
    let response3 = await task3Promise;

    console.log(response3);
}

async function* taskDoneGenerator() {
    console.log("Task 1 Started");
    yield await doTask1(); // suspend here at first call
    console.log("Task 2 Started");
    yield await doTask2(); // suspend here at 2nd call
    console.log("Task 3 Started");
    yield await doTask3(); // suspend here at 3rd call
    return; // Ending generator
}

const performTask = taskDoneGenerator(); // Init generator

performTask.next(); // Starting generator
performTask.next(); // Starting again generator
performTask.next(); // Starting 3rd time generator
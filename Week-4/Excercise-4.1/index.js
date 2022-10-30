const CustomPromiseState = {
    PENDING: 'PENDING',
    RESOLVED: 'RESOLVED',
    REJECTED: 'REJECTED'
};

class CustomPromise {
    constructor(callback) {
        this.CustomPromiseState = CustomPromiseState.PENDING;
        this.resolved = this.resolved.bind(this);
        this.rejected = this.rejected.bind(this);
        this.then = null;
        this.catch = null;
        callback(this.resolved, this.rejected);
    }

    resolved(res){
        if(this.CustomPromiseState === CustomPromiseState.PENDING){
            this.then && this.then(res);
        }
        this.CustomPromiseState = CustomPromiseState.RESOLVED;
    }
    rejected(rej){
        if(this.CustomPromiseState === CustomPromiseState.PENDING){
            this.then && this.then(rej);
        }
        this.CustomPromiseState = CustomPromiseState.REJECTED;
    }
    then(thenFn){
        this.then = thenFn;
        return this;
    }
    catch(catchFn){
        this.catch = catchFn;
        return this;
    }
}

const getNumber = () => {
    new CustomPromise((resolve, reject) => {
        const randInt = parseInt(Math.random() * 100, 10)
        setTimeout(() => {
            if (randInt % 5 === 0) {
                reject(`Rejected with number: ${randInt}`);
                console.log(`Rejected with number: ${randInt}`);
            }
            else {
                resolve(`Resolved with number: ${randInt}`);
                console.log(`Resolved with number: ${randInt}`);
            }
        }, randInt * 10);
    });
}
console.log(getNumber());
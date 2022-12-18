S = [-1, 2, 1, -4]
target = 1

let closestSum = Number.MAX_VALUE;

for (let i = 0; i < S.length; i++) {
    for (let j = i + 1; j < S.length; j++) {
        for (let k = j + 1; k < S.length; k++) {
            if (Math.abs(target - closestSum) >
                Math.abs(target - (S[i] + S[j] + S[k])))
                closestSum = (S[i] + S[j] + S[k]);
        }
    }
}

console.log(closestSum);
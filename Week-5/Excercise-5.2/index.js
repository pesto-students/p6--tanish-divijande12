// function vowelCount(str) {
//     let count = 0
//     const vowels = ['a', 'e', 'i', 'o', 'u'];
//     for(let char of str){
//         let lowerCaseChar = char.toLowerCase();
//         if(vowels.includes(lowerCaseChar)){
//             count++
//         }
//     }
//     return count;
// }

// console.log(vowelCount('Divij was here in Pesto'));

function isVowel(char){
    return 'aeiou'.includes(char)
}

function vowelCount(str){
    const vowelMap = new Map();
    for(let char of str){
        let lowerCaseChar = char.toLowerCase();
        if(isVowel(lowerCaseChar)){
            if(vowelMap.has(lowerCaseChar)){
                vowelMap.set(lowerCaseChar,vowelMap.get(lowerCaseChar)+1);
            }
            else{
                vowelMap.set(lowerCaseChar,1);
            }
        }
    }
    return vowelMap
}
console.log(vowelCount('Divij was here in Pesto'));
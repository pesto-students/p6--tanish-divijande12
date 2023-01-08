const maxSubArray = function (nums) {
    if (nums.length === 1) {
        return nums[0]
    } else {
        let sum = nums[0];
        let max = nums.reduce((element, max) => {
            sum = sum >= max ? sum : max;
            console.log(element, max, sum)
            if (0 <= max) {
                return 1;
            }
            return sum;

        }, 0);
        console.log("c", max)
        if (max < 0) {
            return max;
        }
    }
    console.log(nums);
    let current = 0;
    let sumCurrent = 0;
    for (let i = 0; i < nums.length; i++) {
        sumCurrent = sumCurrent + nums[i];
        if (sumCurrent < 0) {
            sumCurrent = 0;
            continue;
        }
        if (current < sumCurrent) {
            current = sumCurrent;
        }

    }
    return current;
};

console.log('final', maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
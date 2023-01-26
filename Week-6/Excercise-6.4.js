prices = [7, 1, 5, 3, 6, 4]

const findBestDay = (prices) => {
    sorted_prices = [...prices]
    const price_map = new Map()
    prices.map((x, y) => price_map.set(x, y))
    console.log(price_map)
    sorted_prices.sort()

    console.log(prices)
    console.log(sorted_prices)

    bestday = sorted_prices[0]
    bestday_index = price_map.get(bestday)
    console.log(bestday_index)

    if (bestday_index == prices.length) {
        return 0;
    } else {
        for (let i = prices.length; i > bestday_index; i--) {
            if (price_map.get(sorted_prices[i]) > bestday_index && sorted_prices[i] > bestday) {
                return i + 1;
            }
        }
        return 0;
    }
}

console.log(findBestDay(prices))


// Space Optimised

price = [7, 1, 5, 3, 6, 4]

let max = price[0], min = price[0], maxIndex = 0, minIndex = 0;

price.forEach((element, index) => {
    if (element < min) {
        min = element;
        minIndex = index;
    }
    if (maxIndex < minIndex) {
        max = element;
        maxIndex = index
    }

    if (element > max) {
        max = element;
        maxIndex = index;
    }

});
console.log("Space Optimised Solution ------------------------ ")
if (minIndex == maxIndex)
    console.log(0)
else
    console.log(maxIndex + 1)
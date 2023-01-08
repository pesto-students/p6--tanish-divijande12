const spiralOrder = function (input) {
    const result = []
    let total = input.length * input[0].length
    let r = 0,
        c = 0,
        lc = 0,
        ti = 1,
        si = 0,
        ei = input[0].length - 1,
        ri = input.length,
        isRight = true,
        isLeft = false,
        isTop = false,
        isDown = false;
    for (let i = 0; i < total; i++) {
        console.log(total, i, r, ri, c, isRight, isLeft, isTop, isDown)
        if (isRight) {
            result.push(input[r][c]);
            if (c == ei) {
                isRow = false;
                ei = ei - 1;
                isRight = false;
                isDown = true;
                r++;
                continue;
            } else {
                c++;
            }
        } else if (isDown) {
            result.push(input[r][c])
            r++;
            if (r >= ri) {
                isDown = false;
                isLeft = true;
                r = r - 1;
                c--;
                ri = ri - 1;
                continue;
            }
        } else if (isLeft) {
            result.push(input[r][c])
            if (c == si) {
                isLeft = false;
                isTop = true;
                si = si + 1;
                r--;
                continue;
            }
            c--;
        } else if (isTop) {
            result.push(input[r][c])
            if (r == ti) {
                isTop = false;
                ti = ti + 1;
                isRight = true;
                c++;
                continue;
            }
            r--;
        }
    }
    return result;
};

console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
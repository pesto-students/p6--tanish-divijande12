const { add, mul, sub, div } = require('./index');

test('2 + 2 = 4', () => {
    expect(add(2, 2)).toBe(4);
});

test('3 * 5 = 15', () => {
    expect(mul(3, 5)).toBe(15);
});

test('9 - 5 = 4', () => {
    expect(sub(9, 5)).toBe(4);
});

test('12 / 3 = 4', () => {
    expect(div(12, 3)).toBe(4);
});
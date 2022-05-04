/*
 * This code is broken! Can you figure out why
 * and fix it?
 */

function doubleIfEven(n) {
    x = n;
    if (even(x)) return times2(n);
    return n;
}

function even(a) {
    x = a;
    if (x%2 == 0) {
        x = true;
    }
    else {
        x = false;
    }
    return x;
}

function times2(a) {
    return 2*a;
}

// Get command line argument and run function

const input = process.argv.slice(2).map(x => parseInt(x));
if (input === undefined) {
    throw new Error(`input not supplied`);
}

for (let num of input) {
    console.log(doubleIfEven(num));
}

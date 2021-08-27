function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    console.log('expression', expr)

    const operStack = []

    const exitArr = []

    const operPriority = {
        1: ['*', '/'],
        2: ['+', '-'],
    }

    for (let i of expr) {
        // console.log(i)
    }

    return

}

module.exports = {
    expressionCalculator
}


/**
 *
 * algorithm of inverse polish notation
 *
 * operation stack
 *
 * exit array
 *
 * priority of operations : high 1, low: 2 {1: ['*', '/'], 2: ['+', ]}
 *
 *
 */
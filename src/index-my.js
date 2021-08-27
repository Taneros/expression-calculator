function expressionCalculator(expr) {
  // write your solution here
  console.log('expression', expr)

  const operStack = []

  const exitArr = []

  const exprArr = expr.split(' ')
  console.log('exprArr', exprArr)

  const operPriority = {
    1: ['*', '/'],
    2: ['+', '-'],
  }


  for (let i of expr) {
    console.log(i)
  }

  return true

}

console.log(expressionCalculator('2 + 2'))

//   Easy
// expression 2 + 2
//     1) Test simple addition
// expression 2-2
//     2) Test simple subtraction
// expression 2*3
//     3) Test simple multiplication
// expression 1/2
//     4) Test simple division
// expression 1 / 0
//     5) Test division by zero
// expression  49 * 63 / 58 * 36
//     6) Mixed base test 1
// expression  84 + 62 / 33 * 10 + 15
//     7) Mixed base test 2
// expression  48 + 59 * 86 * 92 * 23
//     8) Mixed base test 3
// expression  16 + 25 - 92 + 54 / 66
//     9) Mixed base test 4
// expression  64 + 19 - 77 - 93
//     10) Mixed base test 5
// expression  88 - 72 + 55 * 57
//     11) Mixed base test 6
// expression  99 * 55 / 30 + 50
//     12) Mixed base test 7
// expression  11 - 88 + 84 - 48
//     13) Mixed base test 8
// expression  68 * 60 / 87 / 53 + 17
//     14) Mixed base test 9
// expression  63 - 69 - 46 + 57
//     15) Mixed base test 10
// expression  60 + 29 / 57 - 85
//     16) Mixed base test 11
// expression  34 * 18 * 55 - 50
//     17) Mixed base test 12
// expression  12 * 3 - 18 + 34 - 84
//     18) Mixed base test 13
// expression  70 / 42 - 52 - 64 / 35
//     19) Mixed base test 14
// expression  39 / 41 + 100 + 45
//     20) Mixed base test 15
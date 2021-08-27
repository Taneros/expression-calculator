function expressionCalculator(expr) {
  // write your solution here

  expr = expr.replace(/\s/g, '')
  //console.log('no spaces', expr)

  //console.log('expression', expr)

  const operStack = []

  const exitArr = []

  const exprArr = expr.split(/(\D)/)
  //console.log('exprArr', exprArr)

  const operPriority = {
    1: ['*', '/'],
    2: ['+', '-'],
  }


  for (let i of exprArr) {

    // check if elem is number -> push to exit arr
    if (!isNaN(i)) {
      //console.log(`${i} is Number! -> push to exit arr`)
      exitArr.push(i)
      //console.log('exitArr', exitArr)
    }
    // this is operand -> need to push to oper stack or exit arr
    else {
      // if operaation stack is empty -> push operation arr
      //console.log(`${i} isNaN!`)
      if (operStack.length === 0) {
        //console.log(`operStack empty! <- push ${i}`)
        operStack.push(i)
        //console.log('operStack', operStack)
      }
      // if not empty -> check priority using operPriority dictionary
      else {

        //console.log('operStack not empty!')
        let operStackLast = operStack[operStack.length - 1]
        //console.log('last value in operStack', operStack[operStack.length - 1])
        // check priority of current i element

        let elemPriorityOne = operPriority[1].includes(i) // true || false
        //console.log(` elemPriorityOne ${elemPriorityOne}`)

        // check priority of last element in stack
        let lastStackElPriorityOne = operPriority[1].includes(operStackLast) // true || false
        //console.log(` lastStackElPriorityOne ${lastStackElPriorityOne}`)

        // equal case
        // if both true or both false -> current element is of equal priority to last elem in stack -> pop() last elem from stack and push() to exit array and push() there current elem
        if (elemPriorityOne && lastStackElPriorityOne || !elemPriorityOne && !lastStackElPriorityOne) {
          exitArr.push(operStack.pop(operStackLast))
          //console.log('operStack.pop()', operStack, 'exitArr', exitArr)
          operStack.push(i)
          //console.log('operStack if1', operStack)

        }
        // last value in stack has higher priority && elem to add lower
        // if last elem in stack has higher priority -> then pop() and push() it to exit array -> push() there current elem
        else if (lastStackElPriorityOne && !elemPriorityOne) {
          exitArr.push(operStack.pop(operStackLast))
          //console.log('operStack.pop()', operStack, 'exitArr', exitArr)
          operStack.push(i)
          //console.log('operStack if2', operStack)

        }
        else {
          operStack.push(i)
          //console.log('operStack else', operStack)
        }
      }
    }
  }

  // push everything from stackOper -> exit array
  for (let elem of operStack.reverse()) {
    exitArr.push(elem)
  }

  //console.log('exit array', exitArr)
  // do math operations

  let calcArr = []
  let result

  for (let elem of exitArr) {

    let lastTwo

    if (calcArr.length >= 2) {
      lastTwo = calcArr.slice(-2)
      //console.log('lastTwo', lastTwo)
    }
    //console.log('elem', elem)

    let elemInt = parseInt(elem)

    //console.log('elem of exitArr', elemInt)
    //console.log('calcArr', calcArr)

    if (!isNaN(elemInt)) {
      //console.log('number!')
      calcArr.push(elemInt)
      //console.log('calcArr', calcArr)
    }
    if (isNaN(elemInt)) {
      //console.log('math operation!')
      switch (elem) {
        case '*':
          result = lastTwo.reduce((acc, el) => acc * el, 1)
          //console.log('result *', result)
          for (let i = 0; i < 2; i++) {
            calcArr.pop()
            //console.log('pop()', calcArr)
          }
          calcArr.push(result)
          //console.log('calcArr.push(result)', calcArr)
          break
        case '+':
          result = lastTwo.reduce((acc, el) => acc + el, 0)
          for (let i = 0; i < 2; i++) {
            calcArr.pop()
            //console.log('pop()', calcArr)
          }
          calcArr.push(result)
          //console.log('calcArr.push(result)', calcArr)
          break
        case '/':
          if (lastTwo[1] === 0) {
            throw "TypeError: Division by zero."
          }
          result = lastTwo[0] / lastTwo[1]
          for (let i = 0; i < 2; i++) {
            calcArr.pop()
            //console.log('pop()', calcArr)
          }
          calcArr.push(result)
          //console.log('calcArr.push(result)', calcArr)
          break
        case '-':
          if (lastTwo[1] === 0) {
            throw "TypeError: Division by zero."
          }
          result = lastTwo[0] - lastTwo[1]
          for (let i = 0; i < 2; i++) {
            calcArr.pop()
            //console.log('pop()', calcArr)
          }
          calcArr.push(result)
          //console.log('calcArr.push(result)', calcArr)
          break
      }

    }
  }

  return calcArr
}

// //console.log(expressionCalculator('4 / 2'))
// //console.log(expressionCalculator('88 - 72 + 55 * 57'))
console.log(expressionCalculator('4 - 2 + 5 * 6'))

// //console.log(expressionCalculator('2 * 5'))

// //console.log(expressionCalculator('49 * 63 / 58 * 36'))
// //console.log(expressionCalculator('5 * 2 + 10'))



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
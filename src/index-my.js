function expressionCalculator(expr) {

  // replace spaces if have
  expr = expr.replace(/\s/g, '')
  console.log('no spaces', expr)
  console.log('expression', expr)

  // find brackets and return array with them
  const rBrackets = /\(|\)/gm
  const findBrackets = expr.match(rBrackets)
  console.log('findBrackets', findBrackets)


  // if there are brackets
  if (findBrackets) {
    console.log('watch out the brackets!')
    const stack = []

    const bracketsPair = { ')': '(' }

    // check for odd num brackets
    if (findBrackets.length % 2 !== 0) throw ("ExpressionError: Brackets must be paired")

    // check for missing pair if even number
    else {

      stack.push(findBrackets[0])

      for (let i = 1; i < findBrackets.length; i++) {
        //  console.log('str index', i)
        let currentChar = findBrackets[i]
        //  console.log('currentChar', currentChar)
        let topStackEl = stack[stack.length - 1]
        //  console.log('top stack el', topStackEl)
        if (stack.length !== 0) {
          if (bracketsPair[currentChar] === topStackEl) {
            //  console.log('stack pop ->', currentChar)
            stack.pop()
          }
          else {
            //  console.log('stack push <-')
            stack.push(currentChar)
          }
        }
        else {
          //  console.log('stack push <-')
          stack.push(currentChar)
        }
        //  console.log('stack', stack)
      }

      if (stack.length !== 0) throw ("ExpressionError: Brackets must be paired")

    }
  }

  const operStack = []

  const exitArr = []

  // split on any non digit char and include it in the final array
  console.log('expr', expr)
  const exprArr = expr.split(/(\D)/gm).filter(el => !!el)
  console.log('exprArr', exprArr)

  const operPriority = {
    1: ['*', '/'],
    2: ['+', '-'],
  }


  for (let i of exprArr) {

    // check if elem is number -> push to exit arr
    if (!isNaN(i)) {
      console.log(`${i} is Number! -> push to exit arr`)
      exitArr.push(i)
      console.log('exitArr', exitArr)
    }
    // this is operand -> need to push to oper stack or exit arr
    else {
      // if operation stack is empty -> push operation arr
      console.log(`${i} isNaN!`)

      if (operStack.length === 0) {
        console.log(`operStack empty! <- push ${i}`)
        operStack.push(i)
        console.log('operStack was empty -> now', operStack)
      }
      else if (operStack.length === 0 || i === '(') {
        console.log(`operStack empty! <- push ${i}`)
        operStack.push(i)
        console.log('operStack was empty -> now', operStack)
      }
      // if not empty -> check priority using operPriority dictionary
      else {
        // check for closing bracket
        if (i === ')') {
          let count = 1 // for two bracket to remove
          console.log('\nit is', i, 'now!')
          let tempReverseOperStack = operStack.slice().reverse()
          console.log('reversed cloned operStack', tempReverseOperStack)
          for (let el of tempReverseOperStack) {
            console.log('before popping inside brackets', tempReverseOperStack)
            if (el !== '(') {
              exitArr.push(el)
              console.log('exitArr', exitArr)
              count++
              console.log('count', count)
            }
            // stop loop if reached opening bracket (
            else {
              console.log('\n stop bracket removing loop')
              break
            }
          }

          for (let i = 0; i < count; i++) {
            operStack.pop()
          }
          console.log('after if ) operStack', operStack)
          console.log('after if ) exitArr', exitArr)

          // -> pop count times from oper operstack
        }
        else {
          console.log('operStack not empty!')
          let operStackLast = operStack[operStack.length - 1]
          console.log('last value in operStack', operStack[operStack.length - 1])

          // check priority of current i element
          let elemPriorityOne = operPriority[1].includes(i)
          console.log(`${i} elemPriorityOne ${elemPriorityOne}`)

          // check priority of last element in stack
          let lastStackElPriorityOne = operPriority[1].includes(operStackLast)
          console.log(`lastStackElPriorityOne ${lastStackElPriorityOne}`)

          // equal case
          // if both true or both false -> current element is of equal priority to last elem in stack -> pop() last elem from stack and push() to exit array and push() there current elem
          if (elemPriorityOne && lastStackElPriorityOne || !elemPriorityOne && !lastStackElPriorityOne) {

            // check if operStackLast is not (
            if (operStackLast !== '(') {
              exitArr.push(operStack.pop(operStackLast))
              console.log('operStack.pop()', operStack, 'exitArr', exitArr)
              operStack.push(i)
              console.log('operStack if1', operStack)
            }
            else {
              operStack.push(i)
              console.log('operStack if1', operStack)
            }

          }
          // last value in stack has higher priority && elem to add lower
          // if last elem in stack has higher priority -> then pop() and push() it to exit array -> push() there current elem
          else if (lastStackElPriorityOne && !elemPriorityOne) {
            exitArr.push(operStack.pop(operStackLast))
            console.log('operStack.pop()', operStack, 'exitArr', exitArr)
            operStack.push(i)
            console.log('operStack if2', operStack)

          }
          else {
            operStack.push(i)
            console.log('operStack else', operStack)
          }
        }
      }
    }
  }

  // push everything from stackOper -> exit array
  for (let elem of operStack.reverse()) {
    exitArr.push(elem)
  }

  console.log('exit array', exitArr)
  // do math operations

  let calcArr = []
  let result

  for (let elem of exitArr) {

    let lastTwo

    if (calcArr.length >= 2) {
      lastTwo = calcArr.slice(-2)
      console.log('lastTwo', lastTwo)
    }
    console.log('elem', elem)

    let elemInt = parseInt(elem)

    console.log('elem of exitArr', elemInt)
    console.log('calcArr', calcArr)

    // el is number case 
    if (!isNaN(elemInt)) {
      console.log('number!')
      calcArr.push(elemInt)
      console.log('calcArr', calcArr)
    }
    // el is operand
    else {
      console.log('math operation with', elem)
      switch (elem) {
        case '*':
          result = lastTwo.reduce((acc, el) => acc * el, 1)
          console.log('result *', result)
          for (let i = 0; i < 2; i++) {
            calcArr.pop()
            console.log('pop()', calcArr)
          }
          calcArr.push(result)
          console.log('calcArr.push(result)', calcArr)
          break
        case '+':
          result = lastTwo.reduce((acc, el) => acc + el, 0)
          for (let i = 0; i < 2; i++) {
            calcArr.pop()
            console.log('pop()', calcArr)
          }
          calcArr.push(result)
          console.log('calcArr.push(result)', calcArr)
          break
        case '/':
          if (lastTwo[1] === 0) {
            throw "TypeError: Division by zero."
          }
          result = lastTwo[0] / lastTwo[1]
          for (let i = 0; i < 2; i++) {
            calcArr.pop()
            console.log('pop()', calcArr)
          }
          calcArr.push(result)
          console.log('calcArr.push(result)', calcArr)
          break
        case '-':
          result = lastTwo[0] - lastTwo[1]
          for (let i = 0; i < 2; i++) {
            calcArr.pop()
            console.log('pop()', calcArr)
          }
          calcArr.push(result)
          console.log('calcArr.push(result)', calcArr)
          break
      }
    }
  }

  return calcArr[0]
}


// console.log(expressionCalculator('4 / 2')) //2
// console.log(expressionCalculator('88 - 72 + 55 * 57')) // 3151
// console.log(expressionCalculator('4 - 2 + 5 * 6')) // 32
// console.log(expressionCalculator('(1+2)*3')) 
// console.log(expressionCalculator('(((1+2)*3))'))
// console.log(expressionCalculator('(6+10-4)/(1+1*2)+1')) //5
// console.log(expressionCalculator('(6-10-4)/(1+1*2)+1')) // -1.6666
// console.log(expressionCalculator('6-10-4/(1+1*2)+1')) // 
console.log(expressionCalculator('20-57*12-(58+84*32/27)')) // -821.5556



// //console.log(expressionCalculator('2 * 5'))

// //console.log(expressionCalculator('49 * 63 / 58 * 36'))
// //console.log(expressionCalculator('5 * 2 + 10'))



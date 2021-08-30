function eval() {
	// Do not use eval!!!
	return;
}

//** Empty **/
// function expressionCalculator(expr) {
//     // write your solution here
//     console.log('expression', expr)

//     const operStack = []

//     const exitArr = []

//     const operPriority = {
//         1: ['*', '/'],
//         2: ['+', '-'],
//     }

//     for (let i of expr) {
//         // console.log(i)
//     }

//     return
// }
//** Empty **/

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
					} else {
						//  console.log('stack push <-')
						stack.push(currentChar)
					}
				} else {
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

	let counter = 0;
	for (let i of exprArr) {
		counter++
		// check if elem is number -> push to exit arr
		if (!isNaN(i)) {
			console.log(`${i} is Number! -> push to exit arr`)
			exitArr.push(i)
			console.log(counter + 'exitArr', exitArr)
		}
		// this is operand -> need to push to oper stack or exit arr
		else {
			// if operation stack is empty -> push operation arr
			console.log(`${i} isNaN!`)

			if (operStack.length === 0 || i === '(') {
				// console.log(`operStack <- push ${i}`)
				operStack.push(i)
				console.log(counter + 'operStack now', operStack)
			}
			// if not empty -> check priority using operPriority dictionary
			else {
				// check for closing bracket
				if (i === ')') {
					while (operStack[operStack.length - 1] != '(' && operStack.length) {
						exitArr.push(operStack.pop())
					}
					operStack.pop()
				} else {
					// console.log('operStack not empty!')
					let operStackLast = operStack[operStack.length - 1]
					// console.log('last value in operStack', operStack[operStack.length - 1])

					// check priority of current i element
					let elemPriorityOne = operPriority[1].includes(i) ? 1 : 2;
					// console.log(`${i} elemPriorityOne ${elemPriorityOne}`)

					// check priority of last element in stack
					let lastStackElPriorityOne = operPriority[1].includes(operStackLast) ? 1 : 2;
					// console.log(`lastStackElPriorityOne ${lastStackElPriorityOne}`)

					while (elemPriorityOne >= lastStackElPriorityOne && operStack.length && operStack[operStack.length - 1] != '(') {
						exitArr.push(operStack.pop(operStack[operStack.length - 1]))
						lastStackElPriorityOne = operPriority[1].includes(operStack[operStack.length - 1]) ? 1 : 2;
					}
					operStack.push(i)
					console.log(counter + 'exitArr now', exitArr)
					console.log(counter + 'operStack now', operStack)
				}
			}
		}
	}

	// push everything from stackOper -> exit array
	for (let elem of operStack.reverse()) {
		exitArr.push(elem)
	}

	console.log('exit array', exitArr.join(','))
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
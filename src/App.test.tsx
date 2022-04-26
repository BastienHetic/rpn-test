type CalculusOperator = '+' | '-' | '*' | '/';
type Operator = Array<CalculusOperator|number>

export function rpn(...args: Operator): number {
  let stack: number[] = [];
  
  args.map((operator) => {
    if (typeof operator === 'number') {
      stack.push(operator);
    } else if (typeof operator === 'string') {
      const number1 = stack.pop();
      const number2 = stack.pop();
    
      if (typeof number1 !== "undefined" && typeof number2 !== "undefined") {
        switch(operator) {
          case '+':
            stack.push(number1 + number2)
            break;
          case '-':
            stack.push(number1 - number2)
            break;
          case '*':
            stack.push(number1 * number2)
            break;
          case '/':
            if (number2 === 0) {
              throw 'Cannot divide by 0';
            }
            stack.push(number1 / number2)
            break;
        }
      }
    }
  });

  const result = stack.pop();
  if (typeof result !== "undefined") {
    return result;
  } else {
    throw 'Result is undefined!';
  }
}

test('0 => 0', () => {
  expect(rpn(0)).toEqual(0)
})

test('1 => 1', () => {
  expect(rpn(1)).toEqual(1)
})

test('1, 1, + => 2', () => {
  expect(rpn(1, 1, '+')).toEqual(2)
})

test('1, 2, + => 3', () => {
  expect(rpn(1, 2, '+')).toEqual(3)
})

test('1, 1, - => 0', () => {
  expect(rpn(1, 1, '-')).toEqual(0)
})

test('2, 1, - => -1', () => {
  expect(rpn(2, 1, '-')).toEqual(-1)
})

test('2, 1, -, 3, * => -3', () => {
  expect(rpn(2, 1, '-', 3, '*')).toEqual(-3)
})

test('3, 5, +, 2, / => -1', () => {
  expect(rpn(3, 5, '+', 32, '/')).toEqual(4)
})

test('1, 1, -, 2, / => Cannot divide by 0', () => {
  let divideByZero = () => {
    rpn(1, 1, '-', 2, '/');
  }

  expect(divideByZero).toThrow('Cannot divide by 0')
})
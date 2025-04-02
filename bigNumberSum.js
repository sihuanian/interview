
function format(num, length) {
  const list = num.split('')
  while (list.length < length) {
    list.unshift('0')
  }
  return list
}
function bigNumberSum(a, b) {
  const num1 = String(a)
  const num2 = String(b)
  let num1Arr = num1.split('')
  let num2Arr = num2.split('')
  let sum = ''
  let acc = 0
  let resultArr = []
  const num1Length = num1.length
  const num2Length = num2.length
  if (num1Length < num2Length) {
    num1Arr = format(num1, num2Length)
  } else {
    num2Arr = format(num2, num1Length)
  }
  console.log({ num1Arr, num2Arr })

  for (let i = num1Arr.length - 1; i >= 0; i--) {
    const sum = Number(num1Arr[i]) + Number(num2Arr[i]) + acc
    resultArr.unshift(sum % 10)
    acc = Math.floor(sum / 10)
    console.log('acc', acc)
  }
  if (acc) {
    resultArr.unshift(acc)
  }

  return resultArr.join('')
}

const num1 = 1234567890
const num2 = 876654321

console.log(num1 + num2, '=======', bigNumberSum(num1, num2))
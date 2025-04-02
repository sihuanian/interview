function findPrimes(n) {
  const isPrime = (num) => {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false
    }
    return true
  }
  const primes = [1]
  if (n <= 1) {
    return primes
  }
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      primes.push(i)
    }
  }

  return primes
}

console.log(findPrimes(10));   // [1, 2, 3, 5, 7]
console.log(findPrimes(30));   // [1, 2,3,5,7,11,13,17,19,23,29]
console.log(findPrimes(1));    // [1]

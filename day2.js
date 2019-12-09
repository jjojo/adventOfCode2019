const input = [
1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,1,5,19,23,1,23,5,27,1,27,13,31,1,31,5,35,1,9,35,39,2,13,39,43,1,43,10,47,1,47,13,51,2,10,51,55,1,55,5,59,1,59,5,63,1,63,13,67,1,13,67,71,1,71,10,75,1,6,75,79,1,6,79,83,2,10,83,87,1,87,5,91,1,5,91,95,2,95,10,99,1,9,99,103,1,103,13,107,2,10,107,111,2,13,111,115,1,6,115,119,1,119,10,123,2,9,123,127,2,127,9,131,1,131,10,135,1,135,2,139,1,10,139,0,99,2,0,14,0
]
// PART 1

// generic functions 
const getValue = (array, index) => array[index]
const valueFormIndex = (array, index) => array[getValue(array, index)]
const addNextConsecutive = (array) => (index) => valueFormIndex(array, index + 1) + valueFormIndex(array, index + 2)
const multiplyNextConsecutive = (array) => (index) => valueFormIndex(array, index + 1) * valueFormIndex(array, index + 2)
const setVerbAndNoun = (array) => (verb, noun) => [array[0], verb, noun].concat(array.slice(3))
const setInputVerbAndNoun = setVerbAndNoun(input)

const OP_CODES = {
  1: addNextConsecutive,
  2: multiplyNextConsecutive,
}
const isFourth = (index) => !(index % 4)
const addSum = (index, array) => array[array[index + 3]] = OP_CODES[getValue(array, index)](array)(index)
const runOp = (array, index) => getValue(array,index) === 99 || !addSum(index, array)
const runOperations = (...args) => isFourth(args[1]) && runOp(args[2], args[1])
const compilationTerminated = (array) => array.some(runOperations)
const run = (inputArray) => compilationTerminated(inputArray) && inputArray


const taskInput = setInputVerbAndNoun(12,2)
console.log(run(taskInput)[0]) // Answer part 1: 3562624

// PART 2

const wantedOutput = 19690720

const binSearch = (bounds, searched) => (start, stop) => {
  const [lowerBound, upperBound] = bounds
  const guess = Math.floor((start + stop) / 2)
  const output = run(setInputVerbAndNoun(guess, 0))[0]
  if((searched - output) < upperBound && (searched - output) > lowerBound) return guess
  if((output - searched) > upperBound) return binSearch(bounds, searched)(start, guess - 1)
  if((output - searched) < upperBound) return binSearch(bounds, searched)(guess + 1, stop)
}

const wantedOutputNoun = binSearch([0, 99], wantedOutput)(0, 99)
const wantedOutputVerb = wantedOutput - run(setInputVerbAndNoun(wantedOutputNoun,0))[0]

console.log(wantedOutputNoun, wantedOutputVerb) // Answer part 2: verb: 82 noun: 98




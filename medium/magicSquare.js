const checked = new Map(); // We'll keep track of the combinations that have been checked.

const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const generateMagicSquare = () => {
  const possibleIntegers = [
    1,2,3,
    4,5,6,
    7,8,9
  ];

  const shuffled = shuffle(possibleIntegers);

  const shuffledAsString = shuffled.join('');

  if(checked.has(shuffledAsString)){
    return null;
  }

  checked.set(shuffledAsString, shuffled);

  const isNotMagicSquare = [
    (shuffled[0] + shuffled[1] + shuffled[2]),
    (shuffled[3] + shuffled[4] + shuffled[5]),
    (shuffled[6] + shuffled[7] + shuffled[8]),

    (shuffled[0] + shuffled[3] + shuffled[6]),
    (shuffled[1] + shuffled[4] + shuffled[7]),
    (shuffled[2] + shuffled[5] + shuffled[8]),

    (shuffled[0] + shuffled[4] + shuffled[8]),
    (shuffled[2] + shuffled[4] + shuffled[6]),
  ].some(combination => combination !== 15);

  if(isNotMagicSquare){
    return null;
  }

  return shuffledAsString.split('');
}

const findPossibleMagicSquares = () => {
  const magicSquareCombinations = [];

  while(magicSquareCombinations.length < 8){
    const combination = generateMagicSquare();

    if(combination){
      magicSquareCombinations.push(combination);
    }
  }

  return magicSquareCombinations;
}

const flattenMatrix = (matrixArr) => {
  let flatArray = [];

  matrixArr.forEach(arr => {
    flatArray = [...flatArray, ...arr];
  })

  return flatArray;
}

const getComputationCost = (flatArray, magicSquareArray) => {
  let cost = 0;

  flatArray.forEach((val, index) => {
    cost += Math.abs(val - magicSquareArray[index]);
  })

  return cost;
}

const formingMagicSquare = (initialMatrix) => {
  const possibleMagicSquares = findPossibleMagicSquares();
  const flattened = flattenMatrix(initialMatrix);

  const matrixCosts = [];

  possibleMagicSquares.forEach(magicSquare => {
    const cost = getComputationCost(flattened, magicSquare);
    matrixCosts.push(cost);
  })

  const minCost = Math.min(...matrixCosts);

  return minCost;
}


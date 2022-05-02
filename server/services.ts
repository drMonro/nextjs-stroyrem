export const getRandomNumberFromRange = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const getRandomIndexesArray = (maxLimit: number, count: number) => {
  const randomIndexes = [];
  const getRandomIndex = () => getRandomNumberFromRange(0, maxLimit);

  for (let i = 0; i < count; i++) {
    let originalStatus = false;

    while (originalStatus === false) {
      let randomIndex = getRandomIndex();
      let pairedIndex = randomIndexes.find(item => item === randomIndex);
      if (pairedIndex === undefined) {
        originalStatus = true;
        randomIndexes.push(randomIndex);
      }
    }
  }

  return randomIndexes;
}

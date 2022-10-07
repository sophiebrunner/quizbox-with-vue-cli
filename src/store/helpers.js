export function shuffleArray(arr) {
  return [...arr].sort(() => 0.5 - Math.random());
}

export function getNrOfRandomizedQuestions(arr, num) {
  return shuffleArray(arr).slice(0, num);
}

export function getNrOfRandomizedQuestionsFromSelCategories(arr, num) {
  return arr
    .map((el) => {
      return getNrOfRandomizedQuestions(el, num / arr.length);
    })
    .flatMap((el) => el);
}

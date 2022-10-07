export function shuffleArray(arr) {
  return [...arr].sort(() => 0.5 - Math.random());
}

export function getSpecificNumberOfRandomizedQuestions(arr, num) {
  return shuffleArray(arr).slice(0, num);
}

export function getRandomQuestionsFromSelectedCategories(arr, num) {
  return arr
    .map((el) => {
      return getSpecificNumberOfRandomizedQuestions(el, num / arr.length);
    })
    .flatMap((el) => el);
}

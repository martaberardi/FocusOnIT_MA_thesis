import {PartOfSpeech, Phrase, Stats, WordStats} from "../../../models";
import {average, sum} from "../../utils";
import {DialogUI} from "../../store/dialogReducer";

const getWordsInteractionsAverageForExercise = (wordsStats: WordStats[]): Map<string, number> => {
  const wordsInteractions: Map<string, number[]> = new Map();
  let lastUserInput: string = "";

  wordsStats.map(({buttonClicks, secondHintShowed, answerShowed, word}) => {
    if (!wordsInteractions.has(word.form)) {
      wordsInteractions.set(word.form, []);
    }

    const totInteractions = buttonClicks.reduce((totInteractions, {userInput}) => {
      let currentTotClicks = totInteractions;
      if (userInput !== lastUserInput && userInput.trim() !== "") {
        currentTotClicks++;
        lastUserInput = userInput;
      }

      currentTotClicks += secondHintShowed ? 5 : 0;
      currentTotClicks += answerShowed ? 10 : 0;

      return currentTotClicks;
    }, 0)

    wordsInteractions.get(word.form)!.push(totInteractions);
  });

  const wordsInteractionsAverage: Map<string, number> = new Map();
  wordsInteractions.forEach((interactions, wordForm) => {
    wordsInteractionsAverage.set(wordForm, sum(interactions) / interactions.length);
  });

  return wordsInteractionsAverage;
}

export const getProblematicPosOrderedByInteractions = (stats: Stats[]): string[] => {
  const posAverageInteractions: Map<PartOfSpeech, number[]> = new Map();
  posAverageInteractions.set(PartOfSpeech.ARTICLE, []);
  posAverageInteractions.set(PartOfSpeech.ADJECTIVE, []);
  posAverageInteractions.set(PartOfSpeech.NOUN, []);
  posAverageInteractions.set(PartOfSpeech.VERB, []);

  stats.forEach(({wordsStats, pos}) => {
    const averageInteractionsForExercise = [...getWordsInteractionsAverageForExercise(wordsStats).values()];
    posAverageInteractions.get(pos as PartOfSpeech)!.push(average(averageInteractionsForExercise))
  });

  return Array.from(posAverageInteractions)
    .map(([pos, averages]) => [pos, average(averages)] as [string, number])
    .sort(([pos1, average1], [pos2, average2]) =>
      average2 - average1
    )
    .filter(([_, average]) => average > 0)
    .map(([pos]) => pos);
}

const getProblematicWordsForExercise = (wordsStats: WordStats[]): string[] => {
  const wordsInteractionsAverage = getWordsInteractionsAverageForExercise(wordsStats);

  const [first, second, third] = Array.from(wordsInteractionsAverage)
    .sort(([wordForm1, interactions1], [wordForm2, interactions2]) =>
      interactions2 - interactions1
    )

  return [first, second, third]
    .filter(([_, average]) => average > 1)
    .map(([wordForm]) => wordForm);
}

const getProblematicWordsInPhrase = (wordsStats: WordStats[]) => {
  const wordsInteractions: Map<string, number> = new Map();
  let lastUserInput: string = "";

  wordsStats.map(({buttonClicks, secondHintShowed, answerShowed, word, phraseId}) => {
    const totInteractions = buttonClicks.reduce((totInteractions, {userInput}) => {
      let currentTotClicks = totInteractions;
      if (userInput !== lastUserInput && userInput.trim() !== "") {
        currentTotClicks++;
        lastUserInput = userInput;
      }

      currentTotClicks += secondHintShowed ? 5 : 0;
      currentTotClicks += answerShowed ? 10 : 0;

      return currentTotClicks;
    }, 0)

    wordsInteractions.set(`${phraseId}|${word.id}`, totInteractions);
  });
  return wordsInteractions;
}

export const getSortedProblematicWordsInPhrases = (wordStats: WordStats[], phrases: Phrase[]): { phrase: Phrase, wordId: string }[] => {
  const problematicWordsInPhrase: Map<string, number> = getProblematicWordsInPhrase(wordStats);

  const [first, second, third] = Array.from(problematicWordsInPhrase)
    .sort(([wordForm1, interactions1], [wordForm2, interactions2]) =>
      interactions2 - interactions1
    )

  return [first, second, third] // [[string, number], [string, number], [string, number]]
    .filter(([_, interactions]) => interactions > 1) // [[string, number > 1], [string, number > 1], [string, number > 1]]
    .map(([phraseIdWordId]) => {
      const [phraseId, wordId] = phraseIdWordId.split("|");
      const phrase = phrases.find((p) => p.id === phraseId)!;

      return {phrase, wordId}
    });
}

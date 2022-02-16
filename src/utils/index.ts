import {Stats, Word} from "../../models";

export const wordHasGenderAndNumber: (word: Word) => boolean = (w) => Boolean(w.features?.gender) && Boolean(w.features?.number);
export const wordHasSameGenderAndNumber: (word: Word, otherWord: Word) => boolean = (w1, w2) =>
  w1.features?.gender === w2.features?.gender && w1.features?.number === w2.features?.number;

export const sum = (numbers: number[]): number => numbers.reduce((tot, n) => tot + n, 0);
export const average = (numbers: number[]): number => {
  if(numbers.length === 0) {
    return 0;
  }

  return sum(numbers) / numbers.length
};
export const getDateTimeFromStats = (stats: Stats) => {
  const date = new Date(stats.savedAt!);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

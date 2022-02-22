import React, {FC, useState} from 'react';
import {WordUI} from "../../store/dialogReducer";
import {Gender, PartOfSpeech} from "../../../models";

const WordHint: FC<WordHintProps> = ({word}) => {
  const [firstLetter] = useState(word.form.charAt(0));
  const [lastLetter] = useState(word.form.charAt(word.form.length - 1));
  const [middleLetters] = useState(word.form.substr(1, word.form.length - 2));

  switch (word.hint?.suggestionFor!.part_of_speech) {
    case PartOfSpeech.ADJECTIVE: {
      return (
        <>&nbsp;
          {word.form.length > 1 && firstLetter}
          {word.form.length > 2 && middleLetters}
          <span className="last-letter-bg">{lastLetter}</span>
        </>)
    }
    case PartOfSpeech.ARTICLE: {
      const highlightRegex = new RegExp(/^(ps|pn|gn|s[^aeiou])/);
      const highlightFirstTwoLetters = word.features?.gender === Gender.MALE && highlightRegex.test(word.form);

      if (highlightFirstTwoLetters) {
        if (word.form.length <= 3) {
          return (
            <span> &nbsp;
              <span className="last-letter-bg">{word.form}</span>
            </span>
          )
        } else {
          return (
            <span>
          &nbsp;
              <span className="first-letter-bg">{firstLetter}{middleLetters.charAt(0)}</span>
              {middleLetters.slice(1)}
              <span className="last-letter-bg">{lastLetter}</span>
        </span>
          )
        }
      } else {
        return (
          <span>
          &nbsp;
            {word.form.length > 1 && <span className="first-letter-bg">{firstLetter}</span>}
            {word.form.length > 2 && middleLetters}
            <span className="last-letter-bg">{lastLetter}</span>
        </span>
        )
      }
    }
    case PartOfSpeech.NOUN: {
      return (
        <>&nbsp;
          {word.form.length > 1 && firstLetter}
          {word.form.length > 2 && middleLetters}
          <span className="last-letter-bg">{lastLetter}</span>
        </>)
    }
    case PartOfSpeech.VERB: {
      return (
        <>
          &nbsp;
          <span className={word.dependency_relation === 'subj' ? 'background-color-yellow' : ''}>
          {word.form}
        </span>
        </>
      )
    }
    default: {
      return <>&nbsp;{word.form}</>
    }
  }
};

export default WordHint;

interface WordHintProps {
  word: WordUI
}

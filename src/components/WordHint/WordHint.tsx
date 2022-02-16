import React, {FC, useState} from 'react';
import {WordUI} from "../../store/dialogReducer";
import {PartOfSpeech} from "../../../models";

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
      return (
        <span>
          &nbsp;
          {word.form.length > 1 && <span className="first-letter-bg">{firstLetter}</span>}
          {word.form.length > 2 && middleLetters}
          <span className="last-letter-bg">{lastLetter}</span>
        </span>
      )
    }
    case PartOfSpeech.NOUN: {
      return (
        <span className="background-color-yellow">
          &nbsp;{word.form}
        </span>
      )
    }
    case PartOfSpeech.VERB: {
      return (
        <span className={word.dependency_relation === 'subj' ? 'background-color-yellow' : ''}>
          &nbsp;{word.form}
        </span>
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

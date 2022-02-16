import React, {FC, useEffect, useState} from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useDispatch} from 'react-redux';
import {
  Gender, PartOfSpeech, PhraseStatus, WordNumber,
} from '../../../models';
import {PhraseUI} from '../../store/dialogReducer';
import {convertGenderToSymbol} from '../../utils/dataParser';
import {generateActionSetPhraseStatus} from '../../store/actions';
import WordField from "../WordField";
import WordHint from "../WordHint";
import {isAlphanumeric} from "../../utils/wordUtils";

const Phrase: FC<PhraseProps> = function ({phrase, filter, dialogId}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const isToComplete = phrase.words.some(w => w.status === 'ToBeFilled' && w.part_of_speech === filter);
    const isUnnecessary = phrase.words.every(w => w.part_of_speech !== filter || w.status === 'Unblankable');
    const isCompleted =
      phrase.words.some(w => w.part_of_speech === filter && w.status !== 'Unblankable')
      && phrase.words.every(w => w.part_of_speech !== filter || w.status === 'Completed' || w.status === 'Unblankable');

    if (isUnnecessary) {
      phrase.status !== PhraseStatus.UNNECESSARY && dispatch(generateActionSetPhraseStatus(dialogId, phrase.id, PhraseStatus.UNNECESSARY));
    } else if (isCompleted) {
      phrase.status !== PhraseStatus.COMPLETED && dispatch(generateActionSetPhraseStatus(dialogId, phrase.id, PhraseStatus.COMPLETED));
    } else if (isToComplete) {
      phrase.status !== PhraseStatus.TO_COMPLETE && dispatch(generateActionSetPhraseStatus(dialogId, phrase.id, PhraseStatus.TO_COMPLETE));
    }
  }, [phrase]);

  return (
    <div className="phrase">
      <span className={phrase.isSpeakerHighlighted ? "background-color-yellow" : ""}>
        {phrase.speaker.name}
        {convertGenderToSymbol(phrase.speaker.gender as Gender)}
        {phrase.speaker.number === WordNumber.PLURAL && convertGenderToSymbol(phrase.speaker.gender as Gender)}
        :
      </span>

      {generateWordList(filter, dialogId, phrase)}

      {phrase.status === PhraseStatus.COMPLETED && <CheckCircleIcon color="success"/>}
    </div>
  );
};

export default Phrase;

function generateWordList(filter: PartOfSpeech, dialogId: string, phrase: PhraseUI) {
  const result = [];
  let currentSimpleWordSeries = "";
  for (let i = 0; i < phrase.words.length; i++) {
    const word = phrase.words[i];

    if (word.part_of_speech === filter && word.status !== "Unblankable") {
      result.push(currentSimpleWordSeries);
      currentSimpleWordSeries = "";
      result.push(<WordField
        key={word.id}
        dialogId={dialogId}
        phraseId={phrase.id}
        word={word}
      />);
    } else if ("hint" in word && word.hint) {
      result.push(currentSimpleWordSeries);
      currentSimpleWordSeries = "";
      result.push(<WordHint word={word} key={word.id}/>)
    } else {
      if (isAlphanumeric(word.form)) {
        currentSimpleWordSeries += ` ${word.form}`;
      } else {
        currentSimpleWordSeries += `${word.form}`;
      }
    }
  }
  result.push(currentSimpleWordSeries);
  return result;
}

interface PhraseProps {
  phrase: PhraseUI,
  filter: PartOfSpeech
  dialogId: string
}

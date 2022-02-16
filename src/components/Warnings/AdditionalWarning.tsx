import React, {FC} from 'react';
import {Alert} from "@mui/material";
import AnswerButton from "./AnswerButton";
import {WordUI} from "../../store/dialogReducer";
import {Gender, PartOfSpeech, Person, WordNumber} from "../../../models";
import {
  convertGenderInItalian,
  convertGenderToSymbol,
  convertNumberInItalian,
  convertNumberToSymbol,
  convertPersonAndNumberInItalian
} from "../../utils/dataParser";

const AdditionalWarning: FC<AdditionalWarningProps> = ({
                                                         isAnswerButtonVisible,
                                                         setIsAnswerVisible,
                                                         word,
                                                         isOnBlanked
                                                       }) => (
  <Alert
    severity="info"
    action={(isAnswerButtonVisible
      ? <AnswerButton setIsAnswerVisible={setIsAnswerVisible}/> : null)}
  >
    {getText(word, isOnBlanked)}
  </Alert>
);

export default AdditionalWarning;

function getText(word: WordUI, isOnBlanked: boolean) {
  switch (word.hint?.suggestionFor.part_of_speech as PartOfSpeech) {
    case PartOfSpeech.ADJECTIVE: {
      if (isOnBlanked) {
        return (
          <>
            {`L'aggettivo che devi scrivere è  ${convertGenderInItalian(word.features?.gender as Gender)} `}
            {'('}
            {convertGenderToSymbol(word.features?.gender as Gender)}
            {')'}
            {` e ${convertNumberInItalian(word.features?.number as WordNumber)}`}
            {'('}
            {convertNumberToSymbol(word.features?.number as WordNumber)}
            {')'}
          </>
        )
      } else {
        return (
          <>
            {`La parola "${word.form}"  è  ${convertGenderInItalian(word.features?.gender as Gender)} `}
            {'('}
            {convertGenderToSymbol(word.features?.gender as Gender)}
            {')'}
            {` e ${convertNumberInItalian(word.features?.number as WordNumber)} `}
            {'('}
            {convertNumberToSymbol(word.features?.number as WordNumber)}
            {')'}
          </>
        )
      }
    }
    case PartOfSpeech.ARTICLE: {
      return (
        <>
          La parola &quot;
          {word.form}
          &quot; è
          {' '}
          {convertGenderInItalian(word.features?.gender as Gender)}
          {' ('}
          {convertGenderToSymbol(word.features?.gender as Gender)}
          {') '}
          e
          {' '}
          {convertNumberInItalian(word.features?.number as WordNumber)}
          {' ('}
          {convertNumberToSymbol(word.features?.number as WordNumber)}
          {')'}
        </>
      )
    }
    case PartOfSpeech.NOUN: {
      return (
        <>
          {`Devi scrivere un nome  ${convertGenderInItalian(word.features?.gender as Gender)}`}
          {convertGenderToSymbol(word.features?.gender as Gender)}
          {' e '}
          {convertNumberInItalian(word.features?.number as WordNumber)}
          {convertNumberToSymbol(word.features?.number as WordNumber)}
        </>
      )
    }
    case PartOfSpeech.VERB: {
      return (
        <>
          Il soggetto del verbo
          è
          {' '}
          {convertPersonAndNumberInItalian(word.hint?.suggestionFor.features?.person as Person, word.hint?.suggestionFor.features?.number as WordNumber)}
          .
        </>
      )
    }
    default:
      return <></>

  }
}

interface AdditionalWarningProps {
  isAnswerButtonVisible: boolean,
  setIsAnswerVisible: (isVisible: boolean) => void,
  word: WordUI,
  isOnBlanked: boolean
}

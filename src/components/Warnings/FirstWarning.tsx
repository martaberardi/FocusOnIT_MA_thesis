import React, {FC} from 'react';
import {WordUI} from "../../store/dialogReducer";
import {Gender, PartOfSpeech, Person, WordNumber} from "../../../models";
import {Alert} from "@mui/material";
import {
  convertGenderToSymbol,
  convertNumberToSymbol,
  convertPersonAndNumberInItalian
} from "../../utils/dataParser";
import AdditionalWarningButton from "./AdditionalWarningButton";

const FirstWarning: FC<FirstWarningProps> = ({suggestionFor, setIsAdditionalWarningVisible, isOnBlanked}) => {
  return (
    <Alert
      severity="warning"
      action={<AdditionalWarningButton
        setIsAdditionalWarningVisible={setIsAdditionalWarningVisible}/>}
    >
      {getAlertText(suggestionFor, isOnBlanked)}
    </Alert>
  )
};

export default FirstWarning;

function getAlertText(word: WordUI, isOnBlanked: boolean) {
  switch (word.part_of_speech as PartOfSpeech) {
    case PartOfSpeech.ADJECTIVE: {
      if (isOnBlanked) {
        return (
          <p>Rifletti: a chi/che cosa si riferisce l'aggettivo?</p>
        )
      } else {
        return (
          <p>
            Guarda come
            {' '}
            <span className="last-letter-color">finisce</span>
            {' '}
            la parola: è maschile
            (
            {convertGenderToSymbol(Gender.MALE)}
            ) o femminile (
            {convertGenderToSymbol(Gender.FEMALE)}
            )?
            È singolare (
            {convertNumberToSymbol(WordNumber.SINGULAR)}
            ) o plurale (
            {convertNumberToSymbol(WordNumber.PLURAL)}
            )?
          </p>
        )
      }
    }
    case PartOfSpeech.ARTICLE: {
      return (
        <>
          <p>
            Guarda come
            {' '}
            <span className="first-letter-color">inizia</span>
            {' '}
            la parola: per vocale (a/e/i/o/u) o consonante?
          </p>
          <p>
            Guarda come
            {' '}
            <span className="last-letter-color">finisce</span>
            {' '}
            la parola: è maschile (
            {convertGenderToSymbol(Gender.MALE)}
            ) o femminile (
            {convertGenderToSymbol(Gender.FEMALE)}
            )?
            {' '}
            È singolare (
            {convertNumberToSymbol(WordNumber.SINGULAR)}
            ) o plurale (
            {convertNumberToSymbol(WordNumber.PLURAL)}
            )?
          </p>
        </>
      )
    }
    case PartOfSpeech.NOUN: {
      return (
        <>
          La parola evidenziata ti dà informazioni sul nome che devi scrivere.
          <p>
            Guarda come
            {' '}
            <span className="last-letter-color">finisce</span>
            {' '}
            la parola: è maschile
            (
            {convertGenderToSymbol(Gender.MALE)}
            ) o femminile (
            {convertGenderToSymbol(Gender.FEMALE)}
            )?
            È singolare (
            {convertNumberToSymbol(WordNumber.SINGULAR)}
            ) o plurale (
            {convertNumberToSymbol(WordNumber.PLURAL)}
            )?
          </p>
        </>
      )
    }
    case PartOfSpeech.VERB: {
      return (
        <>
          Rifletti: chi è il soggetto del verbo?
        </>
      )
    }
    default: {
      return <></>
    }
  }
}


interface FirstWarningProps {
  suggestionFor: WordUI,
  setIsAdditionalWarningVisible: (isVisible: boolean) => void,
  isOnBlanked: boolean
}

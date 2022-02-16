import React, {FC, useEffect, useState} from 'react';
import {Alert, Button} from '@mui/material';
import {Gender, PartOfSpeech, WordNumber} from '../../../models';
import {
  convertGenderInItalian,
  convertGenderToSymbol,
  convertNumberInItalian,
  convertNumberToSymbol,
} from '../../utils/dataParser';
import {WordUI} from '../../store/dialogReducer';
import useStatsTracker from '../../hook/useStatsTracker';
import {wordUIToWord} from "../../utils/wordUtils";

let timeout: any;

const AdjectiveHint: FC<AdjectiveHintProps> = function ({
                                                          word,
                                                          isOnAdjectiveField,
                                                          suggestionFor,
                                                          dialogId,
                                                          phraseId
                                                        }) {
  const [firstLetter] = useState(word.form.charAt(0));
  const [lastLetter] = useState(word.form.charAt(word.form.length - 1));
  const [middleLetters] = useState(word.form.substr(1, word.form.length - 2));
  const [isAdditionalWarningVisible, setIsAdditionalWarningVisible] = useState(false);
  const [isAnswerButtonVisible, setIsAnswerButtonVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  useStatsTracker({
    isAdditionalWarningVisible,
    isAnswerVisible,
    word: wordUIToWord(suggestionFor),
    dialogId,
    phraseId
  });

  useEffect(() => {
    if (isAdditionalWarningVisible) {
      timeout = setTimeout(() => setIsAnswerButtonVisible(true), 3000);
    }

    return () => clearTimeout(timeout);
  }, [isAdditionalWarningVisible]);

  return (
    <>
      {!isOnAdjectiveField && (
        <>&nbsp;
          {word.form.length > 1 && firstLetter}
          {word.form.length > 1 && middleLetters}
          <span className="last-letter-bg">{lastLetter}</span>

        </>
      )}

      <div className="alert">
        {!isOnAdjectiveField && (
          <Alert
            severity="warning"
            action={(
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsAdditionalWarningVisible(true);
                }}
              >
                +
              </Button>
            )}
          >
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
          </Alert>
        )}
        {isOnAdjectiveField ? (
          <Alert
            severity="warning"
            action={(
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsAdditionalWarningVisible(true);
                }}
              >
                +
              </Button>
            )}
          >
            Rifletti: a chi/che cosa si riferisce l'aggettivo?
          </Alert>
        ) : null}

        {isAdditionalWarningVisible && !isOnAdjectiveField ? (
          <Alert
            severity="info"
            action={(isAnswerButtonVisible
              ? (
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setIsAnswerVisible(true);
                  }}
                >
                  Mostra risposta
                </Button>
              ) : null)}
          >
            {`La parola "${isOnAdjectiveField ? '' : `${word.form}`}"  è  ${convertGenderInItalian(word.features?.gender as Gender)} `}
            {'('}
            {convertGenderToSymbol(word.features?.gender as Gender)}
            {')'}
            {` e ${convertNumberInItalian(word.features?.number as WordNumber)} `}
            {'('}
            {convertNumberToSymbol(word.features?.number as WordNumber)}
            {')'}

          </Alert>
        ) : null}
        {isAdditionalWarningVisible && isOnAdjectiveField ? (
          <Alert
            severity="info"
            action={(isAnswerButtonVisible
              ? (
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setIsAnswerVisible(true);
                  }}
                >
                  Mostra risposta
                </Button>
              ) : null)}
          >
            {`L'aggettivo che devi scrivere è  ${convertGenderInItalian(word.features?.gender as Gender)} `}
            {'('}
            {convertGenderToSymbol(word.features?.gender as Gender)}
            {')'}
            {` e ${convertNumberInItalian(word.features?.number as WordNumber)}`}
            {'('}
            {convertNumberToSymbol(word.features?.number as WordNumber)}
            {')'}

          </Alert>
        ) : null}

        {isAnswerVisible && (
          <Alert severity="success">
            {'La risposta corretta è: "'}
            {suggestionFor.form}
            {'"'}
          </Alert>
        )}
      </div>
    </>
  );
};

export default AdjectiveHint;

interface AdjectiveHintProps {
  word: WordUI,
  isOnAdjectiveField?: boolean,
  suggestionFor: WordUI,
  dialogId: string,
  phraseId: string,
}

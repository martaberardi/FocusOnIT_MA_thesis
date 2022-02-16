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

const NounHint: FC<NounHintProps> = function ({word, suggestionFor, dialogId, phraseId}) {
  const [isAdditionalWarningVisible, setIsAdditionalWarningVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isAnswerButtonVisible, setIsAnswerButtonVisible] = useState(false);
  useStatsTracker({
    isAdditionalWarningVisible,
    isAnswerVisible,
    word: wordUIToWord(suggestionFor),
    dialogId,
    phraseId,
  });

  useEffect(() => {
    if (isAdditionalWarningVisible) {
      timeout = setTimeout(() => setIsAnswerButtonVisible(true), 5000);
    }

    return () => clearTimeout(timeout);
  }, [isAdditionalWarningVisible]);

  return (
    <>
      <span className="background-color-yellow">
        &nbsp;{word.form}
      </span>

      <div className="alert">
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
          La parola evidenziata ti dà informazioni sul nome che devi scrivere.
          <p>
            Guarda la parola: è maschile (
            {convertGenderToSymbol(Gender.MALE)}
            ) o femminile (
            {convertGenderToSymbol(Gender.FEMALE)}
            )?
          </p>
          <p>
            È singolare (
            {convertNumberToSymbol(WordNumber.SINGULAR)}
            ) o plurale (
            {convertNumberToSymbol(WordNumber.PLURAL)}
            )?
          </p>
        </Alert>

        {isAdditionalWarningVisible && (
          <Alert
            severity="info"
            action={(isAnswerButtonVisible ? (
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
            {`Devi scrivere un nome  ${convertGenderInItalian(word.features?.gender as Gender)}`}
            {convertGenderToSymbol(word.features?.gender as Gender)}
            {' e '}
            {convertNumberInItalian(word.features?.number as WordNumber)}
            {convertNumberToSymbol(word.features?.number as WordNumber)}

          </Alert>
        )}

        {isAnswerVisible && (
          <Alert severity="success">
            {suggestionFor.form}
          </Alert>
        )}
      </div>

    </>
  );
};

export default NounHint;

interface NounHintProps {
  word: WordUI,
  suggestionFor: WordUI,
  dialogId: string,
  phraseId: string,

}

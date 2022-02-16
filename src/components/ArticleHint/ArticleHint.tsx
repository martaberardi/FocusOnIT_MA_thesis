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

const ArticleHint: FC<ArticleHintProps> = function ({word, phraseId, suggestionFor, dialogId}) {
  const [firstLetter] = useState(word.form.charAt(0));
  const [lastLetter] = useState(word.form.charAt(word.form.length - 1));
  const [middleLetters] = useState(word.form.substr(1, word.form.length - 2));
  const [isAdditionalWarningVisible, setIsAdditionalWarningVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isAnswerButtonVisible, setIsAnswerButtonVisible] = useState(false);
  useStatsTracker({
    isAdditionalWarningVisible,
    isAnswerVisible,
    word: wordUIToWord(suggestionFor),
    phraseId,
    dialogId
  });

  useEffect(() => {
    if (isAdditionalWarningVisible) {
      timeout = setTimeout(() => setIsAnswerButtonVisible(true), 5000);
    }

    return () => clearTimeout(timeout);
  }, [isAdditionalWarningVisible]);

  return (
    <span>
      &nbsp;
      <span className="first-letter-bg">
        {firstLetter}
      </span>

      {middleLetters}

      <span className="last-letter-bg">
        {lastLetter}
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
        </Alert>

        {isAdditionalWarningVisible ? (
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
          </Alert>
        ) : null}

        {isAnswerVisible && (
          <Alert severity="success">
            {'La risposta corretta è: '}
            {suggestionFor.form}
          </Alert>
        )}
      </div>
    </span>
  );
};

export default ArticleHint;

interface ArticleHintProps {
  word: WordUI,
  suggestionFor: WordUI,
  dialogId: string,
  phraseId: string,
}

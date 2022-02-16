import React, {FC, useEffect, useState} from 'react';
import {Alert, Button} from '@mui/material';
import {WordUI} from '../../store/dialogReducer';
import {convertPersonAndNumberInItalian} from '../../utils/dataParser';
import {PartOfSpeech, Person, WordNumber} from '../../../models';
import useStatsTracker from '../../hook/useStatsTracker';
import {wordUIToWord} from "../../utils/wordUtils";

let timeout: any;

const VerbHint: FC<VerbHintProps> = function ({
                                                word,
                                                isOnVerbField,
                                                suggestionFor,
                                                dialogId,
                                                phraseId
                                              }) {
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

  if (isOnVerbField) {
    return (
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
          Rifletti: chi è il soggetto del verbo?
        </Alert>

        {isAdditionalWarningVisible && (
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
            Il soggetto del verbo
            è
            {' '}
            {convertPersonAndNumberInItalian(word.features?.person as Person, word.features?.number as WordNumber)}
            .
          </Alert>
        )}

        {isAnswerVisible && (
          <Alert severity="success">
            {'Indicativo presente del verbo "'}
            {suggestionFor.lemma}
            {'": '}
            <p>{suggestionFor.inflection || suggestionFor.form}</p>
          </Alert>
        )}
      </div>
    );
  } else {
    return (
      <span className={word.dependency_relation === 'subj' ? 'background-color-yellow' : ''}>
        &nbsp;{word.form}
      </span>
    );
  }
};

export default VerbHint;

interface VerbHintProps {
  word: WordUI,
  isOnVerbField?: boolean,
  suggestionFor: WordUI,
  dialogId: string,
  phraseId: string,
}

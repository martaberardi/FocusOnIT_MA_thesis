import React, {FC, useEffect, useState} from 'react';
import useStatsTracker from "../../hook/useStatsTracker";
import {wordUIToWord} from "../../utils/wordUtils";
import {WordUI} from "../../store/dialogReducer";
import FirstWarning from "./FirstWarning";
import AdditionalWarning from "./AdditionalWarning";
import Answer from "./Answer";

let timeout: any;

const Warnings: FC<HintAlertProps> = ({word, dialogId, phraseId}) => {
  const [isAdditionalWarningVisible, setIsAdditionalWarningVisible] = useState(false);
  const [isAnswerButtonVisible, setIsAnswerButtonVisible] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  useStatsTracker({
    isAdditionalWarningVisible,
    isAnswerVisible,
    word: wordUIToWord(word.hint?.suggestionFor!),
    dialogId,
    phraseId
  });

  useEffect(() => {
    if (isAdditionalWarningVisible) {
      timeout = setTimeout(() => setIsAnswerButtonVisible(true), 5000);
    }
    return () => clearTimeout(timeout);
  }, [isAdditionalWarningVisible]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [isAdditionalWarningVisible, isAnswerVisible])

  return <>
    <FirstWarning
      suggestionFor={word.hint?.suggestionFor!}
      setIsAdditionalWarningVisible={setIsAdditionalWarningVisible}
      isOnBlanked={word.id === word.hint?.suggestionFor!.id}
    />
    {
      isAdditionalWarningVisible && (
        <AdditionalWarning
          setIsAnswerVisible={setIsAnswerVisible}
          word={word}
          isAnswerButtonVisible={isAnswerButtonVisible}
          isOnBlanked={word.id === word.hint?.suggestionFor!.id}
        />
      )
    }
    {
      isAnswerVisible && (
        <Answer
          suggestionFor={word.hint?.suggestionFor!}
        />
      )
    }
  </>
}

export default Warnings;

interface HintAlertProps {
  word: WordUI,
  dialogId: string,
  phraseId: string,
}

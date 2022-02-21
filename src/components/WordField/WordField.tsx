import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  generateActionAddButtonClick,
  generateActionAddWordStats,
  generateActionHideHint,
  generateActionSetWordStatus,
  generateActionShowHint
} from "../../store/actions";
import {WordUI} from "../../store/dialogReducer";
import {Button, TextField} from "@mui/material";
import {generateLemma} from "./utils";
import SendIcon from '@mui/icons-material/Send';
import {isCapitalMissing, wordUIToWord} from "../../utils/wordUtils";
import {Store} from "../../store";
import {PartOfSpeech} from "../../../models";
import CapitalToast from "./CapitalToast";

const WordField: FC<WordFieldProps> = (
  {
    dialogId, phraseId, word
  }) => {
  const [lemma] = useState(generateLemma(word));
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
  const [isCapitalToastOpen, setIsCapitalToastOpen] = useState(false);
  const buttonClicks = useSelector((state: Store) => {
      const pos = word.part_of_speech as PartOfSpeech;
      return pos in state.userData.stats
        && dialogId in state.userData.stats[pos]
        && state.userData.stats[pos][dialogId].get(word.id)?.buttonClicks
    }
  )

  useEffect(() => {
    dispatch(generateActionAddWordStats(dialogId, phraseId, wordUIToWord(word), false, false, false));
  }, []);

  useEffect(() => {
    if (buttonClicks && buttonClicks.length > 0) {
      if (userInput === word.form) {
        dispatch(generateActionHideHint(dialogId, phraseId, word));
        dispatch(generateActionSetWordStatus(dialogId, phraseId, word.id, 'Completed'))
      } else {
        dispatch(generateActionShowHint(dialogId, phraseId, word));
      }
    }
  }, [buttonClicks])

  const onSubmit = () => {
    const trimmedUserInput = userInput.trim();
    if (userInput !== word.form && isCapitalMissing(word.form, trimmedUserInput)) {
      setIsCapitalToastOpen(true);
    }

    setUserInput(trimmedUserInput);
    dispatch(generateActionAddButtonClick(
        dialogId,
        word,
        trimmedUserInput,
        new Date(Date.now()).toISOString()
      )
    );
  }

  return (
    <>
      <TextField
        label={lemma}
        variant="filled"
        onChange={e => setUserInput(e.target.value)}
        disabled={word.status === 'Completed'}
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
        autoFocus
      />
      {word.status !== 'Completed' && <Button onClick={onSubmit}>
          <SendIcon/>
      </Button>}

      <CapitalToast isOpen={isCapitalToastOpen} setIsOpen={setIsCapitalToastOpen}/>
    </>
  );
};

export default WordField;

interface WordFieldProps {
  dialogId: string,
  phraseId: string,
  word: WordUI,
}

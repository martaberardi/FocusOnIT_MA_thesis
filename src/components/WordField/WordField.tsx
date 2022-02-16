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
import ChooseWordComponent from "../ChooseWordComponent";
import SendIcon from '@mui/icons-material/Send';
import {wordUIToWord} from "../../utils/wordUtils";
import {Store} from "../../store";
import {PartOfSpeech} from "../../../models";

const WordField: FC<WordFieldProps> = (
  {
    dialogId, phraseId, word
  }) => {
  const [lemma] = useState(generateLemma(word));
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
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
    console.log("buttonClicks:", buttonClicks);
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
    dispatch(generateActionAddButtonClick(
        dialogId,
        word,
        userInput,
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
    </>
  );
};

export default WordField;

interface WordFieldProps {
  dialogId: string,
  phraseId: string,
  word: WordUI,
}

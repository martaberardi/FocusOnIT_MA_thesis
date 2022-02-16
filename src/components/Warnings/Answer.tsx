import React, {FC} from 'react';
import {Alert} from "@mui/material";
import {WordUI} from "../../store/dialogReducer";
import {PartOfSpeech} from "../../../models";

const Answer: FC<AnswerProps> = ({suggestionFor}) => (
  <Alert severity="success">
    {getText(suggestionFor)}
  </Alert>
);

export default Answer;

interface AnswerProps {
  suggestionFor: WordUI,
}

function getText(suggestionFor: WordUI) {
  switch (suggestionFor.part_of_speech as PartOfSpeech) {
    case PartOfSpeech.VERB: {
      return (
        <>
          {'Indicativo presente del verbo "'}
          {suggestionFor.lemma}
          {'": '}
          <p>{suggestionFor.inflection || suggestionFor.form}</p>
        </>
      )
    }
    default: {
      return (
        <>
          {'La risposta corretta è: '}
          {suggestionFor.form}
        </>
      )
    }

  }
}

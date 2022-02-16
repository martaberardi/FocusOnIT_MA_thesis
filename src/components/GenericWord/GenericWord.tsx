import React, { FC } from 'react';
import { Word } from '../../../models';
import {isAlphanumeric} from "../../utils/wordUtils";

const GenericWord: FC<GenericWordProps> = function ({ word }) {
  if (isAlphanumeric(word.form)) {
    return <>&nbsp;{word.form}</>;
  }
  return <>{word.form}</>;
};

export default GenericWord;

interface GenericWordProps {
  word: Word
}

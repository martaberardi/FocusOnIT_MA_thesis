import React, {FC} from 'react';
import ArticleHint from '../ArticleHint';
import NounHint from '../NounHint';
import GenericWord from '../GenericWord';
import {WordUI} from '../../store/dialogReducer';
import AdjectiveHint from '../AdjectiveHint';
import VerbHint from "../VerbHint";

const ChooseWordComponent: FC<ChooseWordComponentProps> = function (
  {word, dialogId, phraseId, isInsideField}
) {
  if ('hint' in word && word.hint) {
    const {type, suggestionFor} = word.hint;
    switch (type) {
      case 'ArticleHint': {
        return (<ArticleHint
          key={word.id}
          word={word}
          suggestionFor={suggestionFor}
          dialogId={dialogId}
          phraseId={phraseId}
        />)
      }
      case 'AdjectiveHint': {
        return (<AdjectiveHint
          key={word.id}
          isOnAdjectiveField={isInsideField}
          word={word}
          suggestionFor={suggestionFor}
          dialogId={dialogId}
          phraseId={phraseId}
        />)
      }
      case 'NounHint': {
        return (<NounHint
          word={word}
          key={word.id}
          suggestionFor={suggestionFor}
          dialogId={dialogId}
          phraseId={phraseId}
        />)
      }
      case 'VerbHint': {
        return (<VerbHint isOnVerbField={isInsideField} word={word} key={word.id}
                          suggestionFor={suggestionFor}
                          dialogId={dialogId}
                          phraseId={phraseId}
        />);

      }
      default: {
        return <GenericWord word={word} key={word.id}/>;
      }
    }
  } else {
    return <GenericWord key={word.id} word={word}/>;
  }
};
export default ChooseWordComponent;

interface ChooseWordComponentProps {
  word: WordUI,
  dialogId: string,
  isInsideField?: boolean
  phraseId: string,
}

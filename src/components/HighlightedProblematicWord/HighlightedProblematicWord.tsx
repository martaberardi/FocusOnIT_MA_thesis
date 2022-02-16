import React, {FC} from 'react';
import {Phrase} from "../../../models";
import GenericWord from "../GenericWord";

const HighlightedProblematicWord: FC<HighlightedProblematicWordProps> = ({phrase, wordId}) => (
  <>
    {
      phrase.words.map((word) => {
        if (wordId === word.id) {
          return (
            <span style={{color: "red"}} key={word.id}>
              <GenericWord word={word}/>
            </span>
          )
        } else {
          return <GenericWord word={word} key={word.id}/>
        }
      })
    }
  </>
);

export default HighlightedProblematicWord;

interface HighlightedProblematicWordProps {
  phrase: Phrase,
  wordId: string
}

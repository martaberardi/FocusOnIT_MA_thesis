import React, {FC} from 'react';
import {getDateTimeFromStats} from "../../utils";
import {getSortedProblematicWordsInPhrases} from "./utils";
import {Phrase, Stats} from "../../../models";
import HighlightedProblematicWordInPhrase from "../HighlightedProblematicWord";

const ProblematicWords: FC<ProblematicWordsProps> = ({posStats, phrases}) => (
  <div>
    <h3>Parole più problematiche</h3>
    {posStats.map((exerciseStats) => {
      return <div key={exerciseStats.id}>
        <h4>Del {getDateTimeFromStats(exerciseStats)}</h4>
        {getSortedProblematicWordsInPhrases(exerciseStats.wordsStats, phrases)
          .map(({phrase, wordId}) => <li key={wordId}><HighlightedProblematicWordInPhrase phrase={phrase} wordId={wordId}/></li>)
        }
      </div>
    })}
  </div>
);

export default ProblematicWords;

interface ProblematicWordsProps {
  posStats: Stats[],
  phrases: Phrase[]
}

import React, {FC, useEffect, useState} from 'react';
import {DataStore} from "aws-amplify";
import {Stats as StatsFromDB} from '../models';

const Stats: FC<StatsProps> = () => {
  const [stats, setStats] = useState<StatsFromDB[]>();

  useEffect(() => {
    const run = async () => {
      const statsFromDB = await DataStore.query(StatsFromDB);
      setStats(statsFromDB)
    }
    run();
  }, [])

  return (<div>
    {stats?.map(stat => {
      const totWords = stat.wordsStats.length;
      const savedAt = new Date(stat.savedAt!);
      const firstHintShowed = stat.wordsStats.reduce((tot, wordStat) => tot + (wordStat.firstHintShowed ? 1 : 0), 0);
      const secondHintShowed = stat.wordsStats.reduce((tot, wordStat) => tot + (wordStat.secondHintShowed ? 1 : 0), 0);
      const answerShowed = stat.wordsStats.reduce((tot, wordStat) => tot + (wordStat.answerShowed ? 1 : 0), 0);
      return (
        <div>
          <p>POS: {stat.pos}</p>
          <p>Exercise ID: {stat.id}</p>
          <p>Blanked words in exercise: {totWords}</p>
          <p>Saved
            at: {savedAt.toLocaleDateString()} {savedAt.toLocaleTimeString()}</p>
          <p>First hint showed: {firstHintShowed}</p>
          <p>First hint showed %: {(100 * firstHintShowed / totWords).toFixed(2)}</p>
          <p>Second hint showed: {secondHintShowed}</p>
          <p>Second hint showed %:
            {(100 * secondHintShowed / totWords).toFixed(2)}
          </p>
          <p>Answer showed: {answerShowed}</p>
          <p>Answer showed %:
            {(100 * answerShowed / totWords).toFixed(2)}
          </p>
          <br/>
          <br/>
        </div>
      )
    })}

  </div>)
};

export default Stats;

interface StatsProps {
}

import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {PartOfSpeech, Word} from '../../models';
import {generateActionAddWordStats} from '../store/actions';
import {ButtonClick} from "../API";

interface Stats {
  dialogId: string,
  pos: PartOfSpeech,
  wordId: string,
  firstHintShowed: boolean,
  secondHintShowed: boolean,
  answerShowed: boolean,
  word: Word,
  buttonClicks: ButtonClick[],
}

type GenerateInitialStats = (args: { dialogId: string, word: Word }) => Stats;
const generateInitialStats: GenerateInitialStats = ({dialogId, word}) => {
  return {
    dialogId,
    pos: word.part_of_speech as PartOfSpeech,
    wordId: word.id,
    firstHintShowed: false,
    secondHintShowed: false,
    answerShowed: false,
    word,
    buttonClicks: [],
  };
}

type UseStatsTracker = (props: { isAdditionalWarningVisible: boolean, isAnswerVisible: boolean, phraseId: string, dialogId: string, word: Word }) => void;
const useStatsTracker: UseStatsTracker = ({
                                            isAdditionalWarningVisible,
                                            isAnswerVisible,
                                            word,
                                            phraseId,
                                            dialogId
                                          }) => {
  const [stats, setStats] = useState(generateInitialStats({dialogId, word}));
  const dispatch = useDispatch();

  useEffect(() => {
    setStats({...stats, firstHintShowed: true});
  }, []);

  useEffect(() => {
    if (isAdditionalWarningVisible) {
      setStats({...stats, secondHintShowed: true});
    }
  }, [isAdditionalWarningVisible]);

  useEffect(() => {
    isAnswerVisible && setStats({...stats, answerShowed: true});
  }, [isAnswerVisible]);

  useEffect(() => {
    return () => {
      dispatch(generateActionAddWordStats(dialogId, phraseId, word, stats.firstHintShowed, stats.secondHintShowed, stats.answerShowed));
    };
  }, [stats]);
};

export default useStatsTracker;

import React, {FC, useEffect, useState} from 'react';
import {PartOfSpeech} from "../../../models";
import ProgressBar from "./ProgressBar";
import styles from './styles.module.css';
import {convertPOSInItalian} from "../../utils/dataParser";

const POS_LIST: PartOfSpeech[] = [PartOfSpeech.VERB, PartOfSpeech.NOUN, PartOfSpeech.ADJECTIVE, PartOfSpeech.ARTICLE];

const PosProgress: FC<PosProgressProps> = ({posProgress, dialogId}) => {
  // const dialog = useSelector((state: Store) => state.dialogs.get(dialogId));
  const [done, setDone] = useState<PartOfSpeech[]>([]);
  const [notDone, setNotDone] = useState<PartOfSpeech[]>();

  useEffect(() => {
    const done = posProgress.has(dialogId) ? [...posProgress.get(dialogId)!.values()] : [];
    const notDone = POS_LIST.filter(p => !done.includes(p));
    setDone(done);
    setNotDone(notDone);
  }, []);

  return (
    <>
      <div key={dialogId}>
        <ProgressBar value={done.length}/>
        <div className={styles.posList}>
          {done && done.map(pos => (
            <div key={pos} className={styles.posDone}>{convertPOSInItalian(pos).toUpperCase()}</div>
          ))}
          {notDone && notDone.map(pos => (
            <div key={pos}>{convertPOSInItalian(pos).toUpperCase()}</div>
          ))}
        </div>
      </div>
    </>
  )
};

export default PosProgress;

interface PosProgressProps {
  posProgress: POSProgress,
  dialogId: DialogID
}

export type POSProgress = Map<DialogID, Set<PartOfSpeech>>;

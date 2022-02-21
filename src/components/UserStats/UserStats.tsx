import React, {FC, useEffect, useState} from 'react';
import ChartOverallCompletedExercise, {BarChartData} from "../graphics/ChartOverallCompletedExercise";
import {getProblematicPosOrderedByInteractions} from "../DialogStatsSection/utils";
import {convertPOSInItalian} from "../../utils/dataParser";
import {PartOfSpeech, Stats} from "../../../models";
import styles from "../../../styles/User.module.css";
import DialogStatsSection from "../DialogStatsSection";
import {AmplifySignOut} from "@aws-amplify/ui-react-v1";
import {
  generateBarChartDataList,
  generateStatsForDialog,
  StatsForDialog
} from "../../utils/chartDataGenerators";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "../../store";
import {DataStore} from "aws-amplify";
import useDialogsHandler from "../../hook/useDialogsHandler";
import {PartialUserData} from "../../store/userDataReducer";

const UserStats: FC<UserStatsProps> = ({user}) => {
  const dispatch = useDispatch();
  const [statsShowed, setStatsShowed] = useState<DialogID>()
  const [progressForPos, setProgressForPos] = useState<BarChartData[]>();
  const [statsForDialog, setStatsForDialog] = useState<StatsForDialog>();
  const [stats, setStats] = useState<Stats[]>();
  const dialogState = useSelector((state: Store) => state.dialogs);
  useDialogsHandler(dispatch);


  useEffect(() => {
    // console.log("stats", stats);
    if (stats && dialogState) {
      setProgressForPos(generateBarChartDataList(stats));
      setStatsForDialog(generateStatsForDialog(dialogState, stats))
    }
  }, [stats, dialogState])

  useEffect(() => {
    if (user) {
      DataStore.query(Stats, (s) => s.userID("eq", user.id))
        .then((result: Stats[]) => {
          setStats(result)
        });
    }
  }, [user])

  return (
    <>
      <h3>
        {`Ciao ${user ? user.name : ''}`}
      </h3>

      {progressForPos && <ChartOverallCompletedExercise key={"barchart"} data={progressForPos}/>}
      <div>
        <h2>Hai avuto più problemi con:</h2>
        <small>(in ordine decrescente)</small>
        <ul>
          {stats && getProblematicPosOrderedByInteractions(stats).map(pos =>
            <li key={pos}>{convertPOSInItalian(pos as PartOfSpeech).toUpperCase()}</li>)}
        </ul>
      </div>
      <div className={styles.dialogsStatsCharts}>
        {statsForDialog && [...statsForDialog.keys()].map(dialogId =>
          statsForDialog.has(dialogId) && <DialogStatsSection
                key={dialogId}
                dialogStats={statsForDialog.get(dialogId)!}
                dialogId={dialogId}
                statsShowed={statsShowed}
                posList={[...statsForDialog.get(dialogId)!.keys()]}
                toggleStatsShowed={() => statsShowed === dialogId ? setStatsShowed(undefined) : setStatsShowed(dialogId)}/>)}
      </div>
      <div className={styles.logoutButton}>
        <AmplifySignOut/>
      </div>
    </>
  )
};

export default UserStats;

interface UserStatsProps {
  user: PartialUserData
}

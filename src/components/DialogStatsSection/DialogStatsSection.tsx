import React, {FC, useEffect, useState} from 'react';
import {PartOfSpeech, Stats} from "../../../models";
import {Button} from "@mui/material";
import {convertPOSInItalian} from "../../utils/dataParser";
import ExercisesStats from "../graphics/ExercisesStats";
import {
  generatePosProgressForEachDialog,
} from "../../utils/chartDataGenerators";
import {useSelector} from "react-redux";
import {Store} from "../../store";
import ProblematicWords from "./ProblematicWords";
import {DialogUI} from "../../store/dialogReducer";

const DialogStatsSection: FC<DialogStatsSectionProps> = (
  {
    dialogId, statsShowed, toggleStatsShowed, dialogStats, posList
  }) => {
  const dialogState = useSelector((state: Store) => state.dialogs);
  const [dialog, setDialog] = useState<DialogUI>();

  useEffect(() => {
    if (dialogState) {
      setDialog(dialogState.get(dialogId)!)
    }
  }, [dialogState]);


  return (
    <>
      <h1>{dialogState.get(dialogId)!.title}
        <Button
          variant={"contained"}
          onClick={toggleStatsShowed}
          style={{marginLeft: 20}}>{statsShowed === dialogId ? "Nascondi" : "Mostra"} statistiche</Button>
      </h1>
      {statsShowed === dialogId && dialogStats && posList && posList.map(pos => {
        const posStats = dialogStats.get(pos)!;
        return (
          <div key={pos}>
            <h2 style={{textTransform: "capitalize"}}>{convertPOSInItalian(pos)}</h2>
            <ExercisesStats
              key={pos}
              data={generatePosProgressForEachDialog(dialogState, posStats, pos)}
            />
            {dialog && <ProblematicWords posStats={posStats} phrases={dialog.phrases}/>}
          </div>)
      })}
    </>)

};

export default DialogStatsSection;

interface DialogStatsSectionProps {
  dialogId: DialogID,
  statsShowed?: string,
  toggleStatsShowed: () => void,
  dialogStats: Map<PartOfSpeech, Stats[]>,
  posList: PartOfSpeech[]
}

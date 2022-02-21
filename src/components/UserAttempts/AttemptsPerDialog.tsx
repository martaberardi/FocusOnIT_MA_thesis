import React, {FC} from 'react';
import HighlightedProblematicWordInPhrase
  from "../HighlightedProblematicWord/HighlightedProblematicWord";
import {WordStats} from "../../../models";
import {useSelector} from "react-redux";
import {Store} from "../../store";
import {Button} from "@mui/material";

const AttemptsPerDialog: FC<AttemptsPerDialogProps> = ({
                                                         dialogId,
                                                         wordsStats,
                                                         openDialogId,
                                                         setOpenDialogId,
                                                         index,
                                                       }) => {
  const dialog = useSelector((state: Store) => state.dialogs.get(dialogId));

  if (!dialog) {
    return <></>
  }

  return (
    <div key={dialogId}>
      <h1>
        {dialog.title}
        <Button
          variant={"contained"}
          onClick={() => setOpenDialogId((dialogId + index) === openDialogId ? "" : dialogId + index)}
          style={{marginLeft: 20}}>{openDialogId === (dialogId + index) ? "Nascondi" : "Mostra"} tentativi</Button>

      </h1>
      {(dialog.id + index) === openDialogId && wordsStats.filter(({
                                                                    firstHintShowed,
                                                                    phraseId
                                                                  }) => firstHintShowed)
        .map(({word, buttonClicks, phraseId}) => (
          <div>
            <div>
              <span style={{color: "green"}}>({word.form})</span>
              <HighlightedProblematicWordInPhrase
                phrase={dialog.phrases.find(({id}) => phraseId === id)!}
                wordId={word.id}
              />
            </div>
            <ol style={{marginLeft: 30}}>
              {buttonClicks
                .filter(({userInput}) => userInput !== word.form)
                .map(({userInput, isoDateTime}) => (
                  <li key={isoDateTime}>
                    <span style={{color: "red"}}>"{userInput}"</span>
                  </li>
                ))}
            </ol>
          </div>
        ))}
    </div>
  )
};

export default AttemptsPerDialog;

interface AttemptsPerDialogProps {
  dialogId: DialogID,
  wordsStats: WordStats[],
  openDialogId: DialogID,
  setOpenDialogId: (dialogId: DialogID) => void,
  index: number
}

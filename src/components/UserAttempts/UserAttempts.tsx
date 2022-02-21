import React, {FC, useEffect, useState} from 'react';
import {DataStore} from "aws-amplify";
import {Stats} from "../../../models";
import {PartialUserData} from "../../store/userDataReducer";
import AttemptsPerDialog from "./AttemptsPerDialog";

const UserAttempts: FC<UserAttemptsProps> = ({user}) => {
  const [stats, setStats] = useState<Stats[]>();
  const [openDialogId, setOpenDialogId] = useState("");

  useEffect(() => {
    if (user) {
      DataStore.query(Stats, (s) => s.userID("eq", user.id))
        .then((result: Stats[]) => {
          setStats(result)
        });
    }
  }, [user]);

  return (
    <div>
      <p>UserAttempts component!</p>
      {stats?.map(({dialogId, wordsStats}, index) => (
        <AttemptsPerDialog
          dialogId={dialogId}
          wordsStats={wordsStats}
          openDialogId={openDialogId}
          setOpenDialogId={setOpenDialogId}
          index={index}
        />
      ))}
    </div>
  )
};

export default UserAttempts;

interface UserAttemptsProps {
  user: PartialUserData

}

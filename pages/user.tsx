import React, {FC} from 'react';
import {withAuthenticator} from '@aws-amplify/ui-react';
import {useDispatch, useSelector} from "react-redux";
import {Store} from "../src/store";
import UserStats from "../src/components/UserStats";
import useUserHandler from "../src/hook/useUserHandler";
import usePageTracker from "../src/hook/usePageTracker";

const User: FC<UserProps> = function () {
  const dispatch = useDispatch();
  const user = useSelector((store: Store) => store.userData.user);
  const [userPageViews] = usePageTracker(dispatch);
  useUserHandler(dispatch);

  return (
    <>
      <p style={{maxWidth: 800, textAlign: "center", margin: "auto"}}>Consulta questa pagina per
        informazioni sulla tua performance e sul tuo progresso.</p>
      {user ? <UserStats user={user}/> : <></>}
      <p style={{textAlign: "center"}}>Numero di visualizzazioni della pagina
        Utente: {userPageViews}</p>
    </>)
};

export default withAuthenticator(User);

interface UserProps {
}

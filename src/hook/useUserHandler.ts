import {useEffect} from "react";
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";
import {CognitoUser} from "amazon-cognito-identity-js";
import {generateActionSetUser} from "../store/actions";
import {Auth} from "aws-amplify";
import {Dispatch} from "redux";

const useUserHandler = (dispatch: Dispatch) => {
  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      if (nextAuthState === AuthState.SignedIn && typeof authData !== "undefined") {
        (authData as CognitoUser).getUserAttributes((err, attributes) => {
          const id = attributes?.find(({Name}) => Name === "sub")?.Value;
          const name = attributes?.find(({Name}) => Name === "name")?.Value;
          id && name && dispatch(generateActionSetUser(id, name));
        })
      }
      if (!authData) {
        console.log('user is not signed in...');
      }
    });

    Auth.currentAuthenticatedUser({
      bypassCache: true
    }).then((user: CognitoUser) => {
      user.getUserAttributes((err, attributes) => {
        const id = attributes?.find(({Name}) => Name === "sub")?.Value;
        const name = attributes?.find(({Name}) => Name === "name")?.Value;
        id && name && dispatch(generateActionSetUser(id, name));
      })
    })
      .catch(err => console.log(err));
  }, []);
}

export default useUserHandler;

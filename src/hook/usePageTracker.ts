import {useEffect, useState} from "react";
import useUserHandler from "./useUserHandler";
import {useSelector} from "react-redux";
import {Store} from "../store";
import {User} from "../../models";
import {DataStore} from "aws-amplify";
import {Dispatch} from "redux";

const usePageTracker = (dispatch: Dispatch) => {
  const user = useSelector((store: Store) => store.userData.user);
  const [userPageViews, setUserPageViews] = useState(0);
  useUserHandler(dispatch);

  useEffect(() => {
      if (user) {
        console.log("RUN")
        const saveView = async (originalUser: User) => {
          const updatedUser = await DataStore.save(
            User.copyOf(originalUser, userToUpdate => {
              userToUpdate.userPageViews = (userToUpdate.userPageViews || 0) + 1;
            }));

          setUserPageViews(updatedUser.userPageViews!);
        }

        DataStore.query(User, (u) => u.cognitoId("eq", user.id))
          .then(result => {
              if (result.length > 0) {
                const originalUser = result[0];
                if (originalUser) {
                  saveView(originalUser);
                }
              }
            }
          );
      }
    }
    , [user])

  return [userPageViews];
}

export default usePageTracker;

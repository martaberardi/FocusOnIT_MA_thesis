import {useEffect} from "react";
import {Dispatch} from "redux";
import {DataStore} from "@aws-amplify/datastore";
import {Dialog} from "../../models";
import {generateActionInitializeDialogs} from "../store/actions";

const useDialogsHandler = (dispatch: Dispatch) => {
  useEffect(() => {
    DataStore.query(Dialog).then((dialogsDB) => {
      if (dialogsDB.length > 0) {
        dispatch(generateActionInitializeDialogs(dialogsDB));
      }
    })
  }, [])
}

export default useDialogsHandler;

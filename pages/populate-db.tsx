import React, {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import {API, Auth, DataStore} from 'aws-amplify';
import {AuthState, onAuthUIStateChange} from '@aws-amplify/ui-components';
import {withAuthenticator} from '@aws-amplify/ui-react';
import {useDispatch} from 'react-redux';
import {Button, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import parseDialogForDB from '../src/parseDialogForDB';
import {Dialog, Topic} from '../models';
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api-graphql";
import {createDialog} from "../src/graphql/mutations";
import styles from '../styles/PopulateDB.module.css';

const cardTypes: Topic[] = [
  Topic.APPUNTAMENTO,
  Topic.CIBO,
  Topic.DESCRIZIONE_FISICA,
  Topic.DOTTORE,
  Topic.EMOZIONI_E_SALUTE,
  Topic.INFORMAZIONI_PERSONALI,
  Topic.LAVORO,
  Topic.MERCATO,
  Topic.MEZZI,
  Topic.SPESA,
  Topic.TEMPO_LIBERO,
];

const PopulateDb: FC = function () {
  const [dbStatus, setDbStatus] = useState<DBStatus>('Not Populated');
  const [totRows, setTotRows] = useState(0);
  const [name, setName] = useState<string>();
  const [fileReader] = useState(new FileReader());
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [exerciseUrl, setExerciseUrl] = useState('');
  const [exerciseTopic, setExerciseTopic] = useState<Topic>(Topic.MEZZI);
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>();
  const dispatch = useDispatch();
  const inputFileRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  useEffect(() => {
    DataStore.query(Dialog).then((dialogs) => {
      if (dialogs.length > 0) {
        setDbStatus('Populated');
        setTotRows(dialogs.length);
      }
    }).catch(console.error);

    return onAuthUIStateChange((nextAuthState, authData) => {
      if (nextAuthState === AuthState.SignedIn) {
        Auth.userAttributes(authData).then((attrs) => {
          setName(attrs.find(({Name}) => Name === 'name')?.getValue());
        });
      }
      if (!authData) {
        console.log('user is not signed in...');
      }
    });
  }, []);

  const handleFileChosen = (file: Blob) => {
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const handleFileRead = async (e: ProgressEvent<FileReader>) => {
    setFileContent(fileReader.result)

  };

  const save = async () => {
    if (typeof fileContent === 'string'
      && exerciseTitle.trim().length > 0
      && exerciseUrl.trim().length > 0
      && !!exerciseTopic) {
      setDbStatus('Populating...');

      const newDialog = parseDialogForDB(exerciseTitle, exerciseTopic, exerciseUrl, fileContent);
      const createResult = await API.graphql({
        query: createDialog,
        variables: {input: newDialog},
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      setDbStatus('Populated');
      reset();

      // DataStore.save(new Dialog(newDialog))
      //   .then((updateDialog) => {
      //     dispatch(generateActionAddDialog(newDialog));
      //     setDbStatus('Populated');
      //   }).catch(console.error);

    } else if (typeof fileContent !== 'string') {
      alert('File content invalid');
    } else if (exerciseTitle.trim().length === 0) {
      alert('Exercise title missing');
    } else if (exerciseUrl.trim().length === 0) {
      alert('Exercise title missing');
    } else if (!exerciseTopic) {
      alert('Exercise topic missing');
    }
  }

  const reset = () => {
    setFileContent(undefined);
    setExerciseTitle('');
    setExerciseUrl('');
    // inputFileRef.current && (inputFileRef.current.value = "")
  }

  return (
    <div className="App">
      {name ? (
        <div>
          Hello
          {name}
        </div>
      ) : null}
      <h3>
        DB status:
        {dbStatus}
      </h3>
      <h4>
        Total rows:
        {totRows}
      </h4>

      {/* {dbStatus === 'Not Populated' */}
      {/*  ? <Form /> */}
      {/*  : null} */}
      <TextField label="Exercise Title"
                 type="text"
                 onChange={(e) => setExerciseTitle(e.target.value)}
                 value={exerciseTitle}
                 className={styles.textField}
      />
      <br/>
      <br/>
      <TextField label="Exercise Video Url"
                 type="url"
                 onChange={(e) => setExerciseUrl(e.target.value)}
                 value={exerciseUrl}
                 className={styles.textField}
      />
      <br/>
      <br/>
      <InputLabel id="topic">Topic</InputLabel>
      <Select labelId="topic" label="Topic" value={exerciseTopic}
              className={styles.textField}

              onChange={(e) => setExerciseTopic(e.target.value as Topic)}>
        {cardTypes.map((cardType) => <MenuItem key={cardType}
                                               value={cardType}>{cardType}</MenuItem>)}
      </Select>
      <br/>
      <br/>
      <input ref={inputFileRef} type="file" onChange={(e) => e.target.files && handleFileChosen(e.target.files[0])}/>
      <Button onClick={save} variant={"contained"}>Save</Button>
      <Button onClick={reset} variant={"contained"} color="error">Reset</Button>

    </div>
  );
};

export default withAuthenticator(PopulateDb);

type DBStatus = 'Not Populated' | 'Populating...' | 'Populated';

/*
* <iframe width="560" height="315" src="https://www.youtube.com/embed/D8AXL6HAwA4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/

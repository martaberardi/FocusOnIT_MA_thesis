import React, {FC, useEffect, useState} from 'react';
import {DataStore} from 'aws-amplify';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, Button, Card, CardMedia, Step, StepLabel, Stepper} from '@mui/material';
import {withAuthenticator} from '@aws-amplify/ui-react';
import {useRouter} from 'next/router';
import {Dialog, PartOfSpeech, PhraseStatus, Stats, User, WordStats} from '../../models';
import {generateActionAddDialog} from '../../src/store/actions';
import {Store} from '../../src/store';
import Phrase from '../../src/components/Phrase';
import useUserHandler from "../../src/hook/useUserHandler";
import Link from 'next/link';
import {WordUI} from "../../src/store/dialogReducer";
import Warnings from "../../src/components/Warnings";
import styles from "../../styles/Exercise.module.css";

const ExercisePage: FC = function () {
  const router = useRouter();
  const {dialogId} = router.query;
  const dialog = useSelector((store: Store) => typeof dialogId === "string" && "dialogs" in store ? store.dialogs.get(dialogId) : undefined);
  const dispatch = useDispatch();
  const [posExerciseFilter, setPosExerciseFilter] = useState<PartOfSpeech>();
  const [step, setStep] = useState<ExerciseStep>('video');
  const stats = useSelector((store: Store) => store.userData.stats);
  const user = useSelector((store: Store) => store.userData.user)
  const [statsSaved, setStatsSaved] = useState(false);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [wordWithHint, setWordWithHint] = useState<WordUI>();
  useUserHandler(dispatch);

  useEffect(() => {
    if (typeof dialogId === 'string') {
      if (!dialog) {
        DataStore.query(Dialog, (d) => d.id('eq', dialogId)).then((data) => {
          if (data.length > 0) dispatch(generateActionAddDialog(data[0]));
        }).catch(console.error);
      }
    }
  }, [dialogId]);

  useEffect(() => {
    if (posExerciseFilter) {
      setStep('exercise');
    }
  }, [posExerciseFilter]);

  useEffect(() => {
    if (typeof dialog !== "undefined") {
      setIsAllCompleted(!dialog.phrases.some(({status}) => status === PhraseStatus.TO_COMPLETE));

      setWordWithHint(
        dialog.phrases.find(({status}) => status === "TO_COMPLETE")?.words.find((w) => ('hint' in w && w.hint))
      );
    }
  }, [dialog])

  useEffect(() => {
    if (typeof dialog !== "undefined" && typeof dialogId === "string" && isAllCompleted && !statsSaved && user) {
      setStatsSaved(true);
      const dialog = stats[posExerciseFilter!][dialogId];
      const wordsStats: WordStats[] = [];
      dialog.forEach((wordStats) => {
        wordsStats.push(wordStats);
      });

      const newStats: Stats = new Stats({
        pos: posExerciseFilter as PartOfSpeech,
        dialogId,
        wordsStats,
        userID: user.id,
        savedAt: (new Date(Date.now())).toISOString(),
      })

      const saveStats = async () => {
        const usersFromDB: User[] = await DataStore.query(User);
        const currentUserFromDB = usersFromDB.find(({cognitoId}) => cognitoId === user.id);

        if (!currentUserFromDB) {
          const saveResult = await DataStore.save(new User(
            {
              name: user.name,
              cognitoId: user.id,
              Stats: []
            })).catch(console.error);
        }

        const saveResult = await DataStore.save(newStats).catch(console.error);
      }
      saveStats();
    }
  }, [isAllCompleted])

  if (!dialog || typeof dialogId !== 'string') {
    return <h1>No exercise</h1>;
  }

  const printPhrasesUntilUncompleted = () => {
    const phrases = [];
    for (let i = 0; i < dialog.phrases.length; i += 1) {
      const currentPhrase = dialog.phrases[i];
      phrases.push(currentPhrase);
      if (currentPhrase.status === PhraseStatus.TO_COMPLETE) {
        break;
      }
    }

    return phrases.map((phrase) => (
      <Phrase
        phrase={phrase}
        filter={posExerciseFilter!}
        dialogId={dialogId}
        key={phrase.id}
      />
    ));
  };

  const getStepContent = () => {
    if (step === 'video') {
      return (
        <>
          <h3>{dialog.title}</h3>
          <p style={{maxWidth: 800}}>Guarda il video quante volte desideri e poi scegli su quale
            parte del discorso
            vuoi focalizzarti.
          </p>
          <p>Clicca sul bottone “articoli” o “aggettivi” o “nomi” o “verbi”.</p>
          <Card sx={{width: "100%"}}>
            <CardMedia
              className={styles.video}
              component="iframe"
              src={dialog.videoUrl}
            />
          </Card>
          <div className="buttons">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setPosExerciseFilter(PartOfSpeech.ADJECTIVE)}
            >
              Aggettivi
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setPosExerciseFilter(PartOfSpeech.NOUN)}
            >
              Nomi
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setPosExerciseFilter(PartOfSpeech.VERB)}
            >
              Verbi
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setPosExerciseFilter(PartOfSpeech.ARTICLE)}
            >
              Articoli
            </Button>
          </div>
        </>
      );
    }
    return (
      <>
        <h3>{dialog.title}</h3>
        <div className="phrases">
          {posExerciseFilter && printPhrasesUntilUncompleted()}
        </div>
        <div>
          {wordWithHint &&
              <Warnings word={wordWithHint} dialogId={dialogId} phraseId={wordWithHint.phraseId}/>}
        </div>
      </>
    );
  };

  return (
    <div className="exercise-page">
      <Stepper
        sx={{width: "90%", marginTop: 5, marginBottom: 2, maxWidth: 500}}
        activeStep={step === 'video' ? 0 : 1}
      >
        <Step key="video">
          <StepLabel>
            Video
          </StepLabel>
        </Step>
        <Step key="exercise">
          <StepLabel>
            Esercizio
          </StepLabel>
        </Step>
      </Stepper>

      {step !== "video" && <Button variant={"contained"} onClick={() => {
        setStep("video");
        setPosExerciseFilter(undefined);
      }}>Indietro</Button>
      }
      <div style={{maxWidth: 800}}>
        <p>
          Completa gli spazi bianchi nei dialoghi con l’alternativa corretta.
        </p>
        <p>Dopo aver
          scritto la
          risposta, clicca la freccia blu. In caso di errore, il sistema ti mostrerà dei box
          informativi
          con informazioni che possono guidarti verso la risposta corretta.

          Ricordati di cliccare sempre la freccia dopo ogni modifica alla risposta.
        </p>
        <p>
          Una volta completato l’esercizio, il sistema ti avvertirà. Potrai decidere se
          farne un
          altro
          o consultare la sezione “Utente”.
        </p>
      </div>
      {getStepContent()}
      {isAllCompleted &&
          <>
              <Alert severity="success">Esercizio completato!</Alert>
              <p>Torna al <Link href="/">Menù</Link> per farne altri, o vai alla pagina <Link
                  href="/user">User</Link> per vedere le tue statistiche.</p>
          </>}
    </div>
  );
};

export default withAuthenticator(ExercisePage);

type ExerciseStep = 'video' | 'exercise';

function objectToMap(obj: { [key: string]: any }) {
  const map: Map<string, any> = new Map();

  Object.keys(obj).forEach((key: string) => map.set(key, obj[key]))

  return map;
}

import React, {FC} from 'react';
import TabsWrapper from "../src/components/TabsWrapper";

const Info: FC<InfoProps> = () =>
  (
    <TabsWrapper tabs={
      [{
        name: "Italiano",
        content: (
          <>
            <div>
              <h1>Informazioni e contatti</h1>
              <p>
                Focus on IT è stata realizzata da Marta Berardi nel 2022 per la tesi magistrale in
                Linguistica
                Computazionale all’Università di Tubinga.
              </p>
              <p>
                Per richiedere informazioni, si prega di scrivere al seguente indirizzo
                e-mail:&nbsp;
                <a href="mailto:focusonit.info@gmail.com">focusonit.info@gmail.com</a>
              </p>
              <h2>
                Istruzioni
              </h2>
              <p>
                Benvenuto/a/* nell’app Focus on IT!
                In questa web app puoi esercitarti sull’uso di quattro parti del discorso: articoli,
                nomi,
                aggettivi e verbi (indicativo presente).
              </p>
              <p>
                Come funziona l’app?
              </p>

              <h3>
                Menù
              </h3>
              <ol>
                <li>
                  Scegli una carta con un argomento che ti interessa.
                </li>
                <li>
                  Clicca sul bottone “esercizio”.
                </li>
                <li>
                  Guarda il video quante volte desideri e poi scegli su quale parte del discorso
                  vuoi
                  focalizzarti. Clicca sul bottone “articoli” o “aggettivi” o “nomi” o “verbi”.
                </li>
                <li>
                  Completa gli spazi bianchi nei dialoghi con l’alternativa corretta. Dopo aver
                  scritto la
                  risposta, clicca la freccia blu. In caso di errore, il sistema ti mostrerà dei box
                  informativi
                  con informazioni che possono guidarti verso la risposta corretta.
                  Ricordati di cliccare sempre la freccia dopo ogni modifica alla risposta.
                </li>
                <li>
                  Una volta completato l’esercizio, il sistema ti avvertirà. Potrai decidere se
                  farne un
                  altro
                  o consultare la sezione “Utente”.
                </li>
              </ol>

              <h3>
                Utente
              </h3>
              <p>
                Consulta questa pagina per informazioni sulla tua performance e sul tuo progresso.
              </p>
              <h3>
                Grammatica
              </h3>
              <p>
                Consulta questa pagina per schede informative sugli articoli, nomi, aggettivi e
                verbi.
                Studiare
                la grammatica non è mai stato più intuitivo!
              </p>
            </div>
          </>)
      },
        {
          name: "English",
          content: (
            <>
              <div>
                <h1>Information and contacts</h1>
                <p>
                  Focus on IT was created by Marta Berardi in 2022 for her Master's thesis in
                  Computational
                  Linguistics at the University of Tübingen.
                </p>
                <p>
                  For further enquiries, please write to the following e-mail address:&nbsp;
                  <a href="mailto:focusonit.info@gmail.com">focusonit.info@gmail.com</a>
                </p>

                <h2>
                  Instructions
                </h2>
                <p>
                  Welcome to the Focus on IT app!
                  In this web app, you can practise the use of four parts of speech: articles,
                  nouns,
                  adjectives
                  and verbs (present tense).
                </p>
                <p>
                  How does the app work?
                </p>

                <h3>
                  Main menu
                </h3>
                <ol>
                  <li>
                    Choose a card with a topic that interests you.
                  </li>
                  <li>
                    Click on the "exercise" button.
                  </li>
                  <li>
                    Watch the video as many times as you like and then choose which part of speech
                    you want to focus on.
                    Click on the "articles" or "adjectives" or "nouns" or "verbs" button.
                  </li>
                  <li>
                    Fill in the blanks in the dialogues with the correct alternative. After writing
                    your answer, click on the blue arrow.
                    In case of an error, the system will show you feedback boxes with
                    information that can guide you towards the correct answer.
                    Remember to always click on the blue arrow whenver you edit your answer.
                  </li>
                  <li>
                    When you have completed the exercise, the system will notify you. You can decide
                    whether to do another exercise or consult the "User" section.
                  </li>
                </ol>

                <h3>
                  User
                </h3>
                <p>
                  Consult this page for information about your performance and learning progress.
                </p>
                <h3>
                  Grammar
                </h3>
                <p>
                  Consult this page for information on articles, nouns, adjectives and verbs.
                  Studying grammar has never been more intuitive!
                </p>
              </div>
            </>)
        }]
    }/>
  );

export default Info;

interface InfoProps {
}

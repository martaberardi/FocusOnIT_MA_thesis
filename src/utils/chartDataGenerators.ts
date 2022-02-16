import {BarChartData} from "../components/graphics/ChartOverallCompletedExercise";
import {PartOfSpeech, Stats} from "../../models";
import {POSProgress} from "../components/PosProgress/PosProgress";
import {convertPOSInItalian} from "./dataParser";
import {DialogState} from "../store/dialogReducer";
import {ExercisesChartData} from "../components/graphics/ExercisesStats";
import {getDateTimeFromStats} from "./index";

export const generateBarChartDataList = (stats: Stats[]): BarChartData[] => {
  const progress: ProgressForPos = {
    [PartOfSpeech.VERB]: 0,
    [PartOfSpeech.NOUN]: 0,
    [PartOfSpeech.ADJECTIVE]: 0,
    [PartOfSpeech.ARTICLE]: 0,
  };

  const noDuplicationPos = generateStatsWithNoDialogDuplication(stats);

  noDuplicationPos.forEach((posList) => {
    posList.forEach((pos) => {
      progress[pos]++
    });
  });

  return Object.keys(progress).reduce((result, currentPos) => {
    const currentBarChartData: BarChartData = {
      name: convertPOSInItalian(currentPos as PartOfSpeech),
      Fatto: progress[currentPos],
    }
    result.push(currentBarChartData);
    return result;
  }, [] as BarChartData[])
}

export const generateStatsWithNoDialogDuplication = (stats: Stats[]) => stats
  .reduce((result, currentStats) => {
      if (!result.has(currentStats.dialogId)) {
        result.set(currentStats.dialogId, new Set<PartOfSpeech>());
      }
      result.get(currentStats.dialogId)!.add(currentStats.pos as PartOfSpeech);
      return result;
    },
    new Map() as POSProgress);




export const generatePosProgressForEachDialog = (dialogState: DialogState, stats: Stats[], pos: PartOfSpeech): ExercisesChartData[] => {
  const exerciseStats = stats.filter(s => s.pos === pos);

  return exerciseStats.reduce(
    (result, currentStats) => {
      const dateTime = getDateTimeFromStats(currentStats)
      result.push({
        name: dateTime,
        risposte_corrette_al_primo_tentativo: currentStats.wordsStats.filter(s => !s.firstHintShowed && !s.secondHintShowed && !s.answerShowed).length,
        risposte_corrette_dopo_il_primo_suggerimento: currentStats.wordsStats.filter(s => s.firstHintShowed && !s.secondHintShowed && !s.answerShowed).length,
        risposte_corrette_dopo_il_secondo_suggerimento: currentStats.wordsStats.filter(s => s.firstHintShowed && s.secondHintShowed && !s.answerShowed).length,
        risposte_corrette_suggerite_dal_sistema: currentStats.wordsStats.filter(s => s.firstHintShowed && s.secondHintShowed && s.answerShowed).length,
      });

      return result;
    },
    [] as ExercisesChartData[]
  );
}

export const generateStatsForDialog = (dialogs: DialogState, stats: Stats[]): StatsForDialog => {
  const statsForDialog = new Map();

  dialogs.forEach((dialog) => {
    const posStats = new Map<PartOfSpeech, Stats[]>();
    const articleStats = stats.filter(s => s.dialogId === dialog.id && s.pos === PartOfSpeech.ARTICLE);
    const adjectiveStats = stats.filter(s => s.dialogId === dialog.id && s.pos === PartOfSpeech.ADJECTIVE);
    const nounStats = stats.filter(s => s.dialogId === dialog.id && s.pos === PartOfSpeech.NOUN);
    const verbStats = stats.filter(s => s.dialogId === dialog.id && s.pos === PartOfSpeech.VERB);

    articleStats.length > 0 && posStats.set(PartOfSpeech.ARTICLE, articleStats);
    adjectiveStats.length > 0 && posStats.set(PartOfSpeech.ADJECTIVE, adjectiveStats);
    nounStats.length > 0 && posStats.set(PartOfSpeech.NOUN, nounStats);
    verbStats.length > 0 && posStats.set(PartOfSpeech.VERB, verbStats);

    statsForDialog.set(dialog.id, posStats);
  });

  return statsForDialog;
}

export type StatsForDialog = Map<DialogID, Map<PartOfSpeech, Stats[]>>

type RawFeatureKeys = "num" | "per" | "mod" | "ten" | "gen";
type FeatureDictionary = { [key in RawFeatureKeys]?: string };
type ButtonClick = { isoDateTime: string, userInput: string }
type DialogID = string;

interface ChartData {
  name: string,
}
type ProgressForPos = { [pos: string]: number }

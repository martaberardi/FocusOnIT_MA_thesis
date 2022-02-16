import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const ExercisesStats = ({data}: ExercisesStatsProps) => {
  return (
    <BarChart
      width={700}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
      barSize={20}
    >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="name"/>
      <YAxis/>
      <Tooltip/>
      <Legend layout="vertical"/>
      <Bar dataKey="risposte_corrette_al_primo_tentativo" stackId="column" fill="#82ca9d"/>
      <Bar dataKey="risposte_corrette_dopo_il_primo_suggerimento" stackId="column" fill="#8884d8"/>
      <Bar dataKey="risposte_corrette_dopo_il_secondo_suggerimento" stackId="column"
           fill="#ffc658"/>
      <Bar dataKey="risposte_corrette_suggerite_dal_sistema" stackId="column" fill="#000"/>
    </BarChart>
  );
}

export default ExercisesStats;

interface ExercisesStatsProps {
  data: ExercisesChartData[],
}

export interface ExercisesChartData extends ChartData {
  risposte_corrette_al_primo_tentativo: number,
  risposte_corrette_dopo_il_primo_suggerimento: number,
  risposte_corrette_dopo_il_secondo_suggerimento: number,
  risposte_corrette_suggerite_dal_sistema: number,
}


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

const ChartOverallCompletedExercise = ({data}: BarChartProps) => {
  if (data.length === 0) {
    return <></>
  }
  console.log(data)

  return (
    <>
      <h1>Esercizi completati</h1>
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{left: 70, right: 70}}/>
        <YAxis domain={[0, 10]} ticks={Array.from({length: 10}, (v, i) => i + 1)}/>
        <Tooltip/>
        <CartesianGrid strokeDasharray="10 10"/>
        <Bar dataKey="Fatto" fill="#8884d8" background={{fill: "#eee"}}/>
      </BarChart>
    </>
  );
}

export default ChartOverallCompletedExercise;

interface BarChartProps {
  data: BarChartData[]
}

export interface BarChartData extends ChartData {
  Fatto: number
}


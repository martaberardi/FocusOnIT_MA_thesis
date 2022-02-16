// MIN = Minimum expected value
// MAX = Maximium expected value
// Function to normalise the values (MIN / MAX could be integrated)
import {LinearProgress} from "@mui/material";
import {FC} from "react";

const MIN = 0;
const MAX = 4;


const ProgressBar: FC<ProgressBarProps> = ({value}) => {
  const normalise = () => ((value - MIN) * 100) / (MAX - MIN);

  return (
    <LinearProgress variant="determinate" value={normalise()}/>
  )
}

interface ProgressBarProps {
  value: number
}


export default ProgressBar;

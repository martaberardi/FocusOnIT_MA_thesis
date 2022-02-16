import React, {FC} from 'react';
import {Button} from "@mui/material";

const AnswerButton: FC<AnswerButtonProps> = ({setIsAnswerVisible}) => (
  <Button
    variant="outlined"
    color="inherit"
    size="small"
    onClick={() => {
      setIsAnswerVisible(true);
    }}
  >
    Mostra risposta
  </Button>
);

export default AnswerButton;

interface AnswerButtonProps {
  setIsAnswerVisible: (isVisible: boolean) => void

}

import React, {FC} from "react";
import {Button} from "@mui/material";

const AdditionalWarningButton: FC<AdditionalWarningButtonProps> =
  ({setIsAdditionalWarningVisible}) => (
    <Button
      variant="outlined"
      color="inherit"
      size="small"
      onClick={() => {
        setIsAdditionalWarningVisible(true);
      }}
    >
      +
    </Button>
  )

export default AdditionalWarningButton;

interface AdditionalWarningButtonProps {
  setIsAdditionalWarningVisible: (isVisible: boolean) => void
}

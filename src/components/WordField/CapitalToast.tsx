import React, {FC} from "react";
import {Snackbar, Alert} from "@mui/material";

const CapitalToast: FC<CapitalToastProps> = ({isOpen, setIsOpen}) =>
  (
    <Snackbar className="snack" open={isOpen} autoHideDuration={5000}
              onClose={() => setIsOpen(false)}>
      <Alert
        elevation={6}
        variant="filled"
        onClose={() => setIsOpen(false)}
        severity="warning"
        sx={{width: '100%'}}
      >
        Attenzione: la parola inizia con una maiuscola!
      </Alert>
    </Snackbar>
  )

export default CapitalToast;

interface CapitalToastProps {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
}

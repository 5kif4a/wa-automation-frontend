import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { createMailingTask } from "api/common.api";
import React, { useState } from "react";
import theme from "theme";
import styles from "./App.module.scss";
import { nanoid } from "nanoid";
import ClearIcon from "@mui/icons-material/Clear";
import PhoneIcon from "@mui/icons-material/Phone";
import AddIcon from "@mui/icons-material/Add";

interface PhoneNumber {
  id: string;
  number: string;
}

function App() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [text, setText] = useState("");
  const [requesting, setRequesting] = useState(false);

  const [error, setError] = useState("");

  const addPhoneNumber = () => {
    setPhoneNumbers([
      ...phoneNumbers,
      {
        id: nanoid(),
        number: "",
      },
    ]);
  };

  const handleChangePhoneNumber = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    setPhoneNumbers((prevState) =>
      prevState.map((p) =>
        p.id === id
          ? {
              ...p,
              number: event.target.value,
            }
          : p
      )
    );
  };

  const deletePhoneNumber = (id: string) => {
    setPhoneNumbers((prevState) => prevState.filter((p) => p.id !== id));
  };

  const send = () => {
    setRequesting(true);

    createMailingTask({
      phone_numbers: phoneNumbers.map((p) => p.number),
      text,
    })
      .then(() => {})
      .catch((err) => {})
      .finally(() => {
        setRequesting(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={styles.root}>
        <Typography variant="h2">WhatsApp Automation</Typography>

        <Box className={styles.form}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the mailing list text"
            multiline
            rows={5}
          />
          {phoneNumbers.map((p) => (
            <TextField
              key={p.id}
              value={p.number}
              onChange={(e) => handleChangePhoneNumber(e, p.id)}
              placeholder="Enter phone number"
              inputProps={{ inputMode: "tel" }}
              InputProps={{
                startAdornment: <PhoneIcon />,
                endAdornment: (
                  <IconButton onClick={() => deletePhoneNumber(p.id)}>
                    <ClearIcon />
                  </IconButton>
                ),
              }}
            />
          ))}

          <Button variant="contained" onClick={addPhoneNumber}>
            <AddIcon />
            Add phone phone
          </Button>
          <LoadingButton
            variant="contained"
            loading={requesting}
            onClick={send}
          >
            Send
          </LoadingButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';

export default function UserInputSection({ setUserInput }) {
  const [date, setDate] = useState();
  const [address, setAddress] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    setUserInput({
      "date": moment(date).unix(),
      "address": address?.toLowerCase()
    });
  }

  const isAddress = (address) => {
    const re = new RegExp("^(0x)?[0-9a-f]{40}$", "i")
    return re.test(address);
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '25ch', m: '10px' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="addressInput"
        label="Address"
        variant="outlined"
        error={!isAddress(address)}
        onChange={e => setAddress(e.target.value)}
      />

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Date"
          value={date}
          onChange={newDate => setDate(newDate)}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Button disabled={!isAddress(address)} variant="contained" type="submit"> Submit </Button>
    </Box>
  );
}

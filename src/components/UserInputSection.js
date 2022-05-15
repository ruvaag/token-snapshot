import moment from 'moment';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import config from "../utils/chainConfigs";

export default function UserInputSection({ setUserInput }) {
  const [date, setDate] = useState();
  const [chainId, setChainId] = useState("1");
  const [address, setAddress] = useState();

  const handleChainChange = e => setChainId(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    setUserInput({
      "chainId": chainId,
      "date": moment(date).unix(),
      "address": address?.toLowerCase(),
      "chainName": config[chainId].name,
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
        '& > :not(style)': { m: '10px' },
        m: '2px',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        select
        id="chain"
        label="Chain"
        value={chainId}
        sx={{ width: '15ch' }}
        onChange={handleChainChange}
      >
        {Object.keys(config).map((id) =>
          <MenuItem key={id} value={id}> {config[id].name} </MenuItem>
        )}
      </TextField>

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          id="date"
          label="Date"
          value={date}
          onChange={newDate => setDate(newDate)}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>

      <TextField
        id="addressInput"
        label="Address"
        variant="outlined"
        error={!isAddress(address)}
        sx={{ width: '43ch' }}
        onChange={e => setAddress(e.target.value)}
      />

      <Button
        disabled={!isAddress(address)}
        variant="contained"
        type="submit"
      >
        Submit
      </Button>
    </Box>
  );
}

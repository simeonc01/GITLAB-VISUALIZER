import * as React from 'react';
import { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function ResponsiveDateRangePicker() {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([dayjs(localStorage.getItem("startDate")), dayjs(localStorage.getItem("endDate"))]);

  
  useEffect(() => {
    if (localStorage.getItem("startDate") == "Invalid Date" || localStorage.getItem("endDate") == "Invalid Date" ) {
      setValue([null, null]);
    }
  }, []);


  useEffect(() => {
    const startDate = value[0]?.toDate().toDateString();
    const endDate = value[1]?.toDate().toDateString()

    if (startDate !== undefined && endDate !== undefined) {
        localStorage.setItem("startDate", startDate);
        localStorage.setItem("endDate", endDate);
    }
  }, [value]);


  return (
    <Stack spacing={3}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{ start: 'Startdato', end: 'Sluttdato' }}
      >
        <MobileDateRangePicker
          
          value={value}
          disableFuture={true}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> til </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
      
    </Stack>
  );
}

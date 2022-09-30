import * as React from 'react';
import { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';



export default function Filter() {

  const [startDate, setStartDate] = React.useState<Dayjs | null>(
    dayjs(sessionStorage.getItem("startDate")),
  );
  const [endDate, setEndDate] = React.useState<Dayjs | null>(
    dayjs(sessionStorage.getItem("endDate")),
  );

    
  useEffect(() => {
    if (sessionStorage.getItem("startDate") == "Invalid Date" || sessionStorage.getItem("endDate") == "Invalid Date" ) {
        setStartDate(null);
        setEndDate(null);
    }
  }, []);

  
  useEffect(() => {
    const startDateValue = startDate?.toDate().toDateString();
    const endDateValue = endDate?.toDate().toDateString();

    if (startDateValue !== undefined && startDate !== undefined && endDate !== undefined && endDateValue !== undefined) {
        if (endDate?.isBefore(startDate)) {
          setStartDate(endDate);
          setEndDate(startDate);
          return;
        }
        sessionStorage.setItem("startDate", startDateValue);
        sessionStorage.setItem("endDate", endDateValue);
    }
  }, [startDate, endDate]); 


  const handleChangeStartDate = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };


  const handleChangeEndDate = (newValue: Dayjs | null) => {
    setEndDate(newValue);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
      <DesktopDatePicker
          label="Startdato"
          inputFormat="DD/MM/YYYY"
          value={startDate}
          onChange={handleChangeStartDate}
          disableFuture={true}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="Sluttdato"
          inputFormat="DD/MM/YYYY"
          value={endDate}
          onChange={handleChangeEndDate}
          disableFuture={true}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
import * as React from 'react';
import { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Container from './LayoutContainer';



export default function Filter() {

  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(sessionStorage.getItem("startDate")),);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(sessionStorage.getItem("endDate")),);

  const [resetOption, setResetOption] = React.useState(false);

    
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
        if (sessionStorage.getItem("startDate") !== "Invalid Date" || sessionStorage.getItem("endDate") !== "Invalid Date") {
          setResetOption(true)
        }
    }
  }, [startDate, endDate]); 


  const handleChangeStartDate = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };


  const handleChangeEndDate = (newValue: Dayjs | null) => {
    setEndDate(newValue);
  };

  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
    sessionStorage.removeItem("startDate");
    sessionStorage.removeItem("endDate");
    setResetOption(false)
  };


  return (
    <Container ignoreHeightWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" spacing={4}>
        <DesktopDatePicker
            
            label="Start date"
            inputFormat="DD/MM/YYYY"
            value={startDate}
            onChange={handleChangeStartDate}
            disableFuture={true}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="End date"
            inputFormat="DD/MM/YYYY"
            value={endDate}
            onChange={handleChangeEndDate}
            disableFuture={true}
            renderInput={(params) => <TextField {...params} />}
          />
          {resetOption && <Button onClick={resetDates} variant="outlined" startIcon={<DeleteIcon />}>
            Nullstill
          </Button> }
        </Stack>
      </LocalizationProvider>
    </Container>
  );
}
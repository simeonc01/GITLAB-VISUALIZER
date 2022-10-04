import React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { GitLabContext } from './GitlabProvider';
import { IContextDefault } from '../util/types';
import Container from './LayoutContainer';
export default class Filter extends React.Component<any, any> {

  static contextType: typeof GitLabContext = GitLabContext;

  state = {
    startDate: null,
    endDate: null,
    resetOption: false
  }

  constructor(props: unknown) {
    super(props);
  }

  componentDidMount(): void {
      const start = sessionStorage.getItem("startDate");
      const end = sessionStorage.getItem("endDate");

      if (start !== null && end !== null)
        this.setState({startDate: start, endDate: end});
      else if (start !== null) 
          this.setState({startDate: start});
      else if (end !== null) 
        this.setState({endDate: end});
      if (start !== null && end !== null)
        this.setState({resetOption: true});
  }
  
  componentDidUpdate(prevProp: Readonly<any>, prevState: Readonly<any>): void {
    if (prevState.startDate === this.state.startDate && prevState.endDate === this.state.endDate && prevState.resetOption === this.state.resetOption) return;
    this.updateContext(this.state.startDate, this.state.endDate);
    if (this.state.startDate !== null || this.state.endDate !== null)
      this.setState({resetOption: true});
  }
  
  updateContext(startDate: Date | null, endDate: Date | null) {
    const c: IContextDefault = this.context as IContextDefault;
    c.setFilter(startDate, endDate);
  }

  handleChangeStartDate(value: Dayjs | null): void {
    if (value !== null) {
      this.setState({startDate: value.toISOString()})
      sessionStorage.setItem("startDate", value.toISOString())
    }
  }

  handleChangeEndDate(value: Dayjs | null): void {
    if (value !== null) {
      this.setState({endDate: value.toISOString()});
      sessionStorage.setItem("endDate", value.toISOString())
    }
  }
 
  resetDates(): void {
    this.setState({resetOption: false, startDate: null, endDate: null});
    sessionStorage.removeItem("startDate");
    sessionStorage.removeItem("endDate");
    const c: IContextDefault = this.context as IContextDefault;
    c.setFilter(null, null);
  }

  render () {
    return (
      <Container ignoreHeightWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" spacing={4}>
          <DesktopDatePicker
              label="Start Date"
              inputFormat="DD/MM/YYYY"
              value={this.state.startDate}
              onChange={this.handleChangeStartDate.bind(this)}
              disableFuture={true}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="End Date"
              inputFormat="DD/MM/YYYY"
              value={this.state.endDate}
              onChange={this.handleChangeEndDate.bind(this)}
              disableFuture={false}
              renderInput={(params) => <TextField {...params} />}
            />
            {this.state.resetOption && <Button onClick={this.resetDates.bind(this)} variant="outlined" startIcon={<DeleteIcon />}>
              Reset
            </Button> }
          </Stack>
        </LocalizationProvider>
      </Container>
    )
  }
}

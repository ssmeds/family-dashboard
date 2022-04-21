import './week.css'
import moment from 'moment/min/moment-with-locales'

console.log('veckonummer', moment().weeks());
let thisWeekNr = moment().weeks();

//Since the americans start their weeks with sunday I have to subtract one from the week number if the day index is 0 (sunday)
if (moment().day() === 0) {
  thisWeekNr--
}
console.log('thisWeekNr', thisWeekNr);
const Week = () => {
  return (
    <div className="weekDisplay">v. <span id='weekNr'>{thisWeekNr}</span></div>
  )
}
export default Week

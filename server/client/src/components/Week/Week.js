import './week.css'
// import moment from 'moment'
import moment from 'moment/min/moment-with-locales'

// moment().format()
let weekNow = moment().isoWeeks(Number);
// console.log(weekNow);
console.log('veckonummer', moment().weeks());
let thisWeekNr = moment().weeks();
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

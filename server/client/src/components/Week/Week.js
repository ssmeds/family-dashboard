import './week.css'
// import moment from 'moment'
import moment from 'moment/min/moment-with-locales'

// moment().format()
let weekNow = moment().isoWeeks(Number);
// console.log(weekNow);
console.log('veckonummer', moment().weeks());
let thisWeekNr = moment().weeks();

const Week = () => {
  return (
    <div>v. {thisWeekNr}</div>
  )
}
export default Week

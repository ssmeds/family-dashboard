import './homework.css'
import Week from '.././Week/Week'

const Homework = () => {
  return (
    <div className="homework-container card">
      <h1>Läxor</h1>
      <Week />
      <ul>
        <li className="homework-item"><span className="homework-subject">Engelska -</span>Skriv fem maträtter</li>
        <li className="homework-item"><span className="homework-subject">Svenska -</span>Läs 5 gånger och skriv det viktigaste från texten</li>
      </ul>
      <form action="">
        <input type="text" name="" id="" placeholder="Fyll i läxan här..." />
        <select name="" id="">
          <option value="" selected>Välj ämne</option>
          <option value="Engelska">Engelska</option>
          <option value="Svenska">Svenska</option>
          <option value="Samhällskunskap">Samhällskunskap</option>
        </select>
        <button type="submit">Spara</button>
      </form>
    </div>
  )
}
export default Homework

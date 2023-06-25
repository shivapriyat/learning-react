import './App.css';
import { useState, useReducer } from 'react';
// import {About} from './About';
// import {Contacts} from './Contacts';
import { NavMenu } from './NavMenu';

function HelloComponent() {
  return (
    <div className="App">
      Hello from React !!
    </div>
  );
}

function HelloComponentProps(props) {
  return (
    <div>
      You are user {props.name} from location {props.location} and your age is {props.age} !!
    </div>
  );
}

export function HelloComponentState() {
  const [height,setHeight] = useState(0);
  const [weight,setWeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [checked, setChecked] = useReducer((checked)=> !checked, false)
  function handleHeightChange(event) {
    setHeight(event.target.value);
  }
  function handleWeightChange(event) {
    setWeight(event.target.value);    
  }
  function calculateBMI(e) {
    e.preventDefault();
    console.log("my weight and height:" + height +" "+ weight );
    let hinmt =  height/100;
    let bmi = weight/(hinmt*hinmt);
    setBmi(bmi);
  }
  function displayBMI() {
    if(bmi > 0) {
      let myBmiItem = {};
      for(let i=0; i< stdBmiValues.length; i++) {
          let item = stdBmiValues[i];
          if(item.minValue<bmi && bmi < item.maxValue) {
            myBmiItem=item;
            break;
          }
      } 
      
      return (
        <div>
          <h3 id="calculatedResponse">Your BMI {parseFloat(bmi).toFixed(2)} {checked ? myBmiItem.label : "" }</h3>
        </div>
      );
    }
    else {
      return null; 
    }
  }
  return(
    <div>
      <h2> To know your BMI enter values below useState Example: </h2>
      <form onSubmit={calculateBMI}>
      <label>Enter your Height in cms
      <input id="height" type="text" value={height} onChange={handleHeightChange} />
      </label>
      <br/>
      <label>Enter your Weight in kgs
      <input id="weight" type="text" value={weight} onChange={handleWeightChange} />
      </label>
      <br/>
      <input type="checkbox" id="agreeToShowBMICategory" value={checked} onChange={setChecked} />
      <label htmlFor='agreeToShowBMICategory'>Agree to show BMI category</label>
      <br/>
      <button id="calculate" type="submit" >Calculate BMI</button>
   
      </form>
      {displayBMI()}
    </div>
  );
}
const stdBmiValues = [
  {key: 'underweight', label: 'Under Weight', minValue: 0.0, maxValue: 18.4},
  {key: 'normalweight', label: 'Normal Weight', minValue: 18.5, maxValue: 24.9},
  {key: 'overweight', label: 'Obesity', minValue: 25.0, maxValue: 100}
];
function DisplayStandardBMICategories() {
  
  const listItems = stdBmiValues.map( item => 
    <li key={item.key}>{item.label }</li>
  )
  return (
    <>
    <h1> Standard Body Categories List with props example </h1>
    <ul>
      {listItems}
    </ul>
    </>
  );
}
function DisplayStandardBMIStatsTable() {
  let tableRowItems = stdBmiValues.map(item => <tr key={item.label}><td>{item.label}</td><td>{item.minValue}</td><td>{item.maxValue}</td></tr>)
  return (
    <>
    <h1> Standard BMI Stats Table with props example</h1>
    <table >
      <thead>
      <tr>
        <th>Label</th>
        <th>minValue</th>
        <th>maxValue</th>
      </tr>
      </thead>
      <tbody>
        {tableRowItems}
      </tbody>
    </table>
    </>
  );
}

export function HelloComponentReducer() {
  const [checked, setChecked] = useReducer((checked)=> { return !checked }, false)
  return (
    <div>
      <h2>Checkbox with userreducer example</h2>
     
      <input id="checkbox1" type="checkbox" value={checked} onChange={setChecked} />
      <label htmlFor='checkbox1'> {checked ? "I am checked" : "Un Checked"}</label>
    </div>
  );
}

export function App() {
  return(
    <>
     
  <HelloComponent />
  <HelloComponentProps name="priya" location="Bangalore" age={31}/>
  <DisplayStandardBMICategories />
  <DisplayStandardBMIStatsTable />
  <HelloComponentState />
  <HelloComponentReducer />

  {/* <About />
  <Contacts /> */}
  </>
  );
}

export default App;

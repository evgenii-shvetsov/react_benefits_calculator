
import { useState } from "react";
//import ReactDOM from "react-dom";
import benefits from './benefitsTable'
import locationsArray from "./cities";

function MyForm() {
  const [inputs, setInputs] = useState({});
  const [location, setLocation] = useState({});
  const [disability, setDisability] = useState('');
  const [finalResult, setFinalResult] = useState(false);
  const [familySizeExcludeSsiRecipients,setFamilySizeExcludeSsiRecipients] = useState(1);
  const [checkLocation, setCheckLocation] = useState(false);
  const [maxBenefit, setMaxBenefit] = useState('');
  const [actualBenefit, setActualBenefit] = useState('');
  //const [finalWords, setFinalWords] = useState(1);
  const incomeDisregard = 550;

  /*******calculations*****/
  let countIncome = ((inputs.monthlyIncome - incomeDisregard)* 0.5)
    if((inputs.monthlyIncome - incomeDisregard)<= 0){
        countIncome = 0
    };

  let finalWords;

  let result = 
      <ol>
        <li>Family size: {inputs.familySize}</li>
        <li>SSI recipients: {inputs.ssiRecipients}</li>
        <li>FS exclude SSI: {familySizeExcludeSsiRecipients}</li>
        <li> Location: {inputs.location}</li>
        <li>{checkLocation ? "Location is in Region 1": "Location is in Region 2"}</li>
        <li> Disability: {inputs.disability}</li>
        <li> Monthly income: {inputs.monthlyIncome}</li>
        <li>Count income:{countIncome}</li>
        <li>Max Benefit:{maxBenefit}</li>
        <li>Total amount of eligible cash benefit: {actualBenefit}</li>
        {/*<li>Conclusion: {finalWords}</li>*/}
      </ol>;
 
const actualBenefits=()=>{
  setActualBenefit(maxBenefit - countIncome)
    console.log('actual benefit = ' + actualBenefit)
    if (actualBenefit <= 0){
     setActualBenefit("You are not eligible for extra benefits")
    } 
    return actualBenefit;
}

const benefitsCalc = ()=>{
  if(inputs.disability === "false" && inputs.location === "Other" ){
    setMaxBenefit(benefits[familySizeExcludeSsiRecipients][2][1])
    actualBenefits()
    console.log('Region 2 NE', 'actual benefit = ' + actualBenefit)
  }else if(inputs.disability === "true" && inputs.location === "Other"){
    setMaxBenefit(benefits[familySizeExcludeSsiRecipients][3][1])
    actualBenefits()
    console.log('Region 2 E', 'actual benefit = ' + actualBenefit)
  }else if (inputs.disability === "true" && inputs.location){
    setMaxBenefit(benefits[familySizeExcludeSsiRecipients][1][1])
    actualBenefits()
    console.log('Region 1 E', 'actual benefit = ' + actualBenefit)
  }else if(inputs.disability === "false" && inputs.location){
    setMaxBenefit(benefits[familySizeExcludeSsiRecipients][0][1])
    actualBenefits()
    console.log('Region 1 NE', 'actual benefit = ' + actualBenefit)

  }else{
    setMaxBenefit("You entered wrong values. Please check!")
    console.log('Wrong values entered')
  }
}
  /*******end calculations*****/
  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
    setLocation(event.target.value);
    setDisability(event.target.value);
    setFamilySizeExcludeSsiRecipients(inputs.familySize - inputs.ssiRecipients); //calc FS for the formula
    setCheckLocation(locationsArray.includes(inputs.location)); //checking location array
    setFamilySizeExcludeSsiRecipients(inputs.familySize - inputs.ssiRecipients); //calc FS for the formula
    setCheckLocation(locationsArray.includes(inputs.location)) ;//checking location array
    benefitsCalc();
    setFinalResult(false)
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    setCheckLocation(locationsArray.includes(inputs.location)); //checking location array
    setFamilySizeExcludeSsiRecipients(inputs.familySize - inputs.ssiRecipients); //calc FS for the formula
    setCheckLocation(locationsArray.includes(inputs.location)); //checking location array
    benefitsCalc();
    setFinalResult(true);
  }

  const handleReset = (event)=>{
    event.preventDefault();
    setFinalResult(false);
    setInputs({});
    setLocation();
    setDisability();
    setFamilySizeExcludeSsiRecipients(1); //calc FS for the formula
  
  
    //setInputs(event.target.reset())
   // setLocation(event.target.reset())
    //setDisability(event.target.reset())  
    
  }



;


  return (

    <div>
    <form className="formStyle" onSubmit={handleSubmit} onReset={handleReset}>
      
      <label>Family Size:
      <input 
        type="number" 
        name="familySize" 
        value={inputs.familySize || ""} 
        min={1}
        max={10}
        onChange={handleChange}
        placeholder="-"
        required
      />
      </label>
      
      <label>SSI recipients:
        <input 
          type="number" 
          name="ssiRecipients" 
          value={inputs.ssiRecipients|| ""} 
          min={0}
          max={inputs.familySize}
          onChange={handleChange}
          placeholder="-"
          required
        />
        </label>
       
        <label>Your county:
        <select value={inputs.location} name="location" onChange={handleChange} defaultValue={'DEFAULT'} required>
          <option value='DEFAULT' disabled hidden>Select an Option</option>
          <option value='Alameda'>Alameda</option>
          <option value='Contra Costa'>Contra Costa</option>
          <option value='Los Angeles'>Los Angeles</option>
          <option value='Marin'>Marin</option>
          <option value='Monterey'>Monterey</option>
          <option value='Napa'>Napa</option>
          <option value='Orange'>Orange</option>
          <option value='San Diego'>San Diego</option>
          <option value='San Francisco'>San Francisco</option>
          <option value='San Luis Obispo'>San Luis Obispo</option>
          <option value='San Mateo'>San Mateo</option>
          <option value='Santa Barbara'>Santa Barbara</option>
          <option value='Santa Clara'>Santa Clara</option>
          <option value='Santa Cruz'>Santa Cruz</option>
          <option value='Sonoma'>Sonoma</option>
          <option value='Ventura'>Ventura</option>
          <option value='Other'>Other</option>
        </select>
        </label>
        
        <label>Disabled:
          <select value={inputs.disability} name="disability" onChange={handleChange} defaultValue={'DEFAULT'} required>
          <option value='DEFAULT' disabled hidden>Select an Option</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          </label>
          
          <label>Monthly income:
          <input
          type="number" 
          name="monthlyIncome" 
          value={inputs.monthlyIncome|| ""} 
          min={1}
          onChange={handleChange}
          placeholder="-"
          required
            />
          </label>
        <input className="submitBTN" type="submit" value="Submit"/>
        {/*<input className="submitBTN" type="reset" />*/}
    </form>

    {finalResult ? result : null }
    </div>
  );
}

export default MyForm;
//ReactDOM.render(<MyForm />, document.getElementById('root'));
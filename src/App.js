
import './App.css';
import Home from "./components/home";
import Resultpage from './components/Resultpage';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useSnackbar} from "notistack";
function App() {
  const {enqueueSnackbar}=useSnackbar();
  let [error,seterror]=useState(false);
  let [time,settime]=useState(0);
  const [trigger,settrigger]=useState(0);
  let [final,setfinal]=useState([]);
  let [formdata,setformdata]=useState({"token":"","planet_names":[],"vehicle_names":[]});
  let changeErrorStatus=()=>{
    seterror(true);
  }
  let increaseTrigger=()=>{
    settrigger((trigger)=>trigger+1)

  }
  let decreaseTrigger=()=>{
    settrigger((trigger)=>trigger-1)

  }
  let FindFalcone=async(event)=>{
    try{
    let  falconResponse=await axios.post('https://findfalcone.geektrust.com/find',formdata,{headers:{"Accept":"application/json","Content-type":"application/json"}})
    falconResponse=falconResponse.data;
    console.log(falconResponse);
    setfinal(falconResponse);
    increaseTrigger();
  }
  catch(e){
    changeErrorStatus();
    enqueueSnackbar(`Failed to get Falcon Response please Reset The Game ${e.response.message}`,{variant:"error"})
  }
    
    


}
let clearFormData=()=>{
  let newformdata={...formdata};
  newformdata.token="";
  newformdata.planet_names=[];
  newformdata.vehicle_names=[];
  setformdata(newformdata);
  settime(0);
}
let addDataToForm=(planetname,vehiclename)=>{
  let newformdata={...formdata};
  newformdata.planet_names.push(planetname);
  newformdata.vehicle_names.push(vehiclename);
  setformdata(newformdata)

  console.log(formdata);

}
let getToken=async()=>{
  try{
  let responsetokendata=await axios.post(`https://findfalcone.geektrust.com/token`,{},{headers:{'Accept': 'application/json'}});
  responsetokendata=responsetokendata.data;
  let newformdata={...formdata};
  newformdata.token=responsetokendata.token;
  newformdata.planet_names=[];
  newformdata.vehicle_names=[];
  setformdata(newformdata);
  console.log(formdata);
}
catch(e){
  changeErrorStatus();
    enqueueSnackbar(`Failed to get Token please Reset The Game `,{variant:"error"})

}
}
let calculateAndUpdateTime=(speed,distance)=>{

  let rockettime=distance/speed;
  settime(rockettime+time);


}
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route exact path="/" element={<Home error={error} changeErrorStatus={changeErrorStatus} formdata={formdata} clearFormData={clearFormData} time={time} calculateAndUpdateTime={calculateAndUpdateTime} trigger={trigger} final={final} FindFalcone={FindFalcone} addDataToForm={addDataToForm} getToken={getToken}/>}/>
          <Route exact path="/result" element={<Resultpage error={error} decreaseTrigger={decreaseTrigger} final={final} time={time} clearFormData={clearFormData} trigger={trigger}/>}/>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;

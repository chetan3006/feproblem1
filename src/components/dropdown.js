import {
  MenuItem,
  Stack,
  Select,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
export default function Dropdown({
  vehicledata,
  planetsdata,
  id,
  addDataToForm,
  updateData,
  calculateAndUpdateTime,buttonid
}) {
  let [showradio, setshowradio] = useState(false);
  let [selectedplanet, setselectedplanet] = useState("");
  let [selectedvehicle, setselectedvehicle] = useState("");
  let [localvehicledata,setlocalvehicledata]=useState([]);
  let [localplanetsdata,setlocalplanetsdata]=useState([]);
  let [disabled,setdisabled]=useState(false);
  const {enqueueSnackbar}=useSnackbar();
  
  
  let checkvalidation=()=>{
    if(selectedplanet===""||selectedvehicle===""){
      return false;
    }
    else{
      return true;
    }
  }
 // console.log(localvehicledata,localplanetsdata);
  let handlebutton=()=>{
    if(checkvalidation()){
    addDataToForm(selectedplanet.name,selectedvehicle.name);
    updateData(selectedplanet,selectedvehicle)
    calculateAndUpdateTime(selectedvehicle.speed,selectedplanet.distance);
    setdisabled(true);
    enqueueSnackbar(`Data For Planet ${id} Added Succesfully`,{variant:"success"})
  }
  else{
    enqueueSnackbar(`Data for Planet ${id} not selected`,{variant:"error"});
  }
  }
  let handleplanetchange = (e) => {
    let filteredplanetdata=localplanetsdata.filter((item)=>item.name===e.target.value);
         setshowradio(true);
        setselectedplanet(filteredplanetdata[0]);
    //setselectedplanet(e.target.value);
     console.log(selectedplanet);
    
  };
  let handlevehiclechange = (e) => {
    let filteredvehicledata=localvehicledata.filter((item)=>item.name===e.target.value);
        
    setselectedvehicle(filteredvehicledata[0]);
    console.log(selectedvehicle);
    
  };
  useEffect(()=>{
    setlocalplanetsdata(planetsdata);
    console.log(localplanetsdata);
    setlocalvehicledata(vehicledata);
    console.log(localvehicledata);
    console.log(selectedplanet);
    console.log(selectedvehicle);

  },[planetsdata,localplanetsdata,localvehicledata,vehicledata,selectedplanet,selectedvehicle]);
  return (
    <div>
      <h3>Destination {id} </h3>
      <Select
        displayEmpty
        defaultValue=""
        value={selectedplanet.name}
        onChange={handleplanetchange}
      >
        <MenuItem value="">Select</MenuItem>
        {localplanetsdata.map((item) => {
          return (
            <MenuItem key={item.name} value={item.name}>
              {item.name}({item.distance})
            </MenuItem>
          );
        })}
      </Select>
      <Stack>
        {showradio &&
          localvehicledata.map((item) => {
         
          if(item.max_distance>=selectedplanet.distance && item.total_no>0){
              return (
                <label key={item.name}>
                  <input
                    type="radio"
                    name={id}
                    value={item.name}
                    onChange={handlevehiclechange}
                  />
                  {item.name}({item.total_no})(maxdistance={item.max_distance})
                </label>
              );
            } else {
              return (
                <label>
                  <input
                    type="radio"
                    disabled
                    name={id}
                    value={item}
                    onChange={handlevehiclechange}
                  />
                  {item.name}({item.total_no})(maxdistance={item.max_distance})
                </label>
              );
            }
          })}
          <Button disabled={disabled} id={buttonid} onClick={handlebutton}>Submit</Button>
      </Stack>
    </div>
  );
}

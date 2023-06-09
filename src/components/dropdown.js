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
  calculateAndUpdateTime,buttonid,formdata
}) {
  let [showradio, setshowradio] = useState(false);
  let [selectedplanet, setselectedplanet] = useState(null);
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
    
  };
  let handlevehiclechange = (e) => {
    let filteredvehicledata=localvehicledata.filter((item)=>item.name===e.target.value);
        
    setselectedvehicle(filteredvehicledata[0]);
    
  };
  useEffect(()=>{
    setlocalplanetsdata(planetsdata);
    setlocalvehicledata(vehicledata);

  },[planetsdata,localplanetsdata,localvehicledata,vehicledata,selectedplanet,selectedvehicle]);
  return (
    <div>
      <h3>Destination {id} </h3>
      <Select
        displayEmpty
        defaultValue=""
        value={selectedplanet?.name||''}
        onChange={handleplanetchange}
      >
        <MenuItem value="">Select</MenuItem>
        {planetsdata.map((item) => {
          return (
            <MenuItem  disabled={formdata.planet_names.includes(item.name)?true:false} key={item.name} value={item.name}>
              {item.name}({item.distance})
            </MenuItem>
          );
        })}
      </Select>
      
      <Stack>
        {showradio &&
          vehicledata.map((item) => {
         
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
                <label key={item.name}>
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

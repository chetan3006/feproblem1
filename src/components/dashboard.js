import { Button } from "@mui/material"
import {Stack} from "@mui/material"
import Dropdown from "./dropdown"
import {useNavigate} from 'react-router-dom';
import { useEffect } from "react";
export default function Dashboard({result,vehicledata,planetsdata,addDataToForm,updateData,time,calculateAndUpdateTime,formdata,findFalcone}){
    const navigate=useNavigate();
   // navigate('/result',{state:{id:1}});
    const sendData=()=>{
        navigate('/result',{state:{id:1}});
    }
    const findFalconeClick=()=>{
        findFalcone();
        
      
    }
    useEffect(()=>{
        console.log(result)
    },[result]);

    
    return(
        <div><Stack>
            <Stack direction="row">
            <Dropdown vehicledata={vehicledata} planetsdata={planetsdata} id={1} addDataToForm={addDataToForm} updateData={updateData} calculateAndUpdateTime={calculateAndUpdateTime} buttonid={"button1"}/>
            <Dropdown vehicledata={vehicledata} planetsdata={planetsdata} id={2} addDataToForm={addDataToForm} updateData={updateData} calculateAndUpdateTime={calculateAndUpdateTime} buttonid={"button2"}/>
            <Dropdown vehicledata={vehicledata} planetsdata={planetsdata} id={3}  addDataToForm={addDataToForm} updateData={updateData} calculateAndUpdateTime={calculateAndUpdateTime} buttonid={"button3"}/>
            <Dropdown vehicledata={vehicledata} planetsdata={planetsdata} id={4} addDataToForm={addDataToForm} updateData={updateData} calculateAndUpdateTime={calculateAndUpdateTime} buttonid={"button4"}/>
            <h2>Time Taken:{time}</h2>
            </Stack>
            <div>
            <Button onClick={()=>findFalcone()} variant="contained" fullWidth={false}>Find Falcone</Button>
            {/* <Button onClick={()=>findFalcone()} disabled={(formdata.planet_names.length===4)?false:true} variant="contained" fullWidth={false}>Find Falcone</Button> */}
            </div>
            </Stack>
            this is result:{result.status}

            
        </div>
    )
}
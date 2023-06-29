import { Button } from "@mui/material"
import {Stack} from "@mui/material"
import Dropdown from "./dropdown"
import { useEffect } from "react";
import {Grid} from "@mui/material";
export default function Dashboard({result,vehicledata,planetsdata,addDataToForm,updateData,time,calculateAndUpdateTime,formdata,findFalcone}){


    
    return(
        <div><Stack>
            <Stack direction="row">
            <Grid container spacing={2}>
            <Grid item xs={12} md={2} >
                <Dropdown formdata={formdata} vehicledata={vehicledata} planetsdata={planetsdata} id={1} addDataToForm={addDataToForm} updateData={updateData} calculateAndUpdateTime={calculateAndUpdateTime} buttonid={"button1"}/>
            </Grid>
            <Grid item xs={12} md={2}>
                <Dropdown formdata={formdata} vehicledata={vehicledata} planetsdata={planetsdata} id={2} addDataToForm={addDataToForm} updateData={updateData} calculateAndUpdateTime={calculateAndUpdateTime} buttonid={"button2"}/>
            </Grid>
            <Grid item xs={12} md={2}>
                <Dropdown formdata={formdata} vehicledata={vehicledata} planetsdata={planetsdata} id={3}  addDataToForm={addDataToForm} updateData={updateData} calculateAndUpdateTime={calculateAndUpdateTime} buttonid={"button3"}/>
            </Grid>
            <Grid item xs={12} md={2}>
                <Dropdown formdata={formdata} vehicledata={vehicledata} planetsdata={planetsdata} id={4} addDataToForm={addDataToForm} updateData={updateData} calculateAndUpdateTime={calculateAndUpdateTime} buttonid={"button4"}/>
            </Grid>
            <Grid item xs={12}>
            <h2>Time Taken:{time}</h2>
            </Grid>
            </Grid>
            </Stack>
            <Grid container spacing={2}>
                <Grid item xs={12}>
            <div>
            <Button onClick={()=>findFalcone()} disabled={(formdata?.planet_names.length===4)?false:true} variant="contained" fullWidth={false}>Find Falcone</Button>
            </div>
            </Grid>
            </Grid>
            </Stack>

            
        </div>
    )
}
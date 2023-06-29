import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import Dashboard from "./dashboard";
import {useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';
import { useSnackbar } from "notistack";

export default function Home({final,FindFalcone,formdata,addDataToForm,getToken,trigger,calculateAndUpdateTime,time,clearFormData,error,changeErrorStatus}){
    let [vehicledata,setvehicledata]=useState([]);
    let [planetsdata,setplanetsdata]=useState([]);
    const{enqueueSnackbar}=useSnackbar();
    
    
  
    const navigate=useNavigate();
    let navigateToResultpage=()=>{
        navigate('/result');
    }

   
    let updateData=(planetname,vehiclename)=>{
        let newvehicledata=[...vehicledata];
        let newvehiclenumber=vehiclename.total_no-1;
        newvehicledata.map((item)=>{
            if(item.name===vehiclename.name){
            item.total_no=newvehiclenumber;
        }return item;});


        
      

        
        


    }
    

    let getplanets=async()=>{
        try{
            let responsedataplanet=await axios.get(`https://findfalcone.geektrust.com/planets`);
            responsedataplanet=responsedataplanet.data;
            setplanetsdata(responsedataplanet);

        }
        catch(e){
            changeErrorStatus();
    enqueueSnackbar("Failed to get Planets Data please Reset The Game",{variant:"error"})

        }
    }
    let getvehicles=async()=>{
        try{
        let responsedatavehicle=await axios.get(`https://findfalcone.geektrust.com/vehicles`);
        responsedatavehicle=responsedatavehicle.data;
        setvehicledata(responsedatavehicle);
        }
        catch(e){
            changeErrorStatus();
    enqueueSnackbar("Failed to get Vehicle Data please Reset The Game",{variant:"error"})

        }
       

        

    }
    useEffect(()=>{
        if(trigger){
            navigateToResultpage();
        }
    },[trigger])
    useEffect(()=>{
        getToken();
        getvehicles();
        getplanets();
        

    },[])
    return(
        <div>
        <Header clearFormData={clearFormData}/>
        <Dashboard result={final}  findFalcone={FindFalcone} formdata={formdata} vehicledata={vehicledata} planetsdata={planetsdata} addDataToForm={addDataToForm} updateData={updateData} time={time} calculateAndUpdateTime={calculateAndUpdateTime} />
        <Footer/>
        </div>

    )
}
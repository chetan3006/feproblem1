import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import Dashboard from "./dashboard";
import {useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';
import { Navigate } from "react-router-dom";

export default function Home({final,FindFalcone,formdata,addDataToForm,getToken,trigger}){
    let [vehicledata,setvehicledata]=useState([]);
    let [planetsdata,setplanetsdata]=useState([]);
    
    let [time,settime]=useState(0);
    
    const navigate=useNavigate();
    // let handleClickFalcone=async()=>{
    //     let clickdata=await FindFalcone();
    //     console.log(clickdata);
    // }
    let navigateToResultpage=()=>{
        navigate('/result');
    }
    let calculateAndUpdateTime=(speed,distance)=>{

        let rockettime=distance/speed;
        settime(rockettime+time);


    }
   
    let updateData=(planetname,vehiclename)=>{
        let newplanetdata=planetsdata.filter((item)=>item.name!==planetname.name);
        setplanetsdata(newplanetdata);
       // console.log(newplanetdata);
        let newvehicledata=[...vehicledata];
        let newvehiclenumber=vehiclename.total_no-1;
        newvehicledata.map((item)=>{//console.log(item.name==vehiclename.name);
           // console.log(item.total_no);
            if(item.name===vehiclename.name){
            item.total_no=newvehiclenumber;
        }return item;});


        
       // newvehicledata.currentvehiclename.total_no=newvehiclenumber
      // console.log(newvehiclenumber,newvehicledata);
       

        
        


    }
    

    let getplanets=async()=>{
        try{
            let responsedataplanet=await axios.get(`https://findfalcone.geektrust.com/planets`);
            responsedataplanet=responsedataplanet.data;
            setplanetsdata(responsedataplanet);

        }
        catch(e){

        }
    }
    let getvehicles=async()=>{
        try{
        let responsedatavehicle=await axios.get(`https://findfalcone.geektrust.com/vehicles`);
        responsedatavehicle=responsedatavehicle.data;
        setvehicledata(responsedatavehicle);
        }
        catch(e){

        }
       

        

    }
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         // sendData();
    //          navigate('/result');
 
    //      },2000);
       

    // },[final])
    useEffect(()=>{
        if(trigger){
            navigateToResultpage();
        }
    },[trigger])
    useEffect(()=>{
        
        console.log(final);
    },[final])
    useEffect(()=>{
        getToken();
        getvehicles();
        getplanets();
        

    },[])
    return(
        <div>
        <Header/>
        <Dashboard result={final}  findFalcone={FindFalcone} formdata={formdata} vehicledata={vehicledata} planetsdata={planetsdata} addDataToForm={addDataToForm} updateData={updateData} time={time} calculateAndUpdateTime={calculateAndUpdateTime} />
        <Footer/>
        </div>

    )
}
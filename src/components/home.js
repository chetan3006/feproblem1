import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import Dashboard from "./dashboard";
import {useEffect,useState} from "react";

export default function Home(){
    let [vehicledata,setvehicledata]=useState([]);
    let [planetsdata,setplanetsdata]=useState([]);
    let [formdata,setformdata]=useState({"token":"","planet_names":[],"vehicle_names":[]});
    let [time,settime]=useState(0);
    let [final,setfinal]=useState([]);
    let result={};
    // let handleClickFalcone=async()=>{
    //     let clickdata=await FindFalcone();
    //     console.log(clickdata);
    // }
    let FindFalcone=async(event)=>{
        let  falconResponse=await axios.post('https://findfalcone.geektrust.com/find',formdata,{headers:{"Accept":"application/json","Content-type":"application/json"}})
        falconResponse=falconResponse.data;
        debugger;
        console.log(falconResponse);
        setfinal(falconResponse);
        debugger;
        console.log(final);
        debugger;
        localStorage.setItem("result",JSON.stringify(falconResponse));
        return falconResponse;

    }
    let calculateAndUpdateTime=(speed,distance)=>{

        let rockettime=distance/speed;
        settime(rockettime+time);


    }
    let addDataToForm=(planetname,vehiclename)=>{
        let newformdata={...formdata};
        newformdata.planet_names.push(planetname);
        newformdata.vehicle_names.push(vehiclename);
        setformdata(newformdata)

        console.log(formdata);

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
    let getToken=async()=>{
        let responsetokendata=await axios.post(`https://findfalcone.geektrust.com/token`,{},{headers:{'Accept': 'application/json'}});
        responsetokendata=responsetokendata.data;
        let newformdata={...formdata};
        newformdata.token=responsetokendata.token;
        setformdata(newformdata);
        console.log(formdata);
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
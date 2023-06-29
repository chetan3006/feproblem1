import Header from "./header";
import Footer from "./footer";
import { Button } from "@mui/material"
import {useNavigate} from 'react-router-dom';


export default function Resultpage({final,time,clearFormData,decreaseTrigger,error}){
    const navigate=useNavigate();
    let gotoHome=()=>{
        clearFormData();
        decreaseTrigger();
        navigate('/');

    }

    


    return(
        <>
        <Header/>
        {error?<h1>Rest Api Called Returned With Error Status Code</h1>:
             (final.status)==='success'?<div><h1>Success Congratulations on finding Falcone King Shan is Mighty Pleased</h1>
             <h3>Time Taken:{time}</h3>
             <h3>PlanetFound:{final.planet_name}</h3>
             </div>:<h1>Sorry Planet not Found</h1>

        }
           

        
        
        <Button onClick={gotoHome}>Start Again</Button>
        <Footer/>
        </>
    )
}
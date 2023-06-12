import Header from "./header";
import Footer from "./footer";
import {useLocation} from "react-router-dom";

export default function Resultpage({final}){
    


    return(
        <>
        <Header/>
        Hello:{final.status}
        H:{final.planet_name}

        <Footer/>
        </>
    )
}
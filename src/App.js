
import './App.css';
import Home from "./components/home";
import Resultpage from './components/Resultpage';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
//import { SnackbarProvider, enqueueSnackbar } from 'notistack'
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/result" element={<Resultpage/>}/>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;

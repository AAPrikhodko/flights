import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
      <BrowserRouter>
        <div className="wrapper">
          <div className="header"><Header/></div>
          <div className="content"> <Route exact path='/' render={() => <Home/>}/>  </div>
          <div className="footer"><Footer/></div>
        </div>
      </BrowserRouter>
  );
}

export default App;

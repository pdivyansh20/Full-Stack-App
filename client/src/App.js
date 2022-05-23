import React, { createContext,useReducer } from "react";
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Route ,Routes  } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Signup from "./components/Signup"
import Login from "./components/Login"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Logout from "./components/Logout"
import { initialstate,reducer } from "./Reducer/UseReducer";
export const UserContext = createContext();
const App=()=> {
 
 const [state, dispatch] = useReducer(reducer, initialstate)
  return (
   
    <>
      <UserContext.Provider value={{state,dispatch}}>
      <Navbar />
      <Routes>
      <Route exact path="/" element= {<Home/>} />
      <Route path="/About" element= {<About/>} />
      <Route path="/Contact" element= {<Contact/>} />
      <Route path="/Signup" element= {<Signup/>} />
      <Route path="/Login" element= {<Login/>} />
      <Route path="/Logout" element= {<Logout/>} />
      </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;

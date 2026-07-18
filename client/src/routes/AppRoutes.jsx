import {Routes,Route} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Problems from "../pages/Problems";
import Profile from "../pages/Profile";


function AppRoutes(){
  return(
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/problems" element={<Problems/>}/>
    <Route path="/profile" element={<Profile />} />
    <Route path="*" element={<NotFound/>}/>
  </Routes>
  );
}
export default AppRoutes;
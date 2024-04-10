import { BrowserRouter, Route, Routes, } from "react-router-dom"
import {RecoilRoot} from "recoil"
import Signup from "./pages/Signup";
import { Signin } from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Welcome from "./pages/Welcome";


function App() {

  return (
    <div >
      <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin  />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/send" element={<SendMoney/>}></Route>
        </Routes>
      </BrowserRouter>
    

      </RecoilRoot>
     
    </div>
  )
}

export default App

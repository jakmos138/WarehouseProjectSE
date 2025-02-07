import Header from "./components/Header/Header";
import './App.css';
import SideBar from "./components/SideBar/SideBar";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders";
import Dashboard from './pages/Dashboard';
import SignIn from "./components/SignIn/SignIn";
import AccountPage from "./pages/AccountPage";
import Types from "./pages/Types";
import Locations from "./pages/Locations";

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <BrowserRouter>
       {!signedIn ? (
        <SignIn setSignedIn={setSignedIn} />
      ) : ( 
        <>
          <Header />
          <SideBar />
          <Routes>
            <Route path='/account' element={<AccountPage />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/types' element={<Types />} />
            <Route path='/locations' element={<Locations />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </>
     )}
    </BrowserRouter>
  );
}

export default App;

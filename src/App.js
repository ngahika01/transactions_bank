import React from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "././App.css";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import AdminPage from "./screens/AdminPage";
import CreateAccount from "./screens/CreateAccount";
import Depost from "./screens/Depost";
import EditProfileScreen from "./screens/EditProfileScreen";
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import WithDraw from "./screens/WithDraw";

const App = () => {
  return (
    <UserAuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/edit" element={<EditProfileScreen />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/deposit/:id" element={<Depost />} />
          <Route path="/withdraw/:id" element={<WithDraw />} />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
};

export default App;

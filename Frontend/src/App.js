import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Pages/Login";
import ToDo from "./Pages/ToDo";
import Dashboard from "./Pages/Dashboard";
import "./App.css";

export default function App() {
   return (
      <Routes>
         <Route path="/" element={<Login />} />
         <Route exact path="/todo" element={<ToDo />} />
         <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
   );
}

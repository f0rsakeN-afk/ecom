import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1 className="">header</h1>
      <Routes>
        <Route path="/auth" element={<AuthLayout />} >
        <Route path="/login" element={}/>
        <Route path="/register" element={}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;

import Main from "./pages/Main";
import Complete from "./pages/Complete";
// import Loading from "./pages/Loading";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </Router>
  );
}

export default App;

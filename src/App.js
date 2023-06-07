import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ShowList from "./components/ShowList/ShowList";
import ShowSummary from "./components/ShowSummary/ShowSummary";
import BookingForm from "./components/BookingForm/BookingForm";
import "./App.scss";

function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<ShowList />} />
        <Route path="/summary/:id" element={<ShowSummary onQuery={setQuery}/>} />
        <Route path="/booking/:id" element={<BookingForm query={query}/>} />
      </Routes>
    </div>
  );
}

export default App;

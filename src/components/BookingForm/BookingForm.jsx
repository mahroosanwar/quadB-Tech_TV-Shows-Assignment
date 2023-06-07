import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";

import "./BookingForm.scss";

function BookingForm({ query }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store user details in local/session storage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("address", address);
    localStorage.setItem("movieTitle", movieTitle);
    // Redirect to a success page or perform other actions
    navigate("/");

    alert("Enjoy! Your Movie Booked");
  };

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setAddress(localStorage.getItem("address"));
  }, []);

  const onDateChangeHandler = (date, dateString) => {
    console.log(date, dateString);
  };

  function onTimeChangeHandler(time, timeString) {
    console.log(time, timeString);
  }

  const movieTitle = query.name;

  return (
    <div className="BookingForm">
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Title:
          <input
            type="text"
            value={movieTitle}
            readOnly
            className="FormInput"
          />
        </label>
        <label>
          Name:
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="FormInput"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="FormInput"
            required
          />
        </label>
        <label>
          Date:
          <DatePicker onChange={onDateChangeHandler} />
        </label>
        <label>
          Show Time:
          <TimePicker
            use12Hours
            format="h:mm a"
            onChange={onTimeChangeHandler}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="FormInput"
            required
          />
        </label>
        <button type="submit" className="FormButton">
          Book Ticket
        </button>
      </form>
    </div>
  );
}

export default BookingForm;

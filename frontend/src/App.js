import { useEffect, useState } from "react";
import { API } from "./config";
import AddDoctor from "./components/AddDoctor";
import DoctorList from "./components/DoctorList";
import BookDoctor from "./components/BookDoctor";
import BookingList from "./components/BookingList";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${API}/doctors`).then(r => r.json()).then(setDoctors);
    fetch(`${API}/bookings`).then(r => r.json()).then(setBookings);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>Smart Doctor Booking System</h1>
      <AddDoctor setDoctors={setDoctors} />
      <DoctorList doctors={doctors} setDoctors={setDoctors} />
      <BookDoctor doctors={doctors} setBookings={setBookings} />
      <BookingList bookings={bookings} doctors={doctors} setBookings={setBookings} />
    </div>
  );
}

export default App;

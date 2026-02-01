import { useState } from "react";
import { API } from "../config";

export default function BookDoctor({ doctors, setBookings }) {
  const [doctorId, setDoctorId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const book = async () => {
    if (!doctorId || !patientName || !date || !time) return alert("Fill all");
    const res = await fetch(`${API}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorId, patientName, date, time })
    });
    const data = await res.json();
    setBookings(data);
    setDoctorId("");
    setPatientName("");
    setDate("");
    setTime("");
  };

  return (
    <>
      <h2>Book Doctor</h2>
      <select value={doctorId} onChange={e => setDoctorId(e.target.value)}>
        <option value="">Select Doctor</option>
        {doctors.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>
      <input placeholder="Patient Name" value={patientName} onChange={e => setPatientName(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      <button onClick={book}>Book</button>
    </>
  );
}

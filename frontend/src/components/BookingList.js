import { API } from "../config";

export default function BookingList({ bookings, doctors, setBookings }) {
  const cancel = async (b) => {
    const res = await fetch(`${API}/bookings`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(b)
    });
    const data = await res.json();
    setBookings(data);
  };

  return (
    <>
      <h2>Bookings</h2>
      {bookings.map((b, i) => {
        const d = doctors.find(x => x.id === b.doctorId);
        return (
          <div key={i}>
            {b.patientName} → {d?.name} ({b.date} {b.time})
            <button onClick={() => cancel(b)}>Cancel</button>
          </div>
        );
      })}
    </>
  );
}

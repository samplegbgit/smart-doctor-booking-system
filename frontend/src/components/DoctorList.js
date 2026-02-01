import { API } from "../config";

export default function DoctorList({ doctors, setDoctors }) {
  const del = async (id) => {
    const res = await fetch(`${API}/doctors/${id}`, { method: "DELETE" });
    const data = await res.json();
    setDoctors(data.doctors);
  };

  return (
    <>
      <h2>Doctors</h2>
      {doctors.map(d => (
        <div key={d.id}>
          {d.name} ({d.specialization})
          <button onClick={() => del(d.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

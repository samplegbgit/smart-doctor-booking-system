import { useState } from "react";
import { API } from "../config";

export default function AddDoctor({ setDoctors }) {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");

  const add = async () => {
    if (!name || !specialization) return alert("Fill all fields");
    const res = await fetch(`${API}/doctors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, specialization })
    });
    const data = await res.json();
    setDoctors(data.doctors);
    setName("");
    setSpecialization("");
  };

  return (
    <>
      <h2>Add Doctor</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Specialization" value={specialization} onChange={e => setSpecialization(e.target.value)} />
      <button onClick={add}>Add</button>
    </>
  );
}

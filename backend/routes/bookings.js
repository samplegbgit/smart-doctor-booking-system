const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/bookings.json");

const readBookings = () =>
  JSON.parse(fs.readFileSync(filePath, "utf-8"));

const writeBookings = (data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

router.get("/", (req, res) => {
  res.json(readBookings());
});

router.post("/", (req, res) => {
  const { doctorId, patientName, date, time } = req.body;
  if (!doctorId || !patientName || !date || !time)
    return res.status(400).json({ error: "All fields required" });

  const bookings = readBookings();
  bookings.push({ doctorId, patientName, date, time });
  writeBookings(bookings);
  res.json(bookings);
});

router.delete("/", (req, res) => {
  const { doctorId, date, time } = req.body;
  const bookings = readBookings().filter(
    b => !(b.doctorId === doctorId && b.date === date && b.time === time)
  );
  writeBookings(bookings);
  res.json(bookings);
});

module.exports = router;

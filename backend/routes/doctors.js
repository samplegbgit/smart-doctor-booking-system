const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/doctors.json");

const readDoctors = () =>
  JSON.parse(fs.readFileSync(filePath, "utf-8"));

const writeDoctors = (data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

router.get("/", (req, res) => {
  res.json(readDoctors());
});

router.post("/", (req, res) => {
  const { name, specialization } = req.body;
  if (!name || !specialization)
    return res.status(400).json({ error: "All fields required" });

  const doctors = readDoctors();
  const id = "d" + Date.now();
  doctors.push({ id, name, specialization });
  writeDoctors(doctors);
  res.json({ doctors });
});

router.delete("/:id", (req, res) => {
  const doctors = readDoctors().filter(d => d.id !== req.params.id);
  writeDoctors(doctors);
  res.json({ doctors });
});

module.exports = router;

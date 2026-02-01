const express = require("express");
const cors = require("cors");

const doctorRoutes = require("./routes/doctors");
const bookingRoutes = require("./routes/bookings");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/doctors", doctorRoutes);
app.use("/bookings", bookingRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

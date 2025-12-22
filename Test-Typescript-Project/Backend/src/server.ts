import express from "express";
import dotenv from "dotenv";
import applicationsRouter from "./routes/applications";
import programsRouter from "./routes/programs";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/applications", applicationsRouter);
app.use("/programs", programsRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Test backend is running!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Backend running on port ${process.env.PORT || 3000}`);
});

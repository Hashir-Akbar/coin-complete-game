import "dotenv/config";
import dbConnect from "./db/dbConnect.js";
import { User } from "./models/user.model.js";
import express from "express";
import cors from "cors";

// auth routes
import { auth } from "./routes/auth.js";

dbConnect();
const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Allow only requests from this origin
  methods: "GET,POST, PATCH, PUT, DELETE", // Allow only these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api", auth);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

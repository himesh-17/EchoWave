import express from "express";
import mongoose from "mongoose";
import { createServer } from "node:http";
import cors from "cors";
import { connectToSocket } from "./src/controllers/socket.js";

// User Api 
import userRoutes from "./src/routes/user.routes.js"


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);


// DB connection
async function main() {
    await mongoose.connect("mongodb+srv://Zoom:Zoom0117@zoom.rxnv43m.mongodb.net/");
}
main().then(() => {
    console.log("DB is connected");
}).catch(err => console.log(err));

app.set("port", (process.env.PORT || 8000));

const start = async () => {
    server.listen(app.get("port"), () => {
        console.log(`app is listing to the port 8000`);
    });
}
start();



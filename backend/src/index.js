// import dotenv  from "dotenv"

// import express from "express";

// import cookieParser from "cookie-parser"

// import authRoutes from "./routes/auth.route.js";

// import messageRoutes from "./routes/message.route.js"
// import cors from "cors"

// import path from "path";

// import { connectDB } from "./lib/db.js";
// import {app,server} from "./lib/socket.js"

// dotenv.config()

// const PORT=process.env.PORT;
// const __dirname = path.resolve();

// app.use(express.json())

// app.use(cookieParser())
// app.use(cors({
//  origin: "http://localhost:5173",
//  credentials: true,
// }))


// app.use("/api/auth",authRoutes);
// app.use("/api/messages",messageRoutes)

// if(process.env.NODE_ENV==="production"){
//   app.use(express.static(path.join(__dirname,"..frontend/dist")))

  
//   app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"..","frontend","dist","index.html"))
//   })
// }
// console.log(`port no is ${PORT}`)
// server.listen(PORT,()=>{
//   console.log("server is running on port:"+ PORT)
//   connectDB()
// })

import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ✅ Register your API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ 🔍 Log all registered routes to help debug
console.log("🔍 Registered Back-end Routes:");
app._router.stack.forEach((layer) => {
  if (layer.route && layer.route.path) {
    const methods = Object.keys(layer.route.methods).join("|").toUpperCase();
    console.log(`${methods} → ${layer.route.path}`);
  } else if (layer.name === "router" && layer.handle.stack) {
    layer.handle.stack.forEach((nestedLayer) => {
      if (nestedLayer.route) {
        const methods = Object.keys(nestedLayer.route.methods).join("|").toUpperCase();
        console.log(`${methods} → ${nestedLayer.route.path}`);
      }
    });
  }
});

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
  });
}

console.log(`port no is ${PORT}`);
server.listen(PORT, () => {
  console.log("🚀 Server is running on port: " + PORT);
  connectDB();
});
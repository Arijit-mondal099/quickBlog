import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnection from "./configs/db.config.js";

const app = express();
const PORT = process.env.PORT || 4000;
await dbConnection(); // data base connection

// ========== Middlewares ==========
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(
  cors({
    origin: "https://quick-blog-nine-kappa.vercel.app/",
    credentials: true,
  })
);

// ========== Routes ===============
import adminRouter from "./routes/admin.routes.js";
import blogRouter from "./routes/blog.routes.js";
import commentRouter from "./routes/comment.routes.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/comments", commentRouter);

app.listen(PORT, () => {
  console.log(`server running at --> http://localhost:${PORT}`);
});

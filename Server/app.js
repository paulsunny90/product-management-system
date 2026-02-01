import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import { connectDB } from "./Config/db.js";

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Routes
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Redirect to login if not authenticated
app.get("/", (req, res) => {
    if (req.session.userId) {
        res.sendFile(path.join(__dirname, "..", "public", "dashboard.html"));
    } else {
        res.sendFile(path.join(__dirname, "..", "public", "login.html"));
    }
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }).catch((err) => {
        console.log("Server NOT started due to DB error", err);
    });


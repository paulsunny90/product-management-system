import express from "express";
const router = express.Router();
import path from "path";
import multer from "multer";
import * as productController from "../Controller/product.Controller.js";

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized" });
};

router.use(isAuthenticated);

router.get("/", productController.getAllProducts);
router.get("/report", productController.getReport);
router.get("/:id", productController.getProductById);
router.post("/", upload.single('image'), productController.addProduct);
router.put("/:id", upload.single('image'), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;


import { db } from "../Config/db.js";

// Get all products
export const getAllProducts = (req, res) => {
    db.query("SELECT * FROM products ORDER BY created_at DESC", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get single product
export const getProductById = (req, res) => {
    db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Product not found" });
        res.json(results[0]);
    });
};

// Add product
export const addProduct = (req, res) => {
    const { name, description, price, quantity } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !price || !quantity) {
        return res.status(400).json({ message: "Name, price, and quantity are required" });
    }

    db.query(
        "INSERT INTO products (name, description, price, quantity, image) VALUES (?, ?, ?, ?, ?)",
        [name, description, price, quantity, image],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Product added", id: result.insertId });
        }
    );
};

// Update product
export const updateProduct = (req, res) => {
    const { name, description, price, quantity } = req.body;
    let query = "UPDATE products SET name = ?, description = ?, price = ?, quantity = ?";
    let params = [name, description, price, quantity];

    if (req.file) {
        query += ", image = ?";
        params.push(req.file.filename);
    }

    query += " WHERE id = ?";
    params.push(req.params.id);

    db.query(query, params, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product updated" });
    });
};

// Delete product
export const deleteProduct = (req, res) => {
    db.query("DELETE FROM products WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    });
};

// Get report
export const getReport = (req, res) => {
    const query = `
        SELECT 
            COUNT(*) as totalProducts,
            SUM(quantity) as totalStock,
            SUM(price * quantity) as totalValue
        FROM products
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
};


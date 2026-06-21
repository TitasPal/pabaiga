const db = require('../db');
const asyncHandler = require('express-async-handler');

const getProducts = asyncHandler(async (req, res) => {
    const products = db.prepare('SELECT * FROM products').all();
    res.status(200).json(products);
});

const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }
    res.status(200).json(product);
});

const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, category, createdBy } = req.body;
    const stmt = db.prepare(`
        INSERT INTO products (name, price, description, image, category, createdBy)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(name, price, description, image, category, createdBy || null);
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!existing) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const { name, price, description, image, category } = req.body;
    db.prepare(`
        UPDATE products
        SET name = ?, price = ?, description = ?, image = ?, category = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `).run(
        name ?? existing.name,
        price ?? existing.price,
        description ?? existing.description,
        image ?? existing.image,
        category ?? existing.category,
        id
    );
    const updatedProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }
    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    res.status(200).json(product);
});

module.exports = {
    getProducts, getProduct, createProduct, updateProduct, deleteProduct
};
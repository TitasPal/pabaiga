const db = require('../db');
const asyncHandler = require('express-async-handler');

const getUsers = asyncHandler(async (req, res) => {
    const users = db.prepare('SELECT * FROM users').all();
    res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    res.status(200).json(user);
});

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const stmt = db.prepare(`
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
    `);
    const info = stmt.run(username, email, password);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!existing) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { username, email, password } = req.body;
    db.prepare(`
        UPDATE users
        SET username = ?, email = ?, password = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `).run(
        username ?? existing.username,
        email ?? existing.email,
        password ?? existing.password,
        id
    );
    const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    db.prepare('DELETE FROM users WHERE id = ?').run(id);
    res.status(200).json();
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    if (password !== user.password) {
        res.status(404);
        throw new Error('incorrect password!');
    }
    res.status(200).json(user);
});

module.exports = {
    getUsers, getUser, createUser, updateUser, deleteUser, loginUser
};
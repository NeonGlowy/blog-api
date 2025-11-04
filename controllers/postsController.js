const pool = require('../db');

exports.getAllPosts = async (req, res) => {
  const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
  res.json(result.rows);
};

exports.getPostById = async (req, res) => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [req.params.id]);
  res.json(result.rows[0]);
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const result = await pool.query(
    'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  res.status(201).json(result.rows[0]);
};

exports.updatePost = async (req, res) => {
  const { title, content } = req.body;
  const result = await pool.query(
    'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
    [title, content, req.params.id]
  );
  res.json(result.rows[0]);
};

exports.deletePost = async (req, res) => {
  await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
  res.status(204).send();
};

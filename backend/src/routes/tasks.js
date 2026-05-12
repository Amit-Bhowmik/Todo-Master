// routes/tasks.js - Task CRUD routes
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get MySQL user_id from Firebase UID
async function getUserId(firebase_uid) {
  const [rows] = await pool.query(
    'SELECT id FROM users WHERE firebase_uid = ?',
    [firebase_uid]
  );
  return rows.length > 0 ? rows[0].id : null;
}

router.post('/add-task', async (req, res) => {
  const { firebase_uid, task, due_date } = req.body;

  if (!firebase_uid || !task) {
    return res.status(400).json({ error: 'firebase_uid and task are required' });
  }

  try {
    const user_id = await getUserId(firebase_uid);
    if (!user_id) {
      return res.status(404).json({ error: 'User not found. Please register first.' });
    }

    const [result] = await pool.query(
      'INSERT INTO tasks (user_id, task, due_date, status) VALUES (?, ?, ?, ?)',
      [user_id, task, due_date || null, 'uncompleted']
    );

    res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
  } catch (err) {
    console.error('Create task error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/tasks/:uid', async (req, res) => {
  const { uid } = req.params;
  const { status } = req.query; 

  try {
    const user_id = await getUserId(uid);
    if (!user_id) {
      return res.status(200).json([]);
    }

    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [user_id];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const [tasks] = await pool.query(query, params);
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Get tasks error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/task/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Get single task error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/task/:id', async (req, res) => {
  const { id } = req.params;
  const { task, due_date, status } = req.body;

  if (!task && !due_date && !status) {
    return res.status(400).json({ error: 'At least one field (task, due_date, status) is required' });
  }

  if (status && !['completed', 'uncompleted'].includes(status)) {
    return res.status(400).json({ error: 'status must be "completed" or "uncompleted"' });
  }

  try {
    const fields = [];
    const params = [];

    if (task) {
      fields.push('task = ?');
      params.push(task);
    }
    if (due_date !== undefined) {
      fields.push('due_date = ?');
      params.push(due_date || null);
    }
    if (status) {
      fields.push('status = ?');
      params.push(status);
    }

    params.push(id); 

    const [result] = await pool.query(
      `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`,
      params
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error('Update task error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/task/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM tasks WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Delete task error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

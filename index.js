import express from 'express';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase init
const supabase = createClient(
  'https://pumccfbxjswnoxyqsdgk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bWNjZmJ4anN3bm94eXFzZGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNDg3NDEsImV4cCI6MjA1OTkyNDc0MX0.hXgO99Z9NOKNFs6j4fSDU-sDGu_TFBnNExymzplFB30' // DO NOT use service_role key here
);

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', express.static(path.join(__dirname, './public')));

// GET /user - fetch by email
app.get('/user', async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: 'Email not provided in request query' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'User not found', status: 404 });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected error', details: err.message });
  }
});

// POST /user - add new user
app.post('/user', async (req, res) => {
  const { email, password, gender, phone, name } = req.body;

  if (!email || !password || !gender || !phone || !name) {
    return res.status(400).json({ error: 'All fields are required: email, password, gender, phone, name' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password, gender, phone, name }])
      .select();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'User with this email or phone already exists' });
      }
      return res.status(500).json({ error: 'Database error', details: error.message });
    }

    res.status(201).json({ message: 'User added successfully', user: data[0] });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected error', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on https://wayfar.netlify.app/:${port}`);
});

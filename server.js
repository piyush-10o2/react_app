const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// Enable JSON request body parsing
app.use(express.json());

// MongoDB setup
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

app.post('/register', async (req, res) => {
  const userData = req.body;

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');

    const db = client.db('edudb'); // Replace with your database name
    const usersCollection = db.collection('Users');

    const result = await usersCollection.insertOne(userData);

    console.log(`User registered with ID: ${result.insertedId}`);

    // Send a success response to the client
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Error registering user:', err);
    // Send an error response to the client
    res.status(500).json({ error: 'Registration failed' });
  } finally {
    client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

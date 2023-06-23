const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const { Pool } = require('pg');

const app = express();
const port = 3000;
const mongoUrl = 'mongodb://db:27017'; // Update with your MongoDB connection details

// Middleware for parsing JSON requests
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'postgres-db', // Hostname of the PostgreSQL service
  port: 5432, // Port mapped in the docker-compose.yml file
  database: 'performance',
});

// Get all teacher
app.get('/api/teacher', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db('mongo-db');

    const teacher = await db.collection('teacher').find().toArray();

    client.close();
	
    res.json(teacher);
  } catch (error) {
    console.error('Error retrieving teacher:', error);
    res.status(500).json({ error: 'Failed to retrieve teacher' });
  }
});

// Create teacher
app.post('/api/teacher', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db('mongo-db');
    const teachersCollection = db.collection('teacher');
    const { firstname, lastname, email, phone, ratings } = req.body;

    const newTeacher = {
      firstname,
      lastname,
      email,
      phone,
      ratings
    };

    await teachersCollection.insertOne(newTeacher);
    client.close();
    res.status(201).json({ message: 'Teacher created successfully' });
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Edit Teacher
app.put('/api/teacher/:id', async (req, res) => {
  try {
    const teacherId = req.params.id;

    const client = await MongoClient.connect(mongoUrl);
    const db = client.db('mongo-db');
    const teachersCollection = db.collection('teacher');

    const { firstname, lastname, email, phone, ratings } = req.body;
    const updatedTeacher = {
      firstname,
      lastname,
      email,
      phone,
      ratings
    };

    const result = await teachersCollection.updateOne(
      { _id: new ObjectId(teacherId) },
      { $set: updatedTeacher }
    );

    client.close();

    if (result.modifiedCount === 1) {
      res.json({ message: 'Teacher updated successfully' });
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete teacher 
app.delete('/api/teacher/:id', async (req, res) => {
  try {
    const teacherId = req.params.id;

    const client = await MongoClient.connect(mongoUrl);
    const db = client.db('mongo-db');

    const teachersCollection = db.collection('teacher');
    const result = await teachersCollection.deleteOne({ _id: new ObjectId(teacherId) });

    client.close();

    if (result.deletedCount === 1) {
      res.json({ message: 'Teacher deleted successfully' });
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get all modules
app.get('/api/module', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db('mongo-db');

    const module = await db.collection('module').find().toArray();

    client.close();
	
    res.json(module);
  } catch (error) {
    console.error('Error retrieving module:', error);
    res.status(500).json({ error: 'Failed to retrieve module' });
  }
});

// Create module
app.post('/api/module', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db('mongo-db');
    const moduleCollection = db.collection('module');
    const { number, title, author, year, ratings } = req.body;

    const newModule = {
      number,
      title,
      author,
      year,
      ratings
    };

    await moduleCollection.insertOne(newModule);
    client.close();
    res.status(201).json({ message: 'Module created successfully' });
  } catch (error) {
    console.error('Error creating module:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Edit module
app.put('/api/module/:id', async (req, res) => {
  try {
    const moduleId = req.params.id;

    const client = await MongoClient.connect(mongoUrl);
    const db = client.db('mongo-db');
    const moduleCollection = db.collection('module');

    const { number, title, author, year, ratings } = req.body;
    const updatedModule = {
      number,
      title,
      author,
      year,
      ratings
    };

    const result = await moduleCollection.updateOne(
      { _id: new ObjectId(moduleId) },
      { $set: updatedModule }
    );

    client.close();

    if (result.modifiedCount === 1) {
      res.json({ message: 'Module updated successfully' });
    } else {
      res.status(404).json({ message: 'Module not found' });
    }
  } catch (error) {
    console.error('Error updating module:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete module 
app.delete('/api/module/:id', async (req, res) => {
  try {
    const moduleId = req.params.id;

    const client = await MongoClient.connect(mongoUrl);
    const db = client.db('mongo-db');

    const moduleCollection = db.collection('module');
    const result = await moduleCollection.deleteOne({ _id: new ObjectId(moduleId) });

    client.close();

    if (result.deletedCount === 1) {
      res.json({ message: 'Module deleted successfully' });
    } else {
      res.status(404).json({ message: 'Module not found' });
    }
  } catch (error) {
    console.error('Error deleting module:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/performance', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db('mongo-db');
    const performanceCollection = db.collection('performance');
	const randomvalue = Math.floor(Math.random() * 100000);
    

    // Erstelle 10000 Datensätze in der "performance" Collection
    const performanceRecords = [];
    for (let i = 1; i <= 10000; i++) {
      performanceRecords.push({ test: randomvalue });
    }
    const createStartTime = Date.now();
    await performanceCollection.insertMany(performanceRecords);

    const createEndTime = Date.now();
    const createTime = createEndTime - createStartTime;
	
	// Lese 10000 Datensätze in der "performance" Collection
	const readStartTime = Date.now();
    const data = await performanceCollection.find().limit(10000).toArray();

    const readEndTime = Date.now();
    const readTime = readEndTime - readStartTime;
	
	
	// Lösche 10000 Datensätze in der "performance" Collection
	const deleteStartTime = Date.now();
	const deleteData = await performanceCollection.deleteMany({ test: randomvalue });
    const deleteEndTime = Date.now();
    const deleteTime = deleteEndTime - deleteStartTime;
	
    client.close();

    res.json({ createTime: createTime, readTime: readTime, deleteTime: deleteTime});
  } catch (error) {
    console.error('Error creating performance records:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/performance/pg', async (req, res) => {
  try {
	const randomvalue = Math.floor(Math.random() * 100000);
    const values = Array.from({ length: 10000 }, () => [randomvalue]);
    const placeholders = values.map((_, index) => `($${index + 1})`).join(',');
    const query = {
      text: `INSERT INTO performance(value) VALUES ${placeholders}`,
      values: values.flat(),
    };
    const client = await pool.connect();
	const createStartTime = Date.now();
    await client.query(query);
	const createEndTime = Date.now();
	const createTime = createEndTime - createStartTime;
	
	const readQuery = {
      text: 'SELECT * FROM performance WHERE value = $1',
      values: [randomvalue],
    };
	const readStartTime = Date.now();
	const result = await client.query(readQuery);
	const readEndTime = Date.now();
	const readTime = readEndTime - readStartTime;
	
	const deletQuery = {
      text: 'DELETE FROM performance WHERE value = $1',
      values: [randomvalue],
    };
	const deleteStartTime = Date.now();
	const deleteResult = await client.query(deletQuery);
	const deleteEndTime = Date.now();
	const deleteTime = deleteEndTime - deleteStartTime;
	
    res.json({ createTime: createTime, readTime: readTime, deleteTime: deleteTime});
    client.release();
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('*', (req, res) => {
  res.send("Your Request URL: " + req.url);
});

pool.query(
  `CREATE TABLE IF NOT EXISTS performance (
    id SERIAL PRIMARY KEY,
    value INTEGER
  )`,
  (error, result) => {
    if (error) {
      console.error('Error creating table:', error);
    } else {
      console.log('Table "performance" created or already exists');
    }
  }
);

// Start the server
app.listen(port, async () => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db('mongo-db');

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(collection => collection.name);
    
    if (!collectionNames.includes('teacher')) {
      await db.createCollection('teacher');
      console.log('Created "teacher" collection.');
    }
	
	if (!collectionNames.includes('module')) {
      await db.createCollection('module');
      console.log('Created "module" collection.');
    }
	
	if (!collectionNames.includes('performance')) {
      await db.createCollection('performance');
      console.log('Created "performance" collection.');
    }

    client.close();

    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error('Error creating or checking collection:', error);
    process.exit(1);
  }
});


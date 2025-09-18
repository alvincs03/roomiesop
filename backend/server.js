const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let db = null;

const initializeFirebase = () => {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
      db = admin.firestore();
      console.log('Firebase Admin initialized successfully');
    } else {
      console.log('Firebase service account not provided. Using mock data.');
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
};

initializeFirebase();

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'RoomiesOp API is running!' });
});

app.get('/api/chores', async (req, res) => {
  try {
    if (db) {
      const choresRef = db.collection('chores');
      const snapshot = await choresRef.get();
      const chores = [];
      snapshot.forEach(doc => {
        chores.push({ id: doc.id, ...doc.data() });
      });
      res.json(chores);
    } else {
      const mockChores = [
        {
          id: '1',
          title: 'Take out trash',
          description: 'Empty all trash bins and take to curb',
          assignedTo: 'Alex',
          dueDate: '2024-01-15',
          completed: false,
          priority: 'medium',
          category: 'Cleaning',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Dishes',
          description: 'Wash and put away all dishes',
          assignedTo: 'Sarah',
          dueDate: '2024-01-14',
          completed: true,
          completedBy: 'Sarah',
          completedAt: new Date().toISOString(),
          priority: 'high',
          category: 'Kitchen',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Vacuum living room',
          description: 'Vacuum the entire living room area',
          assignedTo: 'Mike',
          dueDate: '2024-01-16',
          completed: false,
          priority: 'low',
          category: 'Cleaning',
          createdAt: new Date().toISOString()
        }
      ];
      res.json(mockChores);
    }
  } catch (error) {
    console.error('Error fetching chores:', error);
    res.status(500).json({ error: 'Failed to fetch chores' });
  }
});

app.get('/api/chores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (db) {
      const choreRef = db.collection('chores').doc(id);
      const doc = await choreRef.get();
      
      if (!doc.exists) {
        return res.status(404).json({ error: 'Chore not found' });
      }
      
      res.json({ id: doc.id, ...doc.data() });
    } else {
      const mockChores = [
        {
          id: '1',
          title: 'Take out trash',
          description: 'Empty all trash bins and take to curb',
          assignedTo: 'Alex',
          dueDate: '2024-01-15',
          completed: false,
          priority: 'medium',
          category: 'Cleaning'
        }
      ];
      
      const chore = mockChores.find(c => c.id === id);
      if (!chore) {
        return res.status(404).json({ error: 'Chore not found' });
      }
      
      res.json(chore);
    }
  } catch (error) {
    console.error('Error fetching chore:', error);
    res.status(500).json({ error: 'Failed to fetch chore' });
  }
});

app.post('/api/chores', async (req, res) => {
  try {
    const choreData = {
      ...req.body,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (db) {
      const docRef = await db.collection('chores').add(choreData);
      res.json({ id: docRef.id, ...choreData });
    } else {
      const newChore = {
        id: Date.now().toString(),
        ...choreData
      };
      res.json(newChore);
    }
  } catch (error) {
    console.error('Error creating chore:', error);
    res.status(500).json({ error: 'Failed to create chore' });
  }
});

app.put('/api/chores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    if (req.body.completed && !req.body.completedBy) {
      updateData.completedBy = 'You';
      updateData.completedAt = new Date().toISOString();
    }

    if (db) {
      const choreRef = db.collection('chores').doc(id);
      await choreRef.update(updateData);
      res.json({ id, ...updateData });
    } else {
      res.json({ id, ...updateData });
    }
  } catch (error) {
    console.error('Error updating chore:', error);
    res.status(500).json({ error: 'Failed to update chore' });
  }
});

app.delete('/api/chores/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (db) {
      await db.collection('chores').doc(id).delete();
      res.json({ message: 'Chore deleted successfully' });
    } else {
      res.json({ message: 'Chore deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting chore:', error);
    res.status(500).json({ error: 'Failed to delete chore' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    if (db) {
      const usersRef = db.collection('users');
      const snapshot = await usersRef.get();
      const users = [];
      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      res.json(users);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 RoomiesOp API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧹 Chores API: http://localhost:${PORT}/api/chores`);
});

module.exports = app;

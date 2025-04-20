import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './config/firebase';
import { LogoController } from './internal/features/controller';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as logoFunctions from './functions';

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp();
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const logoController = new LogoController();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'AI Logo API is running' });
});

// Logo routes
app.get('/api/logo-styles', (req, res) => logoController.getLogoStyles(req, res));
app.post('/api/generate-logo', (req, res) => logoController.generateLogo(req, res));
app.get('/api/logos/:id', (req, res) => logoController.getLogoById(req, res));

app.get('/api/logos', async (req, res) => {
  try {
    const logosSnapshot = await db.collection('logos').get();
    const logos = logosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(logos);
  } catch (error) {
    console.error('Error fetching logos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export const api = functions.https.onRequest(app);

export const getLogoStyles = logoFunctions.getLogoStyles;
export const generateLogo = logoFunctions.generateLogo;
export const getLogoById = logoFunctions.getLogoById; 
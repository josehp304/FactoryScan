import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Factory Scan API is running' });
});

import refundRoutes from './routes/refund.js';
import documentRoutes from './routes/document.js';
import idRoutes from './routes/id.js';
import reviewRoutes from './routes/review.js';
import userRoutes from './routes/user.js';

app.use('/api/v1/refund', refundRoutes);
app.use('/api/v1/document', documentRoutes);
app.use('/api/v1/id', idRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './database/sequelize';

import teacherRoutes from './routes/teacherRoutes';
import classRoutes from './routes/classRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000

const startServer = async () => {
    try {
      await sequelize.authenticate();
      console.log('Database is connected');

      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };

const API_TEACHER_PREFIX = process.env.API_TEACHER_PREFIX || '/api';
const API_CLASSES_PREFIX = process.env.API_CLASSES_PREFIX || '/api';

const teacher_basePath = `${API_TEACHER_PREFIX}`
const classes_basePath = `${API_CLASSES_PREFIX}`

const app = express();

app.use(cors());
app.use(express.json());

app.use(`${teacher_basePath}`, teacherRoutes);
app.use(`${classes_basePath}`, classRoutes);

// I am doing a global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

startServer()

export default app;
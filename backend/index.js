import express from 'express';
import publicationRoutes from './routes/publicationRoutes.js';

const app = express();

app.use(express.json()); // for parsing JSON
app.use(express.urlencoded({ extended: true })); // for parsing form-data text fields

app.use('/publications', publicationRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

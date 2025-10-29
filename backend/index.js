import express from 'express';
import cors from 'cors';
import publicationRoutes from './routes/publicationRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
}));


app.use('/publications', publicationRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

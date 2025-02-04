import express from 'express';
import bodyParser from 'body-parser';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const dbPath = path.join(__dirname, 'db', 'plant.db');
const dbPath = './db/plant.db';

async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

app.post('/save-plant', async (req, res) => {
  const { searchTerm, soil, perlite, vermiculite, peatmoss, response } = req.body;
  const db = await openDb();
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS plants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        searchTerm TEXT,
        soil INTEGER,
        perlite INTEGER,
        vermiculite INTEGER,
        peatmoss INTEGER,
        response TEXT
      )
    `);

    const stmt = await db.prepare('INSERT INTO plants (searchTerm, soil, perlite, vermiculite, peatmoss, response) VALUES (?, ?, ?, ?, ?, ?)');
    await stmt.run(searchTerm, soil, perlite, vermiculite, peatmoss, response);
    await stmt.finalize();

    res.status(200).json({ message: 'Plant data saved successfully' });
  } catch (error) {
    console.error('Error saving plant data:', error);
    res.status(500).json({ error: 'Failed to save plant data' });
  } finally {
    await db.close();
  }
});


app.get('/get-plant', async (req, res) => {
    const { searchTerm } = req.query;
    const db = await openDb();
    try {
      const plant = await db.get('SELECT * FROM plants WHERE searchTerm = ?', [searchTerm]);
      if (plant) {
        res.status(200).json(plant);
      } else {
        res.status(404).json({ message: 'Plant not found' });
      }
    } catch (error) {
      console.error('Error fetching plant data:', error);
      res.status(500).json({ error: 'Failed to fetch plant data' });
    } finally {
      await db.close();
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
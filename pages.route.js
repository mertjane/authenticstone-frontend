import express from 'express';
import axios from 'axios';
const router = express.Router();

const WORDPRESS_API = 'https://www.karakedi.xyz/wp-json/wp/v2';

router.get('/:slug', async (req, res) => {
  try {
    const { data } = await axios.get(`${WORDPRESS_API}/pages?slug=${req.params.slug}`);
    res.json(data[0] || { error: 'Not found' });
  } catch { res.status(500).send('Server error'); }
});

export default router;


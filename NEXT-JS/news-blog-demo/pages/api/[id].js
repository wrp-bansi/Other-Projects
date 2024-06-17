

import { news } from "@/Data/db";;

export default function handler(req, res) {
    const { id } = req.query;
    const singleNews = news.find(u => u.id == id);

    if (!singleNews) {
        return res.status(404).json({ error: 'news not found' });
      }

      if (req.method === 'GET') {
        res.status(200).json({ news: singleNews });
      } else {
        res.status(405).json({ error: 'Method Not Allowed' });
      }
}
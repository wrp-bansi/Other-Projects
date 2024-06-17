




import { news } from "@/Data/db";

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Assuming news is an array of news items
    res.status(200).json({ news: news });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}



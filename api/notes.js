export default function handler(req, res) {
  const password = process.env.NOTES_PASSWORD;
  const notes = JSON.parse(process.env.NOTES_DATA);

  const userPassword = req.query.pw;

  if (userPassword !== password) {
    return res.status(403).json({ error: "Invalid password" });
  }

  res.status(200).json({ notes });
}

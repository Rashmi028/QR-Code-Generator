import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Set EJS as the view engine

app.post("/submit", (req, res) => {
  // Get the URL from the form body
  const url = req.body.url;

  // Generate the QR code
  const qr_svg = qr.image(url, { type: 'png' });

  // Encode the QR code as a data URL
  const dataUrl = qr.imageSync(url, { type: 'png' });

  // Render the EJS template with the data URL
  res.render('index', { dataUrl });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs"; // Import the 'fs' module for file operations
import qr from "qr-image";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  // Get the URL from the form body
  const url = req.body.url;

  // Generate the QR code
  const qr_svg = qr.image(url, { type: 'png' });

  // Create a unique filename for the QR code (you might want to make this more robust)
  const filename = `i_love_qr.png`;

  // Pipe the QR code image to a file
  const qrStream = qr_svg.pipe(fs.createWriteStream(`public/${filename}`));

  // Handle the end of the stream
  qrStream.on('finish', () => {
    // Send the generated QR code filename as a response to the client
    res.send(filename);
  });

  // Handle any errors during the stream
  qrStream.on('error', (err) => {
    console.error('Error generating QR code:', err);
    // Send an error response back to the client
    res.status(500).send('Internal Server Error');
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
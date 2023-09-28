import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
// import inquirer from 'inquirer';
// import { url } from "inspector";
import { body, validationResult } from "express-validator"
import qr from "qrcode"
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

// app.post("/submit", (req, res) => {
//     var name= req.body;
//     console.log(name);
//     // var qr_svg = qr.image(URL, { type:'png'});
//     // qr_svg.pipe(fs.createWriteStream('i_love_qr.png'));
//     // var svg_string = qr.imageSync(URL, { type: 'png' });
//   });
//  app.get("/submit",(req,res)=>{
//      console.log(req.body);
//  }) ;
 
  
// inquirer
//   .prompt([
//     {
//     /* Pass your questions in here */
//     message:"Type in your URL:",
//     name:"URL",
   
//     },
//   ])
//   .then((answers) => {
//     const url=answers.URL;
//     var qr_svg = qr.image(url, { type:'png'});
//     qr_svg.pipe(fs.createWriteStream('i_love_qr.png'));
//     var svg_string = qr.imageSync(url, { type: 'png' });
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       console.log("Some error occured!");
//     } else {
//      console.log("something else went wrong");
//     }
//   });
//   app.listen(port, () => {
//     console.log(`Listening on port ${port} `);
//   });
app.post(
    '/submit',
    [
        body('url').isURL().withMessage('Please enter a valid URL'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { url } = req.body;

        qrcode.toDataURL(url, (err, qrCodeData) => {
            if (err) {
                return res.status(500).send('An error occurred while generating the QR code.');
            }

            res.send(`
                <h2>QR Code Generated:</h2>
                <img src="${qrCodeData}" alt="QR Code">
            `);
        });
    }
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

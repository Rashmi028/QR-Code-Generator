import express from "express";
// import bodyParser from "body-parser";
// import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import inquirer from 'inquirer';
import { url } from "inspector";
import qr from "qr-image"
// const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
// const port = 3000;
// app.use(bodyParser.urlencoded({extended:true}));
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
//   });
// app.post("/submit", (req, res) => {
//     console.log(req.body);
//   });

  
inquirer
  .prompt([
    {
    /* Pass your questions in here */
    message:"Type in your URLs:",
    name:"URL",
    },
  ])
  .then((answers) => {
    const url=answers.URL;
    var qr_svg = qr.image(url, { type:'png'});
    qr_svg.pipe(fs.createWriteStream('i_love_qr.png'));
    var svg_string = qr.imageSync(url, { type: 'png' });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Some error occured!");
    } else {
     console.log("something else went wrong");
    }
  });
  // app.listen(port, () => {
  //   console.log(` `);
  // });
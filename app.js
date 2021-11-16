import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from "path";
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
let notes = [];
app.get("/", (req, res) => {
    res.render('notes', { notes: notes })
})
app.get("/add", (req, res) => {
    res.render('add');
})
app.post("/add", (req, res) => {
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.body.linkURL);
    console.log(req.body.linkText);
    notes = [...notes, {
        title: req.body.title,
        description: req.body.description,
        linkURL: req.body.linkURL,
        linkText: req.body.linkText
    }];
    res.redirect("/");
})
app.listen(3000, () => {
    console.log("Server running at 3000");
})

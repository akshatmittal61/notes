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
    notes = [...notes, {
        title: req.body.title,
        description: req.body.description,
        linkURL: req.body.linkURL,
        linkText: req.body.linkText
    }];
    notes.map((note) => {
        if (note.linkURL === "" || note.linkURL === "#") {
            note.linkURL = "#";
        }
        else {
            if (note.linkText === "") note.linkText = "Click Here";
            if (note.linkURL.slice(0, 4) !== "http") {
                note.linkURL = "https://" + note.linkURL;
            }
        }
        return note;
    })
    res.redirect("/");
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})

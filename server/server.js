const express = require("express")
const path = require("path");
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { type } = require("os");
const { stringify } = require("querystring");

const { title } = require("process");

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

const Schema = mongoose.Schema 

// user schema
const userSchema = Schema ({
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true},
    resetToken: String,
    resetTokenExpiry: String
})

//note schema
const noteSchema = Schema ({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: {type: String, required: true},
    content: {type: String, required: true},
    tags: [String],
    color: String,
    archived: {type: Boolean, default: false},
    lastEdited: {type: Date, default: Date.now}
})

const User = mongoose.model('User', userSchema);
const Note = mongoose.model("Note", noteSchema)

// auth middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '')

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        next()

    } catch(error){
        res.status(401).json({error: "Authentication required"})
    }

}

//routes
app.post("/api/signup", async (req, res) => {
    try {
        const [ email, password ] = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({email, password: hashedPassword});
        await user.save();
        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET)
        res.status(201).send({token})
    } catch(error) {
        res.status(400).send(error)
    }
})

app.post("/api/login", async (req, res) => {
    try {
        const { email, password} = req.body
        const user = User.findOne({ email});
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('Invalid credentials')
        }
        const token = jwt.sign(({id: user._id}), process.env.JWT_SECRET);
        res.send({ token })
    } catch (error) {
        res.status(400).send({error: error.message });
    }
})

app.post("/api/notes", auth, async (req, res) => {
    try {
        const note = new Note({...req.body, userid: req.user._id})
        await note.save();
        res.status(201).send(note)
    } catch (error) {
        res.status.send(error)
    }
})

app.get("/api/notes", auth, async (req, res) => {
    const match = { userId: req.user._id};
    if (req.query.archived) match.archived = req.query.archived === true;
    if (req.query.tag) match.tag = req.query.tag;
    if (req.query.search) {
        match.$or = [
            {title: {$regex: req.query.search, $options: 'i'}},
            {content: {$regex: req.query.search, $options: 'i'}},
            {tag: {$regex: req.query.search, $options: 'i'}}
        ]
    }
    try {
        const notes = await Notes.find(match).sort({ createdAt: -1});
        res.send(notes);
    } catch(error) {
        res.status(500).send(error)
    }
})

app.get("/api/notes/:_id", auth, async (req, res) => {
    try {
        const note = await Note.fineOneAndUpdate(
            {_id: req.params.id, userId: req.user._id},
            req.body,
            {new: true}
        );
        if (!note) return res.status(404).send();
        res.send(note)
    } catch(error) {
        res.status(400).send(error)
    }
})

app.delete("/api/notes/:_id", auth, async (req, res) => {
    try {
        const note = await Note.FineOneAndDelete({_id: req.params.id, userid: req.user._id})
        if (!note) return res.status(404).send();
        res.send(note)
    } catch(error) {
        res.status(500).send(error)
    }
})

app.use("/api", require("./routes"));

const PORT = 3000;
app.listen(PORT)
const express = require("express")
const path = require("path");
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


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
    lastEdited: {type: Date, default: Date.now}
})

const archiveSchema = Schema ({
    originalId: {type: mongoose.Schema.ObjectId, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: {type: String, required: true},
    content: {type: String, required: true},
    tags: [String],
    color: String,
    lastEdited: {type: Date, default: Date.now},
    archivedAt: {type: Date, default: Date.now}
})

const User = mongoose.model('User', userSchema);
const Note = mongoose.model("Note", noteSchema);
const Archive = mongoose.model("Archive", archiveSchema)

// auth middleware to authenticate incoming request
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

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
        const { email, password } = req.body;
        
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email and password are required' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        
        await user.save();

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                // Add any other non-sensitive user data
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }  // Add token expiration
        );

        res.status(201).json({ token });
        console.log('Request body:', req.body);
        console.log('Found user:', user);

    } catch (error) {
        console.error(error);  // Log full error for debugging

        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({ 
                error: 'Email already exists' 
            });
        }

        // Generic error response
        res.status(500).json({ 
            error: 'Error creating account' 
        });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password} = req.body
        const user = await User.findOne({ email});
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('Invalid credentials')
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.send({ token })
    } catch (error) {
        console.log(error.message)
        res.status(400).send({error: error.message });
    }
})

app.post("/api/notes", auth, async (req, res) => {
    try {
        const note = new Note({...req.body, userId: req.user._id})
        await note.save();
        res.status(201).send(note)
    } catch (error) {
        res.status(400).send(error)
    }
})



app.get("/api/notes", auth, async (req, res) => {
    const match = { userId: req.user._id};
    
    if (req.query.tag) match.tags = req.query.tag;
    if (req.query.search) {
        match.$or = [
            {title: {$regex: req.query.search, $options: 'i'}},
            {content: {$regex: req.query.search, $options: 'i'}},
            {tags: {$regex: req.query.search, $options: 'i'}}
        ]
    }
    try {
        const notes = await Note.find(match).sort({ createdAt: -1});
        res.send(notes);
    } catch(error) {
        res.status(500).send(error)
    }
})

app.get("/api/notes/archived", auth, async (req, res) => {
    const match = { userId: req.user._id};
    
    if (req.query.tag) match.tags = req.query.tag;
    if (req.query.search) {
        match.$or = [
            {title: {$regex: req.query.search, $options: 'i'}},
            {content: {$regex: req.query.search, $options: 'i'}},
            {tags: {$regex: req.query.search, $options: 'i'}}
        ]
    }
    try {
        const archivedNotes = await Archive.find(match).sort({ archivedAt: -1});
        res.send(archivedNotes);
    } catch(error) {
        res.status(500).send(error)
    }
})


app.put("/api/notes/:_id", auth, async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            {_id: req.params._id, userId: req.user._id},
            {...req.body, lastEdited: Date.now()},
            {new: true}
        );
        if (!note) return res.status(404).send();
        res.send(note)
    } catch(error) {
        res.status(400).send(error)
    }
})

app.put("/api/notes/archived/:_id", auth, async (req, res) => {
    try {
        const archivedNote = await Archive.findOneAndUpdate(
            {_id: req.params._id, userId: req.user._id},
            {...req.body, lastEdited: Date.now()},
            {new: true}
        );
        if (!archivedNote) return res.status(404).send();
        res.send(archivedNote)
    } catch(error) {
        res.status(400).send(error)
    }
})

app.get("/api/notes/:_id", auth, async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params._id,
            userId: req.user._id
        })
        

        if (!note) return res.status(404).send("Note not found")
        res.send(note)
    } catch (error) {
        res.status(500).send("Server error")
    }
})

app.get("/api/notes/archived/:_id", auth, async (req, res) => {
    try {
        const archivedNote = await Archive.findOne({
            _id: req.params._id,
            userId: req.user._id
        })
        

        if (!archivedNote) return res.status(404).send("Note not found")
        res.send(archivedNote)
    } catch (error) {
        res.status(500).send("Server error")
    }
})

app.post("/api/notes/:_id/archive", auth, async (req, res) => {
    try {
        //find and verify the note belongs to the user
        const note = await Note.findOne({
            _id: req.params._id,
            userId: req.user._id
        });

        if(!note) {
            return res.status(404).send({error: "Note not found"})
        }

        //create archived version
        const archivedNote = new Archive({
            originalId: note._id,
            userId: note.userId,
            title: note.title,
            content: note.content,
            tags: note.tags,
            createdAt: note.createdAt
        })

        await archivedNote.save() //save archived note
        await note.deleteOne() //delete note 

        res.send(archivedNote)
    } catch (error) {
        res.status(500).send(error)
    }
})

//restore note end point
app.post("/api/notes/archived/:_id/restore", auth, async (req, res) => {
    try {

        const archivedNote = await Archive.findOne({
            _id: req.params._id,
            userId: req.user._id
        })

        if(!archivedNote) {
            res.status(404).send({error: "Archived not not found"})
        }

        //create active note
        const note = new Note({
            userId: archivedNote.userId,
            title: archivedNote.title,
            content: archivedNote.content,
            tags: archivedNote.tags,
            createdAt: archivedNote.createdAt
        })

        await note.save();
        await archivedNote.deleteOne();

        res.send(note);

    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete("/api/notes/:_id", auth, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({_id: req.params._id, userId: req.user._id})
        if (!note) return res.status(404).send();
        res.send(note)
    } catch(error) {
        res.status(500).send(error)
    }
})

app.use("/api", require("./routes"));

const PORT = 3000;
app.listen(PORT)
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dotenv').config()
const bodyParser = require('body-parser') // Parse bodies
const ejs = require('ejs') // We are using ejs to render the data from database out to the page


app.set('view engine', 'ejs') 

app.use(bodyParser.urlencoded({ extended: true })) // Middleware for parsing request bodies

mongoose.connect(process.env.MONGO_DB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
}) // Connect our app to mongodb

const mysteryBoardSchema = mongoose.Schema( // Mysteryboard Schema
    { name: String, content: String, date: Number, hearts: Number }
)

const MysteryBoard = mongoose.model('MysteryBoard', mysteryBoardSchema) // Model

app.use(express.static(path.join(__dirname, 'public'))) // /public

app.get('/mysteryboards', (req, res) => { // /mysteryboards 
    MysteryBoard.find({}, (err, mysteryboards) => { // Search mongo for mysteryboards data
        res.render('mysteryboards', { // Render the data to the page
            dayjs: dayjs, // Pass in dayjs for our dates
            mysteryBoards: mysteryboards // Pass in mysteryboards data
        })
    }).sort({hearts: -1}) // Sort from most to least hearted
})

app.post('/mysteryboards', (req, res) =>  { // Posting data from /mysteryboards
    let newMysteryBoard = new MysteryBoard(
    { name: req.body.name, content: req.body.content, date: req.body.date, hearts: 0 }
    )
    newMysteryBoard.save()
    res.redirect(req.get('referer')) 
})

app.post('/', (req, res) =>  { // Posting data from /index
    let newMysteryBoard = new MysteryBoard(
    { name: req.body.name, content: req.body.content, date: req.body.date, hearts: 0 }
    )
    newMysteryBoard.save()
    res.redirect('/mysteryboards')
})

app.put('/mysteryboards/:id/heart', async (req, res) => { // Handle heart 
    try {
        // Increment the heart count for the post by 1
        const increment = await MysteryBoard.findByIdAndUpdate(req.params.id, { $inc: { hearts: 1 }}, { new: true })
        console.log(increment.hearts) // 1 { hearts: 1 }
    } catch (err) {
        console.log(err.message)
    }
})

app.put('/mysteryboards/:id/unheart', async (req, res) => { // Handle unheart
    try {
        // Decrement the heart count for the post by 1
        const decrement = await MysteryBoard.findByIdAndUpdate(req.params.id, { $inc: { hearts: -1 }}, { new: true })
        console.log(decrement.hearts) // { hearts: 0 }
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`)) // Listen for a client connection
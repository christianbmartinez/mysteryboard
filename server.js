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

const mysteryBoardSchema = mongoose.Schema(
    { name: String, content: String, date: Number }
)

const MysteryBoard = mongoose.model('MysteryBoard', mysteryBoardSchema)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/index', (req, res) => {
    MysteryBoard.find({}, (err, mysteryboard) => { 
        res.render('index', {
            mysteryBoardList: mysteryboard, 
            postedDay: dayjs(mysteryboard.date).toNow() // Get s/m/h/date
        })
    }).sort({date: -1}) // Sort from newest to oldest

})

app.post('/', (req, res) => {
    let newMysteryBoard = new MysteryBoard(
    { name: req.body.name, content: req.body.content, date: req.body.date }
    )
    newMysteryBoard.save()
    res.redirect('/index')
})

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`)) // Listen for a client connection
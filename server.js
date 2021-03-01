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
    { name: String, content: String, date: Number, hearts: Number }
)

const MysteryBoard = mongoose.model('MysteryBoard', mysteryBoardSchema)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/mysteryboards', (req, res) => {
    MysteryBoard.find({}, (err, mysteryboards) => { 
        res.render('mysteryboards', {
            dayjs: dayjs,
            mysteryBoards: mysteryboards
        })
    }).sort({date: -1}) // Sort from newest to oldest

})

app.post('/', (req, res) =>  {
    let newMysteryBoard = new MysteryBoard(
    { name: req.body.name, content: req.body.content, date: req.body.date, hearts: 0 }
    )
    newMysteryBoard.save()
    res.redirect('/mysteryboards')
})

// We have two endpoints - heart && unheart. 
// User hearts the post, goes to heart endpoint and the db should increment
// and update the heart by 1. /unheart should decrement the heart count by -1. 
// This works perfectly. The only problem is that the client has to refresh the page
// to view the updated data. Ideally, it should be synced. 

app.put('/mysteryboards/:id/heart', async (req, res) => {
    try {
        const increment = await MysteryBoard.findByIdAndUpdate(req.params.id, { $inc: { hearts: 1 }}, { new: true })
        console.log(increment.hearts) // 1 { hearts: 1 }
    } catch (err) {
        console.log(err.message)
    }
})

app.put('/mysteryboards/:id/unheart', async (req, res) => {
    try {
        const decrement = await MysteryBoard.findByIdAndUpdate(req.params.id, { $inc: { hearts: -1 }}, { new: true })
        console.log(decrement.hearts) // { hearts: 0 }
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`)) // Listen for a client connection
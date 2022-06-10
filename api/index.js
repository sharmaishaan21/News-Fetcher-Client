const express = require('express')
const authRoutes = require('./routes/auth')

require("./db")
require('dotenv').config();

var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'server running perfectly'
    })
})

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`newsFetcher backend listening at http://localhost:${port}`)
})
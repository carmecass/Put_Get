require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { mongoose } = require('pg-data')
const routes = require('./routes')


// const {env: {PORT, MONGO_URL : url} } = process;

const { env: { PORT, MONGO_URL: url }, argv: [, , port = PORT || 8080], } = process;

(async () => {

    try {

        await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

        console.log('Connection to data base')

        //express
        const app = express()

        app.use(cors())
        app.use('/api', routes)

        app.use(function (req, res, next) {
            res.status(404).json({ error: 'Not found' })
        })

        app.listen(port, () =>
            console.log(`servidor conectado al puerto ${PORT}`))

    }
    catch (error) {
        console.log(error.name, error.message)
    }

})()

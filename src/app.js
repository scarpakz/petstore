const express = require('express');
const app = express();
const axios = require('axios')
const cors = require('cors');
const bodyParser = require('body-parser')

// Query Instances
// const user = require('./dbquery/user')
// const notification = require('./dbquery/notification')
// const feeder = require('./dbquery/feeder')
// const blocker = require('./dbquery/blocker')

app.use(cors())
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

/**
 * GET QUERY
 */
app.get('/findByStatus', async (req, res) => {
    try {
        /**
         * Available
         * Pending
         * Sold
         */
        const status = req.query.status
        axios
        .get(`https://petstore3.swagger.io/api/v3/pet/findByStatus?status=${status}`)
        .then((response) => {
            res.json(response.data)
        })
    } catch (e) {
        console.log(e)
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})

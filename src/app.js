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
app.get('/users', async (req, res) => {
    try {
        const response = await user.getUsers();
        res.json(response)
    } catch (e) {
        console.log(e)
    }
})
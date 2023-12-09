const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios')
const cors = require('cors');
const bodyParser = require('body-parser')

// Query Instances
const user = require('./dbquery/user')
const notification = require('./dbquery/notification')
const feeder = require('./dbquery/feeder')
const blocker = require('./dbquery/blocker')

app.use(cors())
app.use(bodyParser.json());

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

app.get('/notifications', async (req, res) => {
    try {
        const response = await notification.getNotifications();

        // Format date and time for each schedule
        const formattedSchedules = response.map(schedule => {
            const { time, date } = separateDateTime(schedule.date);
            return { ...schedule, time, date };
        })

        res.json(formattedSchedules)

    } catch (e) {
        console.log(e)
    }
})

app.get('/feeder', async (req, res) => {
    try {
        const response = await feeder.getFeeder();
        res.json(response)
    } catch (e) {
        console.log(e)
    }
})

app.get('/blocker', async (req, res) => {
    try {
        const response = await blocker.getBlocker();
        res.json(response)
    } catch (e) {
        console.log(e)
    }
})

app.get('/blocker/status', async (req, res) => {
    try {
        const response = await blocker.getStatus();
        res.json(response)
    } catch (e) {
        console.log(e)
    }
})

app.get('/feeder/status', async (req, res) => {
    try {
        const response = await feeder.getStatus();
        res.json(response)
    } catch (e) {
        console.log(e)
    }
})

// Function to format date and time
function separateDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    // Use toLocaleString to format date and time according to the user's locale
    const time = dateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    const date = dateTime.toLocaleDateString('en-US');

    return { time, date };
}

app.get('/schedules', async (req, res) => {
    try {
        // 1 for blocker, 2 for feeder (ID)
        const blocker_response = await blocker.getBlocker();
        const feeder_response = await feeder.getFeeder();

        // Combine responses
        const allSchedules = [...blocker_response, ...feeder_response];

        // Format date and time for each schedule
        const formattedSchedules = allSchedules.map(schedule => {
            const { time, date } = separateDateTime(schedule.date);
            return { ...schedule, time, date };
        });

        res.json(formattedSchedules);
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});

// ADD QUERY
app.post('/add/notification', async (req, res) => {
    try {
        const { header, message } = req.body
        const response = await notification.addNotification({header, message});
        res.json(response)
    } catch (e) {
        console.log(e)
    }
})

app.post('/add/feeder', async (req, res) => {
    try {
        const { header, message } = req.body
        const response = await notification.addNotification({header, message});
        res.json(response)
    } catch (e) {
        console.log(e)
    }
})

// Update user
app.post('/update-password', async (req, res) => {
    try {
        const { password } = req.body;

        // Call the updateUserPassword function to update the password
        const updatedRows = await user.updateUserPassword({ id: 1, password });

        res.json({ success: true, updatedRows });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Update blocker status
app.post('/update-blocker-status', async (req, res) => {
    try {
        const { status } = req.body;

        // Call the updateUserPassword function to update the password
        const updatedRows = await blocker.updateBlocker({ status });

        res.json({ success: true, updatedRows });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Update feeder status
app.post('/update-feeder-status', async (req, res) => {
    try {
        const { status } = req.body;

        // Call the updateUserPassword function to update the password
        const updatedRows = await feeder.updateFeeder({ status });

        res.json({ success: true, updatedRows });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Add feeder schedule
app.post('/add-feeder-schedule', async (req, res) => {
    try {
        const { date } = req.body;

        const updatedRows = await feeder.saveFeederData(date);

        res.json({ success: true, updatedRows });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Add blocker schedule
app.post('/add-blocker-schedule', async (req, res) => {
    try {
        const { date } = req.body;

        const updatedRows = await blocker.saveBlockerData(date);

        res.json({ success: true, updatedRows });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Delete blocker schedule
app.post('/delete-blocker-schedule', async (req, res) => {
    try {
        const { id } = req.body;

        const updatedRows = await blocker.deleteSchedule(id);

        res.json({ success: true, updatedRows });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Delete feeder schedule
app.post('/delete-feeder-schedule', async (req, res) => {
    try {
        const { id } = req.body;

        const updatedRows = await feeder.deleteSchedule(id);

        res.json({ success: true, updatedRows });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})

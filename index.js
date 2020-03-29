const express = require('express');
const bodyParser = require("body-parser");
const server = require('./cron_job');

const app = express();
app.use(bodyParser.json());

try {
    server.scheduledJob('* * * * *');
} catch (error) {
    console.log(error)
}

app.listen(3000, () => {
    console.log("server on 3000");
});
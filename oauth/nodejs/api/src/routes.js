require('dotenv').config();
const express = require("express");
const bcrypt = require("bcrypt");
const { google } = require('googleapis');
const Redis = require("./redis");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const hashedPassword = await Redis.get(email);
    bcrypt.compare(password, hashedPassword, function (err, result) {
      if (err || !result) {
        return res.sendStatus(401);
      }
      if (result) {
        const buffer = Buffer.from(`${email}:${password}`);
        const basicCredentials = buffer.toString("base64");
        return res.json({ basic: basicCredentials });
      }
    });
  }else {
      return res.sendStatus(401);
  }
});

router.post("/oauth", async (req, res) => {
  const {code} = req.body;
  const {tokens} = await oauth2Client.getToken(code);
  Redis.setWithExpire('refresh_token', tokens.refresh_token, 86400);
  res.json({message: 'Permission received', success: true});
});

router.get("/events", async (req, res) => {
  const refresh_token = await Redis.get('refresh_token');
  oauth2Client.setCredentials({
    refresh_token,
  });
  const calendar = google.calendar({
    auth: oauth2Client,
    version: "v3"
  });
  calendar.events.list({
    calendarId: 'primary'
  }).then(result => {
    const events = result.data.items.splice(0, 10).map(item => eventFactory(item));
    res.json({events});
  }).catch(err => console.log(err));
});

router.get("/logout", async (req, res) => {
  const refresh_token = await Redis.get('refresh_token');
  oauth2Client.revokeToken(refresh_token).then(result => {
    Redis.remove('refresh_token');
    res.sendStatus(201);
  });
});

function eventFactory(data) {
  return {
    'start': data.start.dateTime,
    'end': data.start.dateTime,
    'summary': data.summary ? data.summary : ''
  };
}

module.exports = router;

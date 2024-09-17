const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
const path = require('path');

// Mailgun configuration
const DOMAIN = 'sandboxe6fa42e1c607473ab5208db0e517db07.mailgun.org'; // Replace with your Mailgun domain
const mg = mailgun({ apiKey: `7ef6bb8a9c86dfe4e4f553982bf2a03b-7a3af442-1862f9a7`, domain: DOMAIN });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '2.1p.html'));
});

app.post('/', (req, res) => {
    const { firstName, lastName, Email } = req.body;

    const data = {
        from: 'Dev@Deakin Newsletter <newsletter@sandboxe6fa42e1c607473ab5208db0e517db07.mailgun.org>',
        to: Email,
        subject: 'Newsletter Subscription',
        text: `Hello ${firstName} ${lastName},\n\nThank you for subscribing to our newsletter!`
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error.message);
        }
        res.send('You have Subscribed successful! Go and Check your email.');
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

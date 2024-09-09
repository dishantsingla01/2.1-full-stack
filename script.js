
const express = require("express");
const bodyParser = require("body-parser");
const sendGridMail = require('@sendgrid/mail'); 
const server = express();

// Set your SendGrid API key
sendGridMail.setApiKey('SG.xynosejdkD3rsSc6pUICqhHCB_Q.97_Cv9rbfe-My4HauXwKPmwheisvmhM6wgF2PVK4f'); // SendGrid API key

// Configure middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static("public"));

// Route to handle GET requests
server.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Route to handle POST requests
server.post('/', async (req, res) => {
    const userEmail = req.body.email;

    const emailContent = {
        to: userEmail, // Recipient's email address
        from: 'dishant4776.be23@chitkara.edu.in', // Your verified sender email
        subject: 'Welcome to Our Membership Program!',
        text: 'Congratulations! You are now a platinum member of our organization.',
    };

    try {
        const emailResponse = await sendGridMail.send(emailContent);
        console.log('Email successfully sent:', emailResponse);
        res.send("Subscription confirmed! Please check your email for details.");
    } catch (err) {
        console.error('Failed to send email:', err);
        res.send("Oops! There was an error, please try again.");
    }
});

// Start the server on port 8000
server.listen(8000, () => {
    console.log("Server is up and running on port 8000");
});

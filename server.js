const express = require("express");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/send-message", async (req, res) => {
try {
const message = req.body.message;

    if (!message || !message.trim()) {
        return res.status(400).json({
            success: false,
            error: "Please enter a message."
        });
    }

    const telegramResponse = await fetch(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: process.env.CHAT_ID,
                text: message.trim()
            })
        }
    );

    const result = await telegramResponse.json();

    if (!telegramResponse.ok || !result.ok) {
        return res.status(400).json({
            success: false,
            error: "Telegram could not send your message."
        });
    }

    res.json({ success: true });

} catch (error) {
    res.status(500).json({
        success: false,
        error: "Server connection error."
    });
}
});

app.listen(3000, () => {
console.log("Website is running at http://localhost:3000");
});
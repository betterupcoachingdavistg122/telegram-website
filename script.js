const form = document.getElementById("messageForm");

const messageInput = document.getElementById("message");

const status = document.getElementById("status");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const message = messageInput.value.trim();

    if (!message) {

        status.textContent = "Please enter a message.";

        return;

    }

    status.textContent = "Sending message...";

    try {

        const response = await fetch("/send-message", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({ message })

        });

        const result = await response.json();

        if (result.success) {

            status.textContent = "Message sent successfully!";

            messageInput.value = "";

        } else {

            status.textContent = result.error || "Message could not be sent.";

        }

    } catch (error) {

        status.textContent = "Connection error. Please try again.";

    }

});
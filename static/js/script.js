$(document).ready(function () {
    
    // Send message on button click
    $('#send-button').click(function () {
        sendMessage();
    });

    // Send message on Enter key press
    $('#message-input').keypress(function (event) {
        if (event.which === 13) { // Enter key
            event.preventDefault(); // Prevent form submission
            sendMessage();
        }
    });

    function sendMessage() {
        var userMessage = $('#message-input').val().trim();
        if (userMessage) {
            
            $('#chat-body').append('<div class="chat-message user">' + userMessage + '</div>');
            $('#message-input').val(""); // Clear input field
            $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight); // Scroll to the bottom

            $.ajax({
                url: '/chat',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ "message": userMessage }),
                success: function (response) {
                    // Append the AI's formatted response (which includes HTML)
                    $('#chat-body').append('<div class="chat-message bot">' + response.response + '</div>');
                    $('#chat-body').scrollTop($('#chat-body')[0].scrollHeight); // Scroll to the bottom
                },
                error: function (xhr, status, error) {
                    console.error("Error: " + error);
                }
            });
        }
    }
});

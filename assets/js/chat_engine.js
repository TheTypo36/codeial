class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;



        this.socket.on('connect', function () {
            console.log('connection established using socket....!');
        });

        self.socket.emit('join_room', {
            user_email: self.userEmail,
            chatroom: 'codeial'
        });
        self.socket.on('user_joined', function (data) {
            console.log('a new user joined!', data);
        });

        $('#send-btn').click(function (e) {
            e.preventDefault();
            let msg = $('#chatTyping-area').val();

            if (msg != '') {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }

        });
        self.socket.on('received_message', function (data) {
            console.log('message received', data.message);

            let newMsg = $('<li>');

            let messageType = "other-message";


            if (self.userEmail == data.user_email) {
                messageType = 'self-message';
            }

            newMsg.append($('<span>', {
                'html': data.message
            }));


            newMsg.addClass(messageType);

            $('#messageList').append(newMsg);
        })
    }
}
// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');


newChatForm.addEventListener('submit', e => {
    e.preventDefault();

    const message = newChatForm.message.value.trim();

    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));

});


newNameForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = newNameForm.name.value.trim();
    // update name
    chatroom.updateName(name);

    newNameForm.reset();

    updateMessage.innerText = `Your name was updated ${name}.`;
    setTimeout(() => updateMessage.innerText = '', 3000);

});


// Update the chat rooms
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') {
        chatUi.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUi.render(chat));
    }
});


// Check localStorage for a name
const username = localStorage.username ? localStorage.username : 'anonymous';


// Class instances
const chatUi = new ChatUi(chatList);

const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChats(data => chatUi.render(data));

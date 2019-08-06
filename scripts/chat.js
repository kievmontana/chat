
class Chatroom {

    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsubscribe;
    }

    async addChat(message) {
        // format chat obj
        const now = new Date();

        const chat = {
            //message: message,
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document
        const response = await this.chats.add(chat);
        return response;
        //return this;
    }

    getChats(callback) {
        this.unsubscribe = this.chats // store in the var to be able change rooms (unsub from real-time changes)
            // get docs from collection where condition is true
            .where('room', '==', this.room)
            .orderBy('created_at')
            // real-time DB listener
            .onSnapshot( snapshot => {
                snapshot.docChanges().forEach( change => {
                    if(change.type === 'added') {
                        // update ui
                        callback(change.doc.data());
                    }
                })
            })
    }

    updateName(username) {
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateRoom(room) {
        this.room = room;
        console.log('room updated');
        if(this.unsubscribe) {
            this.unsubscribe(); // invoking the function
        }
    }

}

import { WEB_SOCKET_URL } from 'setting';

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect(chatID) {
    const path = `wss://${WEB_SOCKET_URL}/ws/chat/${chatID}/`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {};
    this.socketNewMessage(
      JSON.stringify({
        command: 'fetch_messages'
      })
    );
    this.socketRef.onmessage = (e) => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = (e) => {
      console.log(e.data);
    };
    // this.socketRef.onclose = () => {
    //   this.connect(chatID);
    // };
    this.socketRef.onclose = () => {
      setTimeout(() => {
        this.connect(chatID);
      }, 5000);
    };
  }

  socketNewMessage(data) {
    const parseData = JSON.parse(data);
    const command = parseData.command;

    if (Object.keys(this.callbacks).length === 0) {
      return;
    }

    if (command === 'messages') {
      this.callbacks[command](parseData.messages);
    }

    if (command === 'new_message') {
      this.callbacks[command](parseData.message);
    }
  }

  fetchMessages(username, chatID) {
    this.sendMessage({ command: 'fetch_messages', username: username, chatID: chatID });
  }

  newChatMessage(message) {
    this.sendMessage({ command: 'new_message', from: message.from, message: message.content, chatID: message.chatID });
  }

  addCallbacks(messagesCallback, newMessageCallback) {
    this.callbacks['messages'] = messagesCallback;
    this.callbacks['new_message'] = newMessageCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  waitForSocketConnection(callback) {
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(() => {
      if (socket.readyState === 1) {
        if (callback != null) {
          callback();
        }
        return;
      } else {
        recursion(callback);
      }
    }, 1);
  }

  state() {
    return this.socketRef.readyState;
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;

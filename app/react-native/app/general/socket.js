import * as signalR from '@aspnet/signalr';
import {baseUrl} from '~/general/constants';

let hub;
const receiveMessageListeners = {};

export const initializeSocket = async () => {
  if (!hub) {
    hub = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}/hub`)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    hub.on('receiveMessage', receiveMessage);
    await hub.start();
  }
};

export const sendMessage = (to, payload) => {
  if (!hub) {
    return;
  }

  hub.invoke('sendMessage', `${to}|${JSON.stringify(payload)}`);
};

export const addReceiveMessageListener = callback => {
  const id = Date.now();
  receiveMessageListeners[id] = callback;
  return id;
};

export const removeReceiveMessageListener = id => {
  receiveMessageListeners[id] = null;
  delete receiveMessageListeners[id];
};

const receiveMessage = message => {
  Object.entries(receiveMessageListeners).forEach(entry => {
    const [id, callback] = entry;
    if (callback && message && message.indexOf('|' > -1)) {
      const [to, payload] = message.split('|');
      callback(to, JSON.parse(payload));
    }
  });
};

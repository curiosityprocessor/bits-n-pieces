console.log('Hello from content!');

interface Message {
  action: string;
  [key: string]: any; // Allow for custom data
}

function sendMessageToBackground(message: Message) {
  chrome.runtime.sendMessage(message, (response) => {
    if (response && response.greeting) {
      console.log(response.greeting);
    }
  });
}

sendMessageToBackground({ action: 'greet' });

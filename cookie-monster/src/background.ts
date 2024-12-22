console.log('Hello from background!');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'greet') {
    sendResponse({ greeting: 'Greetings from background!' });
  } else if (request.action === 'logGreeting') {
    console.log(request.greeting);
  }
  return true;
});

// console.log('Hello from content!');

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

// sendMessageToBackground({ action: 'greet' });

function calculateReadingTime() {
  const article = document.querySelector('article');
  if (!article || !article.textContent) {
    return;
  }

  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g;
  const words = text.matchAll(wordMatchRegExp);
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement('p');
  badge.classList.add('color-secondary-text', 'type--caption');
  badge.textContent = `⏱️ ${readingTime} min read`;

  const heading = article.querySelector('h1');
  const date = article.querySelector('time')?.parentNode;

  if (date) {
    (date as Element).insertAdjacentElement('afterend', badge);
  } else if (heading) {
    heading.insertAdjacentElement('afterend', badge);
  } else {
    console.log(`Estimated reading time: ${readingTime} min`);
  }
}

calculateReadingTime();

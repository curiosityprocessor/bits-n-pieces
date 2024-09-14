export const POST = async (request) => {
  try {
    // dummyValidate(request.request.body);

    return new Response(dummyApiStream());
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 422 });
  }
};

const dummyValidate = (data: any) => {
  if (!data.userMessage || !data.userMessage.toString().trim()) {
    throw new Error('userMessage', { cause: 'User message is required' });
  }
};

const dummyApiStream = () => {
  const encoder = new TextEncoder();
  let index = 0;
  const message =
    '# Welcome! &#128515;	\nHi I am your **LLM** assistant.  I am here to help you with your _tasks_.\n\nHow can I help you today?\n\nI can:\n- chat\n- find patterns\n- or code!\n\n```html\n<p>hello world!</p>\n```\n';
  return new ReadableStream({
    async start(controller) {
      const interval = setInterval(() => {
        if (index < message.length) {
          controller.enqueue(encoder.encode(message[index]));
          index++;
        } else {
          clearInterval(interval);
          controller.close();
        }
      }, 60);
    },
  });
};

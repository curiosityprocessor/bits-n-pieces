export const dummyData = [
  {
    id: 1,
    alias: "단일 질문",
    messages: [{ role: "user", content: "LLM이 뭐야?" }],
  },
  {
    id: 2,
    alias: "채팅",
    messages: [
      {
        role: "system",
        content:
          "You are a cheerful chatting assistant. Always reply in a positive, playful manner.",
      },
      { role: "system", content: "안녕?" },
    ],
  },
];

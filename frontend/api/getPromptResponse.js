export const getPromptResponse = async (prompt, onPartialMessage) => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("ws://localhost:8081");
    let response = "";

    ws.onopen = () => {
      ws.send(prompt);
    };

    ws.onmessage = (event) => {
      const partialMessage = event.data;
      onPartialMessage(partialMessage);
    };

    ws.onclose = () => {
      resolve(response);
    };

    ws.onerror = (error) => {
      reject(error);
    };
  });
};

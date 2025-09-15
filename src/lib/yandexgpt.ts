export async function askAi(text: string, context?: string): Promise<string> {
  try {
    console.log('askAi', text, context);
    // Проверка наличия необходимых переменных окружения
    if (!import.meta.env.VITE_YANDEX_API_KEY || !import.meta.env.VITE_YANDEX_FOLDER_ID) {
      throw new Error('Отсутствуют необходимые переменные окружения для Yandex GPT API');
    }

    const response = await fetch('/yandex-api/foundationModels/v1/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Api-Key ${import.meta.env.VITE_YANDEX_API_KEY}`,
        'x-folder-id': import.meta.env.VITE_YANDEX_FOLDER_ID!,
      },
      body: JSON.stringify({
        modelUri: `gpt://${import.meta.env.VITE_YANDEX_FOLDER_ID}/yandexgpt`,
        completionOptions: {
          stream: false,
          temperature: 0.1,
          maxTokens: '1000',
        },
        messages: [
          {
            role: 'system',
            text: context || 'You are a helpful assistant',
          },
          {
            role: 'user',
            text: `Job Title: ${text}. Depending on job title generate the summary for CV 4-5 lines.`,
          },
        ],
      }),
    });

    // Проверка успешности запроса
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Ошибка API: ${response.status} ${response.statusText}. ${errorData}`);
    }

    const json = await response.json();

    // Проверка структуры ответа
    if (!json.result?.alternatives?.[0]?.message?.text) {
      throw new Error('Неожиданный формат ответа от API');
    }

    console.log('Ответ от API alternatives:', json.result.alternatives);

    return json.result.alternatives[0].message.text;
  } catch (error) {
    console.error('Ошибка при запросе к Yandex GPT API:', error);
    return 'Произошла ошибка при генерации текста. Пожалуйста, попробуйте позже.';
  }
}

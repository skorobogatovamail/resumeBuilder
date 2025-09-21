// jest.setup.js
// Этот файл запускается перед каждым тестом

// Добавляем расширения для Jest
import '@testing-library/jest-dom';

// Мокаем console.error, чтобы не засорять вывод тестов
const originalConsoleError = console.error;
console.error = (...args) => {
  // Игнорируем некоторые ошибки React, которые не влияют на тесты
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render') ||
      args[0].includes('Warning: React.createElement') ||
      args[0].includes('Warning: Each child in a list'))
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Очищаем моки после каждого теста
afterEach(() => {
  jest.clearAllMocks();
});

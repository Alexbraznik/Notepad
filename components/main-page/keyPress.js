// Функция отправка задачи по нажатию на Enter
export function enterKeyPress(event, button) {
  if (event.key === 'Enter') {
    button.current.click();
  }
}

// Функция закрытия окна по нажатию на Escape
export function escapeKeyPress(event, button) {
  if (event.key === 'Escape') {
    button.current.click();
  }
}

// Раздел
export const sectionList = [
  { name: 'Раздел 1', id: 555 },
  { name: 'Раздел 2', id: 4324 },
];

// Подраздел
export const subSectionList = [
  { title: 'Подраздел 1', id: 1, parentId: 555 },
  { title: 'Подраздел 2', id: 2, parentId: 555 },
  { title: 'Подраздел 3', id: 3, parentId: 4324 },
  { title: 'Подраздел 4', id: 4, parentId: 4324 },
];

// Задачи
export const tasksList = [
  { id: 1, title: 'Задача 1', isCompleted: false, parentId: 1 },
  { id: 2, title: 'Задача 2', isCompleted: false, parentId: 1 },
  { id: 3, title: 'Задача 3', isCompleted: false, parentId: 1 },
  { id: 4, title: 'Четвертая задача', isCompleted: false, parentId: 1 },

  { id: 5, title: 'Купить хлеб', isCompleted: false, parentId: 2 },
  { id: 6, title: 'Купить молока', isCompleted: true, parentId: 2 },

  { id: 7, title: 'Задача 3', isCompleted: false, parentId: 3 },
  { id: 8, title: 'Задача 4', isCompleted: true, parentId: 3 },

  { id: 9, title: 'Дописать код', isCompleted: false, parentId: 4 },
  { id: 10, title: 'Исправить ошибки', isCompleted: true, parentId: 4 },
];

export const getNameFromUrl = (url, ext) => {
  // Разбиваем ссылку по символу "/"
  const parts = url.split('/');
  // Получаем последний элемент массива (последняя часть URL)
  const folderName = parts[parts.length - 2];
  return `${folderName}.${ext}`
}
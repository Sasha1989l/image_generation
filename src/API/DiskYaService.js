import axios from 'axios';
import {getBlobImage} from "../helpers/ImageHelpers";


class DiskYaService {
  constructor(token) {
    this.token = token;
    this.apiBaseUrl = 'https://cloud-api.yandex.net/v1/disk/resources';
  }

  async saveImage(imageUrl, uploadUrl) {
    try {

      let blobImage = await getBlobImage(imageUrl)

      // Загружаем файл на полученный URL
      await axios.put(uploadUrl, blobImage, {
        headers: {
          'Content-Type': 'image/png', // Предполагается, что сохраняем в формате PNG
        }
      });

      return uploadUrl; // Возвращаем URL загруженного изображения
    } catch (error) {
      throw new Error(`Ошибка сохранения: ${error}`);
    }
  }

  async getUploadUrl(fileName, folderLink) {
    try {
      // Получаем URL для загрузки на указанную папку
      const response = await axios.get(`${this.apiBaseUrl}/upload?path=${encodeURIComponent(folderLink)}/${encodeURIComponent(fileName)}`,
        {
        headers: {
          Authorization: `OAuth ${this.token}` // Токен авторизации
        }
      });

      return response.data.href; // Возвращаем URL для загрузки
    } catch (error) {
      throw new Error(`Ошибка получения URL: ${error}`);
    }
  }
}

export default DiskYaService;

import React, {useContext, useEffect, useState} from 'react';
import ImageCardView from "../components/ImageCardView";
import {Button, Form, Stack} from "react-bootstrap";
import {AppContext} from "../context";
import DiskYaService from "../API/DiskYaService";
import {getNameFromUrl} from "../helpers/TextHelpers";
import {Link, useNavigate} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import {ArrowLeft} from "react-bootstrap-icons";

const Save = () => {
  const { setShowToast, setToastText, initialImage, currentImage } = useContext(AppContext);
  const [folderLink, setFolderLink] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    if(!initialImage){
      navigate('/', { replace: true });
    }
  }, []);

  const [saveImage, isImageSaving, getSaveError] = useFetching(async () => {
    const diskYaService = new DiskYaService(process.env.REACT_APP_YANDEX_DISK_API_KEY);

    // Получаем URL для загрузки на указанную папку
    let file_name = getNameFromUrl(initialImage, 'png')
    const uploadUrl = await diskYaService.getUploadUrl(file_name, folderLink);

    // Загружаем файл на полученный URL
    await diskYaService.saveImage(currentImage, uploadUrl);

    setShowToast(true);
    setToastText('Изображение успешно сохранено на Yandex Disk');
  })

  useEffect(() => {
    if (getSaveError && !isImageSaving){
      setToastText('Прозошла ошибка. Попробуйте позже!')
      setShowToast(true)
    }
  }, [getSaveError, isImageSaving]);

  const save_img = async () => {
    await saveImage()
  }

  return (
    <div>
      <ImageCardView image={currentImage}>
        <Form.Group>
          <Form.Label>Введите ссылку на папку на Yandex Disk</Form.Label>
          <Form.Control
            type="text"
            placeholder="Пример: https://disk.yandex.ru/client/disk/folder_id"
            value={folderLink}
            onChange={(e) => setFolderLink(e.target.value)}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={3} className="justify-content-between mt-3 mb-3">
          <Button variant="primary" size="sm" as={Link} to="/filters"><ArrowLeft /></Button>
          <Button variant="primary"
                  size="sm"
                  disabled={isImageSaving}
                  onClick={save_img}>
            {isImageSaving ?
              <span><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Загрузка</span>
              : 'Сохранить'}
          </Button>
        </Stack>
        {/*<div id="yandexAuth"></div>*/}
      </ImageCardView>
    </div>
  );
};

export default Save;
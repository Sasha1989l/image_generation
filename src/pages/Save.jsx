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
  const { setShowToast, setToastText, initialImage, currentImage, yandexToken, setYandexToken } = useContext(AppContext);
  const [folderLink, setFolderLink] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    if(!initialImage){
      navigate('/', { replace: true });
    }
  }, []);

  const [saveImage, isImageSaving, getSaveError] = useFetching(async (token) => {
    const diskYaService = new DiskYaService(token);

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

  useEffect(() => {
    window.YaAuthSuggest.init(
      {
        client_id: process.env.REACT_APP_CLIENT_ID_YANDEX_API_KEY,
        response_type: 'token',
        redirect_uri: `${process.env.REACT_APP_CURRENT_URL}/yandexToken/`
      },
      `${process.env.REACT_APP_CURRENT_URL}`,
      {
        view: "button",
        parentId: "yandexAuth",
        buttonSize: 'xs',
        buttonView: 'main',
        buttonTheme: 'light',
        buttonBorderRadius: "22",
        buttonIcon: 'ya',
      }
    ).then(({handler}) => {
      handler()
    })
      .then((data) => {
        window.dispatchEvent(new Event("storage"));
        console.log(`Сообщение с токеном ${data}`)
      })
      .catch(error => console.log(`Обработка ошибки ${error}`))
  }, [])

  const save_img = async () => {
    await saveImage(yandexToken)
  }

  const delete_yandex_token = () => {
    setYandexToken('')
    localStorage.removeItem('yandexToken')
  }

  return (
    <div>
      <ImageCardView image={currentImage}>
        <Form.Group>
          <Form.Label>Введите путь к папке на Yandex Disk</Form.Label>
          <Form.Control
            type="text"
            placeholder="Пример: test"
            value={folderLink}
            onChange={(e) => setFolderLink(e.target.value)}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={3} className="justify-content-between mt-3 mb-3">
          <Button variant="primary" size="sm" as={Link} to="/filters"><ArrowLeft /></Button>
          <Button variant="primary"
                  size="sm"
                  disabled={isImageSaving || !yandexToken}
                  onClick={save_img}>
            {isImageSaving ?
              <span><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Загрузка</span>
              : 'Сохранить'}
          </Button>
        </Stack>
        <div id="yandexAuth" hidden={yandexToken}></div>
        <div hidden={!yandexToken}>
          <p>Вы авторизованы в Яндекс</p>
          <Button variant="primary" size="sm" onClick={delete_yandex_token}>Сменить аккаунт</Button>
        </div>

      </ImageCardView>
    </div>
  );
};

export default Save;
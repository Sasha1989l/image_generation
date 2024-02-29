import React, {useContext, useEffect, useState} from 'react';
import {EdenAiService} from "../API/EdenAiService";
import ImageCardView from "../components/ImageCardView";
import {Button, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import {AppContext} from "../context";
import {useFetching} from "../hooks/useFetching";
import {Link} from "react-router-dom";

const Generation = () => {
  const { setShowToast, setToastText, initialImage, currentImage, setInitialImage, setCurrentImage } = useContext(AppContext);

  const [prompt, setPrompt] = useState('')
  const [imageBase64, setImageBase64] = useState('');

  const [getImage, isImageLoading, getImageError] = useFetching(async () => {
    let edenAiApi= new EdenAiService(process.env.REACT_APP_EDENAI_API_KEY)
    let data = await edenAiApi.generate(prompt, 512, 512)

    let image_url = data?.replicate?.items[0]?.image_resource_url
    setInitialImage(image_url)
    setCurrentImage(image_url)

    let base64String = data?.replicate?.items[0]?.image
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '')

    setImageBase64(`data:image/png;base64,${base64Data}`)
  })

  useEffect(() => {
    if (getImageError && !isImageLoading){
      setToastText('Прозошла ошибка. Попробуйте позже!')
      setShowToast(true)
    }
  }, [getImageError, isImageLoading]);

  const generate_image = async () => {
    if (!prompt){
      setToastText('Введите промпт!')
      setShowToast(true)
      return
    }

    await getImage()
  }

  return (
    <>
      <ImageCardView image={imageBase64 ? imageBase64 : currentImage }>
        <InputGroup className="mb-3">
          <FloatingLabel label="Промпт">
            <Form.Control as="textarea"
                          aria-label="Prompt"
                          style={{ height: '150px' }}
                          value={prompt}
                          onChange={(e) => {setPrompt(e.target.value)}}
            />
          </FloatingLabel>
        </InputGroup>
        <Button variant="primary"
                size="sm"
                disabled={isImageLoading}
                onClick={ generate_image }
                className='mx-2'
        >
          {isImageLoading ?
            <span><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Загрузка</span>
            : 'Сгенерировать'}
        </Button>
        { initialImage &&
          <Button variant="primary" size="sm" as={Link} to="/filters">Фильтры</Button>
        }
        <div id="yandexAuth"></div>
      </ImageCardView>
    </>
  );
};

export default Generation;
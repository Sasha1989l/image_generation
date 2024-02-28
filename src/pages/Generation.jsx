import React, {useContext, useEffect, useState} from 'react';
import {EdenAiService} from "../API/EdenAiService";
import ImageCardView from "../components/ImageCardView";
import {Button, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import {AppContext} from "../context";
import {useFetching} from "../hooks/useFetching";
import {Link} from "react-router-dom";

const Generation = () => {
  const [prompt, setPrompt] = useState('')

  const {
    setShowToast, setToastText, setImageUrl,
    imageBase64, setImageBase64
  } = useContext(AppContext);

  const [getImage, isImageLoading, getImageError] = useFetching(async () => {
    let edenAiApi= new EdenAiService(process.env.REACT_APP_EDENAI_API_KEY)
    let data = await edenAiApi.generate(prompt, 512, 512)

    let image_url = data?.replicate?.items[0]?.image_resource_url
    setImageUrl(image_url)

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
      <ImageCardView image={imageBase64}>
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
                disabled={isImageLoading}
                onClick={ generate_image }
                className='mx-2'
        >
          {isImageLoading ?
            <span><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Загрузка</span>
            : 'Сгенерировать'}
        </Button>
        { imageBase64 &&
          <Button variant="primary" as={Link} to="/filters">Фильтры</Button>
        }

      </ImageCardView>
    </>
  );
};

export default Generation;
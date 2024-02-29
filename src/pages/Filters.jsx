import React, {useContext, useEffect, useState} from 'react';
import ImageCardView from "../components/ImageCardView";
import {Button, Form, Stack} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../context";
import {PixelixeSercice, PixelixeSerciceFilters} from "../API/PixelixeSercice";
import {useFetching} from "../hooks/useFetching";
import {ArrowLeft} from 'react-bootstrap-icons';

const Filters = () => {
  const { initialImage, setToastText, setShowToast, currentImage, setCurrentImage } = useContext(AppContext);
  const [filter, setFilter] = useState('')

  const navigate = useNavigate();
  useEffect(() => {
    if(!initialImage){
      navigate('/', { replace: true });
    }
  }, []);

  const [getImage, isImageLoading, getImageError] = useFetching(async (filterName) => {
    let pixelixeApi = new PixelixeSercice(process.env.REACT_APP_PIXELIXE_API_KEY)
    let blob = await pixelixeApi.applyFilter(initialImage, filterName)
    const url = URL.createObjectURL(blob);
    setCurrentImage(url)
  })

  useEffect(() => {
    if (getImageError && !isImageLoading){
      setToastText('Прозошла ошибка. Попробуйте позже!')
      setShowToast(true)
    }
  }, [getImageError, isImageLoading]);

  const apply_filter = async () => {
    if(filter === "none"){
      setCurrentImage(initialImage)
      return
    }
    await getImage(filter)
  }

  return (
    <div>
      <ImageCardView image={currentImage}>

        <Form.Select onChange={(e)=> { setFilter(e.target.value)} }>
          <option value="none">Выберите фильтр</option>
          {PixelixeSerciceFilters.map((filter, index) =>
            <option key={index} value={filter}>{filter}</option>
          )}
        </Form.Select>
        <Stack direction="horizontal" gap={3} className="justify-content-between mt-3">
          <Button variant="primary" size="sm" as={Link} to="/"><ArrowLeft /></Button>
          <Button variant="primary"
                  size="sm"
                  disabled={isImageLoading}
                  onClick={ apply_filter }
                  className="mx-2">
            {isImageLoading ?
              <span><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Загрузка</span>
              : 'Наложить фильтр'}
          </Button>
          <Button variant="primary" size="sm" as={Link} to="/save">Сохранить</Button>
        </Stack>
      </ImageCardView>
    </div>
  );
};

export default Filters;
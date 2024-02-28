import React, {useContext} from 'react';
import ImageCardView from "../components/ImageCardView";
import {Button} from "react-bootstrap";
import {AppContext} from "../context";

const Save = () => {
  const { setShowToast, setToastText, imageBase64 } = useContext(AppContext);

  const save_img = async () => {
    setToastText('Изображение сохранено')
    setShowToast(true)
  }

  return (
    <div>
      <ImageCardView image={imageBase64}>
        <Button variant="primary" onClick={ save_img }>Сохранить</Button>
      </ImageCardView>
    </div>
  );
};

export default Save;
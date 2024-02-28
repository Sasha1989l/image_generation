import React, {useEffect, useState} from 'react';
import {Card} from "react-bootstrap";

const ImageCardView = ({image, children}) => {
  const [img, setImg] = useState('https://eis.clientsimple.ru/upload/iblock/353/b0w2diy92mr6m409b1qsvc2l5gjjz2pp.jpg')

  useEffect(() => {
    if(image){
      setImg(image)
    }
  }, [image]);

  return (
    <div className="App d-flex align-items-center justify-content-center" style={{minHeight: '100vh'}}>
      <Card style={{ width: '25rem' }}>
        <Card.Img variant="top" src={img} />
        <Card.Body className="text-center">
          {children}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ImageCardView;
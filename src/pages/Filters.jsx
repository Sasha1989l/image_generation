import React, {useContext} from 'react';
import ImageCardView from "../components/ImageCardView";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AppContext} from "../context";

const Filters = () => {

  const { imageBase64 } = useContext(AppContext);

  const apply_filter = (filter_type) => {
    console.log(filter_type)
  }

  return (
    <div>
      <ImageCardView image={imageBase64}>

        <Form.Select onChange={(e)=> { apply_filter(e.target.value)} }>
          <option>Выберите фильтр</option>
          <option value="1">Сепия</option>
          <option value="2">Черно-белый</option>
          <option value="3">Серый</option>
        </Form.Select>
        <Button variant="primary" onClick={ apply_filter } className="mx-2 my-3">Наложить фильтр</Button>
        <Button variant="primary" as={Link} to="/save">Сохранить</Button>
      </ImageCardView>
    </div>
  );
};

export default Filters;
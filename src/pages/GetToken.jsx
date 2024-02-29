import React, {useContext, useEffect} from 'react';
import {AppContext} from "../context";

const GetToken = () => {
  const { setYandexToken } = useContext(AppContext);

  useEffect(() => {
    const hash = window.location.hash;
    const accessToken = new URLSearchParams(hash.substring(1)).get('access_token');

    setYandexToken(accessToken)
    localStorage.setItem('yandexToken', accessToken)
    window.close()
  })

  return (
    <></>
  );
};

export default GetToken;
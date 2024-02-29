import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

const GetToken = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let token = searchParams.get("access_token")
    console.log(token)
    alert(token)
  })

  return (
    <>    </>
  );
};

export default GetToken;
import './App.css';
import Generation from "./pages/Generation";
import CenteredToast from "./components/UI/CenteredToast";
import React, {useEffect, useState} from "react";
import {AppContext} from "./context";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Filters from "./pages/Filters";
import Save from "./pages/Save";
import GetToken from "./pages/GetToken";


function App() {
  const [toastText, setToastText] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [initialImage, setInitialImage] = useState('')
  const [currentImage, setCurrentImage] = useState('')

  useEffect(() => {
      alert('App')

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
      ).then(({handler}) => handler())
      .then(data => console.log(`Сообщение с токеном ${data}`))
      .catch(error => console.log(`Обработка ошибки ${error}`))
  }, [])


  return (
    <AppContext.Provider value={{
      toastText, setToastText,
      showToast, setShowToast,
      initialImage, setInitialImage,
      currentImage, setCurrentImage
    }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Generation />} />
            <Route path="/filters" element={<Filters />} />
            <Route path="/save" element={<Save />} />
            <Route path="/yandexToken" element={<GetToken />} />
            <Route path="*" element={<Generation />} />
          </Routes>
        </BrowserRouter>
        <CenteredToast showToast={showToast} text={toastText} setShowToast={setShowToast}/>
      </div>
    </AppContext.Provider>
  );
}

export default App;

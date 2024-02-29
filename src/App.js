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
  const [yandexToken, setYandexToken] = useState('')

  useEffect(() => {
    if (localStorage.getItem('yandexToken')) {
      let accessToken = localStorage.getItem('yandexToken')
      setYandexToken(accessToken)
    }

    window.onstorage = () => {
      let accessToken = localStorage.getItem('yandexToken')
      setYandexToken(accessToken)
    }
  }, [])

  return (
    <AppContext.Provider value={{
      toastText, setToastText,
      showToast, setShowToast,
      initialImage, setInitialImage,
      currentImage, setCurrentImage,
      yandexToken, setYandexToken
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
